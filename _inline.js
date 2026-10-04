
    // ==================== PAGE-SPECIFIC LOGIC ====================
    
    function toggleMobileMenu() {
      const menu = document.getElementById('mobile-menu');
      menu.classList.toggle('hidden');
    }
    
    function switchDashTab(btn, tabId) {
      document.querySelectorAll('.dashboard-tab').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      
      document.getElementById('dash-tab-my-ads').style.display = tabId === 'my-ads' ? 'block' : 'none';
      document.getElementById('dash-tab-my-favorites').style.display = tabId === 'my-favorites' ? 'block' : 'none';
      document.getElementById('dash-tab-my-profile').style.display = tabId === 'my-profile' ? 'block' : 'none';
      
      if (tabId === 'my-favorites') Pages.favorites.init();
      if (tabId === 'my-profile') {
        const user = AppData.getUser();
        if (user) {
          document.getElementById('profile-name').value = user.name;
          document.getElementById('profile-email').value = user.email || '';
          document.getElementById('profile-phone').value = user.phone || '';
        }
      }
    }
    
    function sortListings(sortBy) {
      const parts = window.location.hash.replace('#/', '').split('/');
      const page = parts[0];
      
      let ads = [];
      let gridId = 'listings-grid';
      
      if (page === 'category') {
        const categoryId = parts[1];
        ads = AppData.getAdsByCategory(categoryId).filter(a => a.status === 'active');
        gridId = 'listings-grid';
      } else if (page === 'search') {
        const cat = parts[1] || '';
        const query = decodeURIComponent(parts[2] || '');
        ads = AppData.searchAds(query, cat || null).filter(a => a.status === 'active');
        gridId = 'search-listings-grid';
      }
      
      ads = sortAds(ads, sortBy);
      renderListings(ads, gridId);
    }
    
    function sortAds(ads, sortBy) {
      const list = [...(ads || [])];
      switch(sortBy) {
        case 'oldest': return list.sort((a,b) => new Date(a.date) - new Date(b.date));
        case 'price-low': return list.sort((a,b) => (a.price ?? Number.MAX_SAFE_INTEGER) - (b.price ?? Number.MAX_SAFE_INTEGER));
        case 'price-high': return list.sort((a,b) => (b.price ?? -1) - (a.price ?? -1));
        case 'views': return list.sort((a,b) => (b.views||0) - (a.views||0));
        default: return list.sort((a,b) => new Date(b.date) - new Date(a.date));
      }
    }
    
    function renderListings(ads, gridId) {
      const grid = document.getElementById(gridId || 'listings-grid');
      if (!grid) return;
      
      if (ads.length === 0) {
        grid.innerHTML = `
          <div class="empty-state" style="grid-column:1/-1;">
            <div class="empty-icon">🔍</div>
            <h3>Nenhum resultado encontrado</h3>
            <p>Tente pesquisar com termos diferentes ou explore as categorias.</p>
          </div>
        `;
        return;
      }
      
      grid.innerHTML = ads.map(ad => Pages.home.renderAdCard(ad)).join('');
    }
    
    function toggleFavoriteCurrentAd() {
      const parts = (window.location.hash || '').replace('#/', '').split('/');
      const adId = parseInt(parts[1], 10);
      if (Number.isNaN(adId)) return;
      toggleFavorite(adId, document.getElementById('ad-favorite-btn'));
    }
    
    // Handle hero search
    document.addEventListener('DOMContentLoaded', () => {
      const heroSearch = document.getElementById('hero-search-input');
      const heroCategory = document.getElementById('hero-search-category');
      
      if (heroSearch && heroCategory) {
        heroSearch.addEventListener('keyup', (e) => {
          if (e.key === 'Enter') {
            const query = heroSearch.value.trim();
            const cat = heroCategory.value;
            if (query || cat) {
              Router.navigate(`search/${cat}/${encodeURIComponent(query)}`);
            }
          }
        });
      }
      
      // Sync search bars
      const searchInput = document.getElementById('search-input');
      const searchCategory = document.getElementById('search-category');
      
      if (heroSearch && searchInput) {
        heroSearch.addEventListener('input', () => { searchInput.value = heroSearch.value; });
        searchInput.addEventListener('input', () => { heroSearch.value = searchInput.value; });
      }
      
      if (heroCategory && searchCategory) {
        heroCategory.addEventListener('change', () => { searchCategory.value = heroCategory.value; });
        searchCategory.addEventListener('change', () => { heroCategory.value = searchCategory.value; });
      }
    });
    
    // Character counter for title
    const titleInput = document.getElementById('post-title');
    if (titleInput) {
      titleInput.addEventListener('input', () => {
        const count = document.getElementById('title-count');
        if (count) count.textContent = `${titleInput.value.length}/80`;
      });
    }
  