/* ============================================
   GUINÉ-VENDAS - Classified Ads Marketplace
   Main Application Script
   ============================================ */

// ==================== DATA STORE ====================
const AppData = {
  // Categories with subcategories
  categories: [
    { id: 'imoveis', name: 'Imóveis', icon: '🏠', count: 0, subs: ['Apartamento', 'Moradia', 'Terreno', 'Loja', 'Escritório', 'Garagem'] },
    { id: 'veiculos', name: 'Veículos', icon: '🚗', count: 0, subs: ['Carro', 'Moto', 'Barco', 'Camião', 'Autocarro', 'Peças'] },
    { id: 'eletronicos', name: 'Eletrónicos', icon: '📱', count: 0, subs: ['Telemóvel', 'Tablet', 'TV', 'Eletrodoméstico', 'Consola', 'Acessório'] },
    { id: 'emprego', name: 'Emprego', icon: '💼', count: 0, subs: ['Tempo inteiro', 'Meio período', 'Freelance', 'Estágio', 'Remote', 'Part-time'] },
    { id: 'casa', name: 'Casa & Jardim', icon: '🏡', count: 0, subs: ['Móveis', 'Decoração', 'Jardim', 'Ferramentas', 'Iluminação', 'Roupa de cama'] },
    { id: 'moda', name: 'Moda & Beleza', icon: '👗', count: 0, subs: ['Roupa feminina', 'Roupa masculina', 'Calçado', 'Acessórios', 'Beleza', 'Relógios'] },
    { id: 'eletronicos2', name: 'Computadores', icon: '💻', count: 0, subs: ['Laptop', 'Desktop', 'Monitor', 'Teclado/Rato', 'Componentes', 'Redes'] },
    { id: 'servicos', name: 'Serviços', icon: '🔧', count: 0, subs: ['Construção', 'Limpeza', 'Transporte', 'Ensino', 'Saúde', 'Tecnologia'] },
    { id: 'agricultura', name: 'Agricultura', icon: '🌾', count: 0, subs: ['Produtos agrícolas', 'Gado', 'Sementes', 'Máquinas', 'Peixes', 'Frutas'] },
    { id: 'outros', name: 'Outros', icon: '📦', count: 0, subs: ['Arte', 'Desporto', 'Livros', 'Brinquedos', 'Instrumentos', 'Outros'] }
  ],

  // Default ads for demonstration
  defaultAds: [
    {
      id: 1, title: 'Apartamento T3 Novo em Bissau', price: 15000000, category: 'imoveis', subcategory: 'Apartamento',
      description: 'Apartamento T3 novo, localizado numa zona calma de Bissau.\n\nCaracterísticas:\n- 3 quartos (1 suíte)\n- 2 casas de banho\n- Sala ampla\n- Cozinha equipada\n- Varanda\n- Estacionamento\n\nPrédio com segurança 24h e jardim.',
      location: 'Bissau', province: 'Bissau', condition: 'Novo',
      images: [], seller: { name: 'João Mendes', phone: '+245 955 394 566', avatar: 'JM' },
      date: '2026-09-05', status: 'active', featured: true, views: 142
    },
    {
      id: 2, title: 'Toyota Hilux 2023 - Excelente Estado', price: 8500000, category: 'veiculos', subcategory: 'Carro',
      description: 'Toyota Hilux 2023, automática, diesel.\n\n- Quilómetros: 25.000 km\n- Cor: Branco\n- Tração 4x4\n- Ar condicionado\n- GPS integrado\n- Rodas de liga leve\n\nDocumentação em dia, pronta a entregar.',
      location: 'Bafatá', province: 'Bafatá', condition: 'Usado',
      images: [], seller: { name: 'Maria Santos', phone: '+245 912 345 678', avatar: 'MS' },
      date: '2026-09-04', status: 'active', featured: true, views: 98
    },
    {
      id: 3, title: 'iPhone 15 Pro Max 256GB', price: 450000, category: 'eletronicos', subcategory: 'Telemóvel',
      description: 'iPhone 15 Pro Max 256GB, cor Titânio Natural.\n\n- Novo, lacrado\n- Garantia Apple 1 ano\n- Acessórios originais incluídos\n- Suporte USB-C\n\nEntrega em Bissau ou envio para outras províncias.',
      location: 'Bissau', province: 'Bissau', condition: 'Novo',
      images: [], seller: { name: 'Pedro Correia', phone: '+245 998 765 432', avatar: 'PC' },
      date: '2026-09-06', status: 'active', featured: false, views: 67
    },
    {
      id: 4, title: 'Terreno em Zona Nobre - Xorí', price: 12000000, category: 'imoveis', subcategory: 'Terreno',
      description: 'Terreno com 500m² em zona nobre de Xorí, Bissau.\n\n- Localização privilegiada\n- Documentos em dia\n- Água e eletricidade próximas\n- Acesso asfaltado\n\nIdeal para construção de moradia.',
      location: 'Bissau', province: 'Bissau', condition: 'Usado',
      images: [], seller: { name: 'Ana Fernandes', phone: '+245 976 543 210', avatar: 'AF' },
      date: '2026-09-03', status: 'active', featured: false, views: 54
    },
    {
      id: 5, title: 'Motor de Busca Yamaha 40CV', price: 350000, category: 'veiculos', subcategory: 'Barco',
      description: 'Motor de busca Yamaha 40CV, 4 tempos.\n\n- Ano 2022\n- Poucas horas de uso\n- Completo com hélice e tanque\n- Manutenações em dia\n\nPerfeito para embarcações.',
      location: 'Bolama', province: 'Bolama', condition: 'Usado',
      images: [], seller: { name: 'Carlos Diallo', phone: '+245 965 432 109', avatar: 'CD' },
      date: '2026-09-02', status: 'active', featured: false, views: 43
    },
    {
      id: 6, title: 'Samsung Galaxy S24 Ultra', price: 380000, category: 'eletronicos', subcategory: 'Telemóvel',
      description: 'Samsung Galaxy S24 Ultra 256GB.\n\n- Novo, lacrado\n- Cor: Titanium Black\n- S Pen incluída\n- Garantia Samsung\n\nEntrega imediata em Bissau.',
      location: 'Bissau', province: 'Bissau', condition: 'Novo',
      images: [], seller: { name: 'Fatima Bah', phone: '+245 954 321 098', avatar: 'FB' },
      date: '2026-09-06', status: 'active', featured: true, views: 89
    },
    {
      id: 7, title: 'Moradia T4 com Piscina em Cantanhez', price: 25000000, category: 'imoveis', subcategory: 'Moradia',
      description: 'Magnífica moradia T4 localizada em Cantanhez, Bissau.\n\n- 4 quartos (2 suítes)\n- Sala de estar e jantar\n- Cozinha moderna\n- Piscina\n- Jardim\n- Garagem para 2 carros\n- Gerador\n\nZona residencial tranquila.',
      location: 'Bissau', province: 'Bissau', condition: 'Usado',
      images: [], seller: { name: 'Rafael Gomes', phone: '+245 943 210 987', avatar: 'RG' },
      date: '2026-09-01', status: 'active', featured: true, views: 201
    },
    {
      id: 8, title: 'Laptop Dell Latitude i7 16GB RAM', price: 180000, category: 'eletronicos2', subcategory: 'Laptop',
      description: 'Laptop Dell Latitude 5540.\n\n- Processador Intel i7 12ª geração\n- 16GB RAM\n- 512GB SSD\n- Ecrã 15.6" Full HD\n- Windows 11 Pro\n- Bateria em bom estado\n\nIdeal para trabalho e estudos.',
      location: 'Bafatá', province: 'Bafatá', condition: 'Usado',
      images: [], seller: { name: 'Teresa Vieira', phone: '+245 932 109 876', avatar: 'TV' },
      date: '2026-09-05', status: 'active', featured: false, views: 36
    },
    {
      id: 9, title: 'Vende Arroz de Qualidade - 100 Toneladas', price: 5000000, category: 'agricultura', subcategory: 'Produtos agrícolas',
      description: 'Vende-se arroz de alta qualidade da Guiné-Bissau.\n\n- Quantidade: 100 toneladas\n- Tipo: Arroz de sequeiro\n- Embalagem: Sacos de 50kg\n- Origem: Região do Gabú\n\nPreço negociável para grandes quantidades.',
      location: 'Gabú', province: 'Gabú', condition: 'Novo',
      images: [], seller: { name: 'Amadou Djá', phone: '+245 921 098 765', avatar: 'AD' },
      date: '2026-09-04', status: 'active', featured: false, views: 28
    },
    {
      id: 10, title: 'Serviço de Construção Civil - Alvenaria', price: null, category: 'servicos', subcategory: 'Construção',
      description: 'Ofereço serviços de construção civil.\n\n- Alvenaria geral\n- Reboco e enchimento\n- Instalação de canalização\n- Eletricidade\n- Pintura\n\nCom mais de 15 anos de experiência.\nContacte para orçamento gratuito.',
      location: 'Bissau', province: 'Bissau', condition: '-',
      images: [], seller: { name: 'Manuel Nhamadjo', phone: '+245 910 987 654', avatar: 'MN' },
      date: '2026-09-06', status: 'active', featured: false, views: 15
    },
    {
      id: 11, title: 'Moto Honda CG 160 - 2024', price: 220000, category: 'veiculos', subcategory: 'Moto',
      description: 'Moto Honda CG 160 Start, modelo 2024.\n\n- Nova, com nota fiscal\n- Cor: Vermelha\n- Elétrica e pedais\n- Pneus novos\n\nEntrega em qualquer ponto de Bissau.',
      location: 'Bissau', province: 'Bissau', condition: 'Novo',
      images: [], seller: { name: 'Saidu Djalo', phone: '+245 909 876 543', avatar: 'SD' },
      date: '2026-09-05', status: 'active', featured: false, views: 72
    },
    {
      id: 12, title: 'Roupa Feminina Importada - Lotacao', price: 75000, category: 'moda', subcategory: 'Roupa feminina',
      description: 'Venda de roupa feminina importada.\n\n- Lotacao completa\n- Vários modelos e tamanhos\n- Tecidos de qualidade\n- Preços por atacado e retalho\n\nLocal: Zona do Ouro, Bissau.',
      location: 'Bissau', province: 'Bissau', condition: 'Novo',
      images: [], seller: { name: 'Aminata Duarte', phone: '+245 998 123 456', avatar: 'AM' },
      date: '2026-09-03', status: 'active', featured: false, views: 45
    }
  ],

  // In-memory caches (cloud mode)
  adsCache: [],
  favoritesCache: [],

  get isCloud() {
    return typeof SUPABASE_ENABLED !== 'undefined' && SUPABASE_ENABLED;
  },

  // Initialize data
  async init() {
    if (this.isCloud) {
      // Restaura a sessão Supabase Auth, se existir.
      const { data: sessData } = await supabaseClient.auth.getSession();
      const sessUser = sessData && sessData.session && sessData.session.user;
      if (sessUser) {
        const uid = sessUser.id;
        const { data: p } = await supabaseClient.from('profiles').select('*').eq('id', uid).maybeSingle();
        this.setUser({
          id: uid,
          name: (p && p.full_name) || sessUser.email,
          email: sessUser.email,
          phone: (p && p.phone) || ''
        });
      }
      await this.fetchAds();
      const user = this.getUser();
      if (user) await this.fetchFavorites(user.id);
    } else {
      if (!localStorage.getItem('gv_ads')) {
        localStorage.setItem('gv_ads', JSON.stringify(this.defaultAds));
      }
      if (!localStorage.getItem('gv_user')) {
        localStorage.setItem('gv_user', JSON.stringify(null));
      }
      if (!localStorage.getItem('gv_favorites')) {
        localStorage.setItem('gv_favorites', JSON.stringify([]));
      }
      if (!localStorage.getItem('gv_users')) {
        localStorage.setItem('gv_users', JSON.stringify([]));
      }
      this.checkExpiry();
    }
    this.updateCategoryCounts();
  },

  // ==================== CLOUD (SUPABASE) ====================
  async fetchAds() {
    const { data, error } = await supabaseClient.from('ads').select('*').order('created_at', { ascending: false });
    if (!error && data) this.adsCache = data.map(mapAdRow);
  },

  async fetchFavorites(userId) {
    const { data, error } = await supabaseClient.from('favorites').select('ad_id').eq('user_id', userId);
    if (!error) this.favoritesCache = (data || []).map(f => f.ad_id);
  },

  // Carrega perfil + favoritos a partir da sessão Supabase Auth.
  async enterSession() {
    const { data: sessData } = await supabaseClient.auth.getSession();
    const sessUser = sessData && sessData.session && sessData.session.user;
    if (!sessUser) return;
    const uid = sessUser.id;
    const { data: p } = await supabaseClient.from('profiles').select('*').eq('id', uid).maybeSingle();
    this.setUser({
      id: uid,
      name: (p && p.full_name) || sessUser.email,
      email: sessUser.email,
      phone: (p && p.phone) || ''
    });
    await this.fetchFavorites(uid);
  },

  async addAd(ad) {
    if (this.isCloud) {
      const { data, error } = await supabaseClient.from('ads').insert(unmapAd(ad)).select().single();
      if (!error && data) {
        const mapped = mapAdRow(data);
        this.adsCache.unshift(mapped);
        return mapped;
      }
      return null;
    }
    const ads = this.getAds();
    ads.unshift(ad);
    this.saveAds(ads);
    return ad;
  },

  async updateAd(id, fields) {
    if (this.isCloud) {
      const { error } = await supabaseClient.from('ads').update(unmapAdFields(fields)).eq('id', id);
      if (!error) {
        const idx = this.adsCache.findIndex(a => a.id === id);
        if (idx !== -1) this.adsCache[idx] = { ...this.adsCache[idx], ...fields };
      }
      return !error;
    }
    const ads = this.getAds();
    const ad = ads.find(a => a.id === id);
    if (ad) Object.assign(ad, fields);
    this.saveAds(ads);
    return true;
  },

  async deleteAd(id) {
    if (this.isCloud) {
      await supabaseClient.from('favorites').delete().eq('ad_id', id);
      const { error } = await supabaseClient.from('ads').delete().eq('id', id);
      if (!error) {
        this.adsCache = this.adsCache.filter(a => a.id !== id);
        this.favoritesCache = this.favoritesCache.filter(fid => fid !== id);
      }
      return !error;
    }
    this.saveAds(this.getAds().filter(a => a.id !== id));
    this.removeFavorite(id);
    return true;
  },

  getAds() {
    if (this.isCloud) return this.adsCache;
    return JSON.parse(localStorage.getItem('gv_ads') || '[]');
  },

  saveAds(ads) {
    if (this.isCloud) {
      this.adsCache = ads;
      return;
    }
    localStorage.setItem('gv_ads', JSON.stringify(ads));
    this.updateCategoryCounts();
  },

  getUser() {
    return JSON.parse(localStorage.getItem('gv_user') || 'null');
  },

  setUser(user) {
    localStorage.setItem('gv_user', JSON.stringify(user));
    try { updateHeaderAuth(user); } catch (e) { /* DOM ainda não pronto */ }
  },

  // Upload para Supabase Storage (bucket "ad-images"). Retorna URL pública ou null se bucket não existir.
  // Crie o bucket no painel: Storage -> New bucket "ad-images" (public).
  async uploadImage(file) {
    try {
      const compressed = await compressImageFile(file);
      const blob = await (await fetch(compressed)).blob();
      const ext = 'jpg';
      const name = `${Date.now()}-${Math.floor(Math.random() * 1e6)}.${ext}`;
      const { error: upErr } = await supabaseClient.storage.from('ad-images').upload(name, blob, { contentType: 'image/jpeg', upsert: false });
      if (upErr) return null;
      const { data } = supabaseClient.storage.from('ad-images').getPublicUrl(name);
      return data && data.publicUrl ? data.publicUrl : null;
    } catch (e) {
      return null;
    }
  },

  getFavorites() {
    if (this.isCloud) return this.favoritesCache;
    return JSON.parse(localStorage.getItem('gv_favorites') || '[]');
  },

  async addFavorite(adId) {
    if (this.isCloud) {
      const user = this.getUser();
      if (!user) return;
      await supabaseClient.from('favorites').upsert({ user_id: user.id, ad_id: adId });
      if (!this.favoritesCache.includes(adId)) this.favoritesCache.push(adId);
      return;
    }
    const favs = this.getFavorites();
    if (!favs.includes(adId)) {
      favs.push(adId);
      localStorage.setItem('gv_favorites', JSON.stringify(favs));
    }
  },

  async removeFavorite(adId) {
    if (this.isCloud) {
      const user = this.getUser();
      if (!user) return;
      await supabaseClient.from('favorites').delete().eq('user_id', user.id).eq('ad_id', adId);
      this.favoritesCache = this.favoritesCache.filter(id => id !== adId);
      return;
    }
    const favs = this.getFavorites().filter(id => id !== adId);
    localStorage.setItem('gv_favorites', JSON.stringify(favs));
  },

  isFavorite(adId) {
    return this.getFavorites().includes(adId);
  },

  updateCategoryCounts() {
    const ads = this.getAds();
    this.categories.forEach(cat => {
      cat.count = ads.filter(a => a.category === cat.id).length;
    });
  },

  getAd(id) {
    return this.getAds().find(a => a.id === id);
  },

  getAdsByCategory(categoryId) {
    return this.getAds().filter(a => a.category === categoryId);
  },

  searchAds(query, categoryId = null) {
    let results = this.getAds().filter(a => a.status === 'active');
    
    if (query) {
      const q = String(query).toLowerCase();
      results = results.filter(a =>
        String(a.title || '').toLowerCase().includes(q) ||
        String(a.description || '').toLowerCase().includes(q) ||
        String(a.subcategory || '').toLowerCase().includes(q) ||
        String(a.location || '').toLowerCase().includes(q)
      );
    }
    
    if (categoryId) {
      results = results.filter(a => a.category === categoryId);
    }
    
    return results;
  },

  formatPrice(price) {
    if (price === null || price === undefined || price === '') return 'Negociável';
    const n = Number(price);
    if (Number.isNaN(n)) return 'Negociável';
    try {
      return n.toLocaleString('pt-CV') + ' CFA';
    } catch (e) {
      return n.toLocaleString() + ' CFA';
    }
  },

  formatDate(dateStr) {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (isNaN(diff)) return dateStr;
    if (diff === 0) return 'Hoje';
    if (diff === 1) return 'Ontem';
    if (diff < 7) return `Há ${diff} dias`;
    if (diff < 30) return `Há ${Math.floor(diff / 7)} semana(s)`;
    return date.toLocaleDateString('pt-CV');
  },

  generateId() {
    return Date.now() + Math.floor(Math.random() * 1000);
  },

  // Check and expire old ads (30 days) — local mode only
  checkExpiry() {
    if (this.isCloud) return;
    const ads = this.getAds();
    const now = new Date();
    let changed = false;
    
    ads.forEach(ad => {
      if (ad.status === 'active') {
        const adDate = new Date(ad.date);
        const diffDays = Math.floor((now - adDate) / (1000 * 60 * 60 * 24));
        if (diffDays > 30) {
          ad.status = 'expired';
          changed = true;
        }
      }
    });
    
    if (changed) {
      this.saveAds(ads);
    }
  },

  // Export data
  exportData() {
    const data = {
      ads: this.getAds(),
      users: JSON.parse(localStorage.getItem('gv_users') || '[]'),
      favorites: this.getFavorites(),
      exportDate: new Date().toISOString()
    };
    return JSON.stringify(data, null, 2);
  },

  // Import data
  async importData(jsonStr) {
    try {
      const data = JSON.parse(jsonStr);
      if (this.isCloud) {
        if (data.ads) {
          for (const ad of data.ads) {
            await supabaseClient.from('ads').insert(unmapAd(ad));
          }
          await this.fetchAds();
        }
      } else {
        if (data.ads) localStorage.setItem('gv_ads', JSON.stringify(data.ads));
        if (data.users) localStorage.setItem('gv_users', JSON.stringify(data.users));
        if (data.favorites) localStorage.setItem('gv_favorites', JSON.stringify(data.favorites));
      }
      this.updateCategoryCounts();
      return true;
    } catch (e) {
      return false;
    }
  }
};

// ==================== SEGURANÇA (escape de HTML) ====================
// Escapa qualquer valor do utilizador antes de o injetar em innerHTML,
// prevenindo XSS persistente (stored).
function esc(v) {
  return String(v === null || v === undefined ? '' : v)
    .replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
// Só permite URLs de imagem legítimas (data:image ou http/https).
function safeImg(src) {
  return /^(data:image\/|https?:\/\/)/i.test(String(src || '')) ? String(src) : '';
}
// Escapa uma string para uso dentro de um atributo JS inline entre aspas simples.
function jsStr(s) {
  return String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

// ==================== CLOUD MAPPING HELPERS ====================
function mapAdRow(row) {
  return {
    id: row.id,
    user_id: row.user_id,
    title: row.title,
    price: row.price,
    category: row.category,
    subcategory: row.subcategory,
    description: row.description,
    location: row.location,
    province: row.province,
    condition: row.condition,
    images: row.images || [],
    seller: row.seller || { name: 'Anónimo', phone: '', avatar: 'GV' },
    date: row.created_at ? String(row.created_at).slice(0, 10) : '',
    status: row.status,
    featured: !!row.featured,
    views: row.views || 0
  };
}

function unmapAd(ad) {
  return {
    user_id: ad.user_id || null,
    title: ad.title,
    description: ad.description || '',
    price: (ad.price === '' || ad.price === undefined) ? null : ad.price,
    category: ad.category || null,
    subcategory: ad.subcategory || null,
    province: ad.province || null,
    location: ad.location || null,
    condition: ad.condition || null,
    images: ad.images || [],
    seller: ad.seller || null,
    status: ad.status || 'active',
    featured: !!ad.featured,
    views: ad.views || 0
  };
}

function unmapAdFields(fields) {
  const map = {
    title: 'title', description: 'description', price: 'price', category: 'category',
    subcategory: 'subcategory', province: 'province', location: 'location',
    condition: 'condition', images: 'images', status: 'status', featured: 'featured', views: 'views'
  };
  const out = {};
  Object.keys(map).forEach(k => { if (fields[k] !== undefined) out[map[k]] = fields[k]; });
  return out;
}

async function hashPassword(password) {
  const input = password + '::gv-salt';
  if (window.crypto && crypto.subtle) {
    try {
      const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input));
      return 'sha256$' + Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (e) { /* fallback below */ }
  }
  let h = 5381;
  for (let i = 0; i < input.length; i++) h = ((h << 5) + h + input.charCodeAt(i)) | 0;
  return 'fb' + (h >>> 0).toString(16);
}

// Validação de telefone da Guiné-Bissau (+245 XXX XXX XXX, 9 dígitos após indicativo).
function isValidPhone(phone) {
  if (!phone) return false;
  const digits = String(phone).replace(/\D/g, '');
  // Aceita 955394566 (9 dígitos) ou 245955394566 (12 com indicativo)
  return /^(245)?\d{9}$/.test(digits);
}

function normalizePhone(phone) {
  const digits = String(phone || '').replace(/\D/g, '');
  if (digits.length === 9) return '+245 ' + digits.slice(0, 3) + ' ' + digits.slice(3, 6) + ' ' + digits.slice(6);
  if (digits.length === 12 && digits.startsWith('245')) {
    const local = digits.slice(3);
    return '+245 ' + local.slice(0, 3) + ' ' + local.slice(3, 6) + ' ' + local.slice(6);
  }
  return String(phone).trim();
}

// Rate-limit simples no cliente (anti-spam / anti força-bruta).
const RateLimit = {
  attempts: {},
  check(key, maxAttempts = 5, windowMs = 60000) {
    const now = Date.now();
    if (!this.attempts[key]) this.attempts[key] = [];
    this.attempts[key] = this.attempts[key].filter(t => now - t < windowMs);
    if (this.attempts[key].length >= maxAttempts) return false;
    this.attempts[key].push(now);
    return true;
  }
};

// Comprime imagem no navegador: máx. 1280px, JPEG 0.8. Evita estourar localStorage/DB com base64 gigante.
function compressImageFile(file, maxDim = 1280, quality = 0.8) {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) return reject(new Error('not-image'));
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        const scale = Math.min(1, maxDim / Math.max(width, height));
        width = Math.round(width * scale);
        height = Math.round(height * scale);
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d').drawImage(img, 0, 0, width, height);
        // PNG com transparência -> mantém PNG se pequeno, senão JPEG
        const outType = 'image/jpeg';
        resolve(canvas.toDataURL(outType, quality));
      };
      img.onerror = reject;
      img.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function isOwnerOf(ad, user) {
  if (!ad || !user) return false;
  if (ad.user_id !== undefined && ad.user_id !== null) return String(ad.user_id) === String(user.id);
  // Compatibilidade com anúncios antigos sem user_id
  return !!(ad.seller && user.name && ad.seller.name === user.name);
}

// ==================== PAGINATION ====================
const Pagination = {
  itemsPerPage: 12,
  
  getPage(ads, page) {
    const start = (page - 1) * this.itemsPerPage;
    return ads.slice(start, start + this.itemsPerPage);
  },
  
  getTotalPages(ads) {
    return Math.ceil(ads.length / this.itemsPerPage);
  },
  
  render(container, totalItems, currentPage, onPageChange) {
    const totalPages = this.getTotalPages(totalItems);
    if (totalPages <= 1) {
      container.innerHTML = '';
      return;
    }
    
    let html = '';
    html += `<button ${currentPage === 1 ? 'disabled' : ''} onclick="(${onPageChange})(${currentPage - 1})">‹</button>`;
    
    for (let i = 1; i <= totalPages; i++) {
      if (totalPages > 7) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
          html += `<button class="${i === currentPage ? 'active' : ''}" onclick="(${onPageChange})(${i})">${i}</button>`;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
          html += `<button disabled>…</button>`;
        }
      } else {
        html += `<button class="${i === currentPage ? 'active' : ''}" onclick="(${onPageChange})(${i})">${i}</button>`;
      }
    }
    
    html += `<button ${currentPage === totalPages ? 'disabled' : ''} onclick="(${onPageChange})(${currentPage + 1})">›</button>`;
    
    container.innerHTML = html;
  }
};

// ==================== TOAST NOTIFICATIONS ====================
const Toast = {
  show(message, type = 'info') {
    const container = document.querySelector('.toast-container') || this.createContainer();
    const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${icons[type] || icons.info}</span>
      <span class="toast-message">${esc(message)}</span>
      <span class="toast-close" onclick="this.parentElement.remove()">✕</span>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
      if (toast.parentElement) {
        toast.style.animation = 'toastIn 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
      }
    }, 4000);
  },

  createContainer() {
    const container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
    return container;
  }
};

// ==================== ROUTER ====================
const Router = {
  currentPage: 'home',
  
  init() {
    window.addEventListener('hashchange', () => this.handleRoute());
    this.handleRoute();
  },

  handleRoute() {
    const hash = window.location.hash || '#/';
    const search = window.location.search || '';

    // Retorno de OAuth/magic link do Supabase (Google, Facebook):
    // #access_token=... | ?code=... (PKCE) | ?error=... / #error=...
    if ((hash.includes('access_token=') && hash.includes('refresh_token=')) ||
        search.includes('code=') || search.includes('error=') ||
        hash.includes('error=')) {
      this.handleAuthCallback(hash, search);
      return;
    }

    const parts = hash.replace('#/', '').split('/');
    const page = parts[0] || 'home';
    
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
    
    // Show the target page
    const pageEl = document.getElementById(`page-${page}`);
    if (pageEl) {
      pageEl.classList.remove('hidden');
      this.currentPage = page;
    } else {
      document.getElementById('page-home').classList.remove('hidden');
      this.currentPage = 'home';
    }
    
    // Close mobile menu
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) mobileMenu.classList.add('hidden');
    
    // Page-specific init
    switch(page) {
      case '': case 'home': Pages.home.init(); break;
      case 'category': Pages.category.init(parts[1]); break;
      case 'search': Pages.search.init(decodeURIComponent(parts[2] || ''), parts[1] || null); break;
      case 'ad': Pages.ad.init(parts[1]); break;
      case 'post-ad': Pages.postAd.init(); break;
      case 'edit-ad': Pages.editAd.init(parts[1]); break;
      case 'login': Pages.auth.showLogin(); break;
      case 'register': Pages.auth.showRegister(); break;
      case 'dashboard': Pages.dashboard.init(); break;
      case 'favorites': Pages.favorites.init('favorites-page-grid'); break;
      case 'about': Pages.about.init(); break;
      case 'contact': Pages.contact.init(); break;
      case 'help': Pages.help.init(); break;
      case 'terms': this.showStatic('terms'); break;
      case 'privacy': this.showStatic('privacy'); break;
      default:
        this.showStatic('404');
        break;
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  navigate(path) {
    window.location.hash = `/${path}`;
  },

  // Consome o retorno OAuth (tokens, ?code PKCE ou erro) e cria a sessão local
  async handleAuthCallback(hash, search) {
    search = search || window.location.search || '';
    const cleanUrl = () => {
      try { window.history.replaceState(null, '', window.location.pathname + '#/'); } catch (e) { /* ignore */ }
    };
    const fail = (msg) => {
      cleanUrl();
      Toast.show(msg || 'Não foi possível concluir o login. Tente de novo.', 'error');
      this.navigate('login');
    };
    const welcome = async () => {
      await AppData.enterSession();
      const u = AppData.getUser();
      if (!u) return false;
      cleanUrl();
      Toast.show(`Bem-vindo, ${esc(u.name)}! 👋`, 'success');
      this.navigate('dashboard');
      return true;
    };
    try {
      if (!AppData.isCloud) { this.navigate('login'); return; }
      // Erro devolvido pelo provider/Supabase: mostra o motivo real
      const errHit = hash.match(/error_description=([^&]*)/) || search.match(/error_description=([^&]*)/);
      const hasErr = /[?#&]error=/.test(hash) || /[?#&]error=/.test(search);
      if (hasErr) {
        const desc = errHit ? decodeURIComponent(errHit[1]).replace(/\+/g, ' ') : '';
        fail(desc || 'Login cancelado ou negado pelo provider. Tente de novo.');
        return;
      }
      // 1) Sessão já detetada automaticamente pelo supabase-js?
      try {
        const sess = await supabaseClient.auth.getSession();
        if (sess && sess.data && sess.data.session && await welcome()) return;
      } catch (e) { /* tenta setSession abaixo */ }
      // 2) Tokens no hash?
      const p = new URLSearchParams(hash.replace(/^#\/?/, ''));
      const access_token = p.get('access_token');
      const refresh_token = p.get('refresh_token');
      if (access_token && refresh_token) {
        const res = await supabaseClient.auth.setSession({ access_token, refresh_token });
        if (!res.error && await welcome()) return;
      }
      // 3) ?code= (PKCE): dá tempo à deteção automática e revalida
      if (search.includes('code=')) {
        await new Promise((r) => setTimeout(r, 2500));
        try {
          const sess2 = await supabaseClient.auth.getSession();
          if (sess2 && sess2.data && sess2.data.session && await welcome()) return;
        } catch (e) { /* cai no fail */ }
      }
      fail();
    } catch (e) {
      fail();
    }
  },

  showStatic(name) {
    const el = document.getElementById(`page-${name}`);
    if (el) {
      document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
      el.classList.remove('hidden');
      this.currentPage = name;
    }
  }
};

// ==================== PAGES ====================
const Pages = {
  home: {
    init() {
      this.renderCategories();
      this.renderFeaturedAds();
      this.renderRecentAds();
    },

    renderCategories() {
      const grid = document.getElementById('categories-grid');
      if (!grid) return;
      
      grid.innerHTML = AppData.categories.map(cat => `
        <div class="category-card" role="button" tabindex="0" aria-label="Ver categoria ${esc(cat.name)}" onclick="Router.navigate('category/${cat.id}')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();Router.navigate('category/${cat.id}')}">
          <div class="category-icon" aria-hidden="true">${cat.icon}</div>
          <div class="category-name">${esc(cat.name)}</div>
          <div class="category-count">${cat.count} anúncios</div>
        </div>
      `).join('');
    },

    renderFeaturedAds() {
      const grid = document.getElementById('featured-ads-grid');
      if (!grid) return;
      
      const featured = AppData.getAds().filter(a => a.featured && a.status === 'active').slice(0, 4);
      
      if (featured.length === 0) {
        grid.innerHTML = '';
        return;
      }
      
      grid.innerHTML = featured.map(ad => this.renderAdCard(ad)).join('');
    },

    renderRecentAds() {
      const grid = document.getElementById('recent-ads-grid');
      if (!grid) return;
      
      const recent = AppData.getAds()
        .filter(a => a.status === 'active')
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 8);
      
      grid.innerHTML = recent.map(ad => this.renderAdCard(ad)).join('');
    },

    renderAdCard(ad) {
      const isFav = AppData.isFavorite(ad.id);
      const category = AppData.categories.find(c => c.id === ad.category);
      const cover = ad.images && ad.images.length ? safeImg(ad.images[0]) : '';
      
      return `
        <div class="listing-card" role="button" tabindex="0" aria-label="Ver anúncio: ${esc(ad.title)}" onclick="Router.navigate('ad/${ad.id}')" onkeydown="if(event.key==='Enter'){Router.navigate('ad/${ad.id}')}">
          <div class="listing-image">
            ${cover
              ? `<img src="${esc(cover)}" alt="${esc(ad.title)}" loading="lazy" onerror="this.remove()">`
              : `<div style="width:100%;height:100%;background:linear-gradient(135deg,#f5f5f5,#e0e0e0);display:flex;align-items:center;justify-content:center;font-size:3rem;" aria-hidden="true">${category ? category.icon : '📦'}</div>`}
            ${ad.featured ? '<span class="listing-badge badge-featured">⭐ Destaque</span>' : ''}
            ${ad.status === 'sold' ? '<span class="listing-badge badge-urgent" style="left:auto;right:10px;">Vendido</span>' : ''}
            <div class="listing-favorite ${isFav ? 'active' : ''}" role="button" tabindex="0" aria-label="${isFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}" aria-pressed="${isFav ? 'true' : 'false'}" onclick="event.stopPropagation(); toggleFavorite(${ad.id}, this)" onkeydown="event.stopPropagation(); if(event.key==='Enter'){toggleFavorite(${ad.id}, this)}">
              ${isFav ? '❤️' : '🤍'}
            </div>
          </div>
          <div class="listing-info">
            <div class="listing-price">${esc(AppData.formatPrice(ad.price))}</div>
            <div class="listing-title">${esc(ad.title)}</div>
            <div class="listing-meta">
              <span class="listing-location">📍 ${esc(ad.location)}</span>
              <span>${esc(AppData.formatDate(ad.date))}</span>
            </div>
          </div>
        </div>
      `;
    }
  },

  category: {
    currentAds: [],
    currentPage: 1,
    init(categoryId, page = 1) {
      const cat = AppData.categories.find(c => c.id === categoryId);
      if (!cat) {
        Router.showStatic('404');
        return;
      }
      
      document.getElementById('breadcrumb-category').textContent = cat.name;
      
      let ads = AppData.getAdsByCategory(categoryId).filter(a => a.status === 'active');
      ads.sort((a, b) => new Date(b.date) - new Date(a.date));
      this.currentAds = ads;
      this.currentPage = page;
      this.renderPage();
      
      document.getElementById('category-count').textContent = ads.length;
    },
    renderPage() {
      const grid = document.getElementById('listings-grid');
      if (!grid) return;
      const catIcon = document.getElementById('breadcrumb-category').textContent;
      if (this.currentAds.length === 0) {
        grid.innerHTML = `
          <div class="empty-state" style="grid-column: 1/-1;">
            <div class="empty-icon">📦</div>
            <h3>Nenhum anúncio nesta categoria</h3>
            <p>Seja o primeiro a publicar!</p>
            <button class="btn btn-accent btn-lg" onclick="Router.navigate('post-ad')">Publicar Anúncio</button>
          </div>
        `;
        return;
      }
      const pageAds = Pagination.getPage(this.currentAds, this.currentPage);
      grid.innerHTML = pageAds.map(ad => Pages.home.renderAdCard(ad)).join('');
      let pag = document.getElementById('category-pagination');
      if (!pag) {
        pag = document.createElement('div');
        pag.id = 'category-pagination';
        pag.className = 'pagination';
        grid.after(pag);
      }
      Pagination.render(pag, this.currentAds, this.currentPage, (p) => `Pages.category.goToPage(${p})`);
    },
    goToPage(p) {
      this.currentPage = p;
      this.renderPage();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  },

  search: {
    currentAds: [],
    currentPage: 1,
    init(query, categoryId, page = 1) {
      let ads = AppData.searchAds(query, categoryId).filter(a => a.status === 'active');
      ads.sort((a, b) => new Date(b.date) - new Date(a.date));
      this.currentAds = ads;
      this.currentPage = page;
      
      const queryDisplay = document.getElementById('search-query-display');
      if (queryDisplay) queryDisplay.textContent = query || 'Tudo';
      
      const countEl = document.getElementById('search-count');
      if (countEl) countEl.textContent = ads.length;
      
      this.renderPage();
    },
    renderPage() {
      const grid = document.getElementById('search-listings-grid');
      if (!grid) return;
      
      if (this.currentAds.length === 0) {
        grid.innerHTML = `
          <div class="empty-state" style="grid-column:1/-1;">
            <div class="empty-icon">🔍</div>
            <h3>Nenhum resultado encontrado</h3>
            <p>Tente pesquisar com termos diferentes ou explore as categorias.</p>
            <button class="btn btn-accent btn-lg" onclick="Router.navigate('home')">Explorar Categorias</button>
          </div>
        `;
        const pag = document.getElementById('search-pagination');
        if (pag) pag.innerHTML = '';
        return;
      }
      const pageAds = Pagination.getPage(this.currentAds, this.currentPage);
      grid.innerHTML = pageAds.map(ad => Pages.home.renderAdCard(ad)).join('');
      const pag = document.getElementById('search-pagination');
      if (pag) Pagination.render(pag, this.currentAds, this.currentPage, (p) => `Pages.search.goToPage(${p})`);
    },
    goToPage(p) {
      this.currentPage = p;
      this.renderPage();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  },

  ad: {
    init(adId) {
      const id = parseInt(adId, 10);
      if (Number.isNaN(id)) {
        Router.showStatic('404');
        return;
      }
      const ad = AppData.getAd(id);
      if (!ad) {
        Toast.show('Anúncio não encontrado.', 'error');
        Router.showStatic('404');
        return;
      }
      
      // Increment views (1x por sessão, sem contar o dono)
      try {
        const user = AppData.getUser();
        const viewedKey = 'gv_viewed_' + ad.id;
        const isOwner = isOwnerOf(ad, user);
        if (!isOwner && !sessionStorage.getItem(viewedKey)) {
          sessionStorage.setItem(viewedKey, '1');
          AppData.updateAd(ad.id, { views: (ad.views || 0) + 1 });
          ad.views = (ad.views || 0) + 1;
        }
      } catch (e) { /* storage indisponível */ }
      
      const category = AppData.categories.find(c => c.id === ad.category);
      
      // Main image
      const mainImg = document.getElementById('ad-main-image');
      if (ad.images && ad.images.length > 0) {
        mainImg.innerHTML = `<img src="${safeImg(ad.images[0])}" alt="${esc(ad.title)}">`;
      } else {
        mainImg.innerHTML = `<div style="width:100%;height:100%;background:linear-gradient(135deg,#f5f5f5,#e0e0e0);display:flex;align-items:center;justify-content:center;font-size:5rem;">${category ? category.icon : '📦'}</div>`;
      }
      
      // Thumbnails
      const thumbsContainer = document.getElementById('ad-thumbnails');
      if (thumbsContainer && ad.images && ad.images.length > 1) {
        thumbsContainer.innerHTML = ad.images.map((img, i) => {
          const safe = safeImg(img);
          return `
          <div class="ad-thumb ${i === 0 ? 'active' : ''}" onclick="changeAdImage('${jsStr(img)}', this)">
            <img src="${safe}" style="width:100%;height:100%;object-fit:cover;">
          </div>`;
        }).join('');
      }
      
      // Details
      document.getElementById('ad-category').textContent = category ? category.name : 'Outros';
      document.getElementById('ad-category-link').href = `#/category/${ad.category}`;
      document.getElementById('ad-title').textContent = ad.title;
      document.getElementById('ad-price').textContent = AppData.formatPrice(ad.price);
      document.getElementById('ad-description').innerHTML = `<p>${esc(ad.description).replace(/\n/g, '<br>')}</p>`;
      
      // Seller info
      document.getElementById('seller-avatar').textContent = ad.seller.avatar;
      document.getElementById('seller-name').textContent = ad.seller.name;
      document.getElementById('seller-phone').textContent = ad.seller.phone;
      
      // Location info
      document.getElementById('ad-location').textContent = `📍 ${ad.location}, ${ad.province}`;
      document.getElementById('ad-date').textContent = `📅 Publicado em ${AppData.formatDate(ad.date)}`;
      document.getElementById('ad-views').textContent = `👁️ ${ad.views || 0} visualizações`;
      document.getElementById('ad-condition').textContent = ad.condition || '-';
      document.getElementById('ad-id').textContent = ad.id;
      document.getElementById('ad-location-info').textContent = `📍 ${ad.location}, ${ad.province}, Guiné-Bissau`;
      document.getElementById('ad-date-info').textContent = `📅 Publicado em ${AppData.formatDate(ad.date)}`;
      document.getElementById('ad-views-info').textContent = `👁️ ${ad.views || 0} visualizações`;
      
      // Status badge
      const statusBadge = document.getElementById('ad-status-badge');
      if (statusBadge) {
        if (ad.status === 'sold') {
          statusBadge.textContent = '🔴 Vendido';
          statusBadge.style.color = 'var(--danger)';
        } else if (ad.status === 'expired') {
          statusBadge.textContent = '⚪ Expirado';
          statusBadge.style.color = 'var(--text-muted)';
        } else {
          statusBadge.textContent = '🟢 Ativo';
          statusBadge.style.color = 'var(--success)';
        }
      }
      
      // Favorite button
      const isFav = AppData.isFavorite(ad.id);
      const favBtn = document.getElementById('ad-favorite-btn');
      favBtn.innerHTML = isFav ? '❤️ Favoritado' : '🤍 Favoritar';
      favBtn.onclick = () => toggleFavorite(ad.id, favBtn);

      this.currentAdId = ad.id;

      // Show/hide contact info based on login
      const user = AppData.getUser();
      document.getElementById('seller-contact').style.display = user ? 'block' : 'none';
      document.getElementById('contact-gate').style.display = user ? 'none' : 'block';
      
      // Share buttons
      const shareContainer = document.getElementById('share-buttons');
      if (shareContainer) {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(ad.title);
        shareContainer.innerHTML = `
          <a href="https://wa.me/?text=${title}%20${url}" target="_blank" class="btn btn-sm btn-success" style="flex:1;">💬 WhatsApp</a>
          <a href="https://www.facebook.com/sharer/sharer.php?u=${url}" target="_blank" class="btn btn-sm btn-primary" style="flex:1;">📘 Facebook</a>
          <button class="btn btn-sm btn-outline" style="flex:1;" onclick="copyAdLink(${ad.id})">🔗 Copiar Link</button>
        `;
      }
    },

    async markAsSold(adId) {
      if (!confirm('Marcar este anúncio como vendido?')) return;
      const ad = AppData.getAd(adId);
      if (ad) {
        await AppData.updateAd(adId, { status: 'sold' });
        Toast.show('Anúncio marcado como vendido! ✅', 'success');
        Router.navigate(`ad/${adId}`);
      }
    },

    contactSeller() {
      const ad = AppData.getAd(this.currentAdId);
      if (!ad) return;
      const user = AppData.getUser();
      if (!user) {
        Toast.show('Inicie sessão para contactar o vendedor.', 'warning');
        Router.navigate('login');
        return;
      }
      const phone = (ad.seller && ad.seller.phone) || '';
      const text = encodeURIComponent(`Olá ${ad.seller ? ad.seller.name : ''}! Vi o seu anúncio "${ad.title}" na GUINÉ-VENDAS. Ainda está disponível?`);
      const digits = String(phone).replace(/\D/g, '');
      if (digits) {
        window.open(`https://wa.me/${digits}?text=${text}`, '_blank');
      } else {
        showContactModal(phone);
      }
    }
  },

  postAd: {
    currentStep: 1,
    uploadedImages: [],
    
    init() {
      this.currentStep = 1;
      this.uploadedImages = [];
      this.showStep(1);
      
      const catSelect = document.getElementById('post-category');
      catSelect.innerHTML = '<option value="">Selecione uma categoria</option>' +
        AppData.categories.map(c => `<option value="${c.id}">${c.icon} ${c.name}</option>`).join('');
      
      catSelect.onchange = () => this.updateSubcategories();
      this.updateSubcategories();
      
      this.updateProvinces();
      
      const uploadArea = document.getElementById('image-upload-area');
      const fileInput = document.getElementById('image-input');
      
      if (uploadArea && fileInput) {
        uploadArea.onclick = () => fileInput.click();
        uploadArea.onkeydown = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fileInput.click(); } };
        uploadArea.ondragover = (e) => { e.preventDefault(); uploadArea.style.borderColor = 'var(--accent)'; uploadArea.style.background = 'var(--accent-light)'; };
        uploadArea.ondragleave = () => { uploadArea.style.borderColor = ''; uploadArea.style.background = ''; };
        uploadArea.ondrop = (e) => { e.preventDefault(); uploadArea.style.borderColor = ''; uploadArea.style.background = ''; this.handleFiles(e.dataTransfer.files); };
        fileInput.onchange = (e) => { this.handleFiles(e.target.files); fileInput.value = ''; };
      }

      // Contador de título (rebind a cada init, evita perder após navegação SPA)
      const titleInput = document.getElementById('post-title');
      const count = document.getElementById('title-count');
      if (titleInput && count) {
        count.textContent = `${titleInput.value.length}/80`;
        titleInput.oninput = () => { count.textContent = `${titleInput.value.length}/80`; };
      }
    },

    showStep(step) {
      this.currentStep = step;
      
      document.querySelectorAll('.step-dot').forEach((dot, i) => {
        dot.classList.remove('active', 'completed');
        if (i + 1 < step) dot.classList.add('completed');
        if (i + 1 === step) dot.classList.add('active');
      });
      
      document.querySelectorAll('.post-ad-step').forEach((s, i) => {
        s.style.display = (i + 1 === step) ? 'block' : 'none';
      });
    },

    updateSubcategories() {
      const catId = document.getElementById('post-category').value;
      const subSelect = document.getElementById('post-subcategory');
      const cat = AppData.categories.find(c => c.id === catId);
      
      if (cat && cat.subs) {
        subSelect.innerHTML = '<option value="">Selecione subcategoria</option>' +
          cat.subs.map(s => `<option value="${s}">${s}</option>`).join('');
      } else {
        subSelect.innerHTML = '<option value="">Nenhuma subcategoria</option>';
      }
    },

    updateProvinces() {
      const provinces = ['Bissau', 'Bafatá', 'Biombo', 'Bolama', 'Cacheu', 'Gabú', 'Oio', 'Quinara', 'Tombali'];
      const select = document.getElementById('post-province');
      select.innerHTML = '<option value="">Selecione a província</option>' +
        provinces.map(p => `<option value="${p}">${p}</option>`).join('');
    },

    async handleFiles(files) {
      const previewGrid = document.getElementById('image-preview-grid');
      if (!previewGrid) return;

      for (const file of Array.from(files)) {
        if (!file.type.startsWith('image/')) {
          Toast.show(`Ficheiro ignorado (não é imagem): ${file.name}`, 'warning');
          continue;
        }
        if (file.size > 8 * 1024 * 1024) {
          Toast.show(`Imagem muito grande (máx. 8MB): ${file.name}`, 'warning');
          continue;
        }
        if (this.uploadedImages.length >= 5) {
          Toast.show('Máximo de 5 fotos permitido.', 'warning');
          break;
        }
        try {
          // Tenta upload para Supabase Storage; fallback: base64 comprimido
          let dataUrl = null;
          if (AppData.isCloud && typeof supabaseClient !== 'undefined' && supabaseClient) {
            try {
              dataUrl = await AppData.uploadImage(file);
            } catch (e) { dataUrl = null; }
          }
          if (!dataUrl) dataUrl = await compressImageFile(file);
          // Limite anti-quota: ~1.5MB por imagem em base64
          if (dataUrl.length > 2_000_000) {
            Toast.show(`Imagem ainda muito grande após compressão: ${file.name}`, 'warning');
            continue;
          }
          this.uploadedImages.push(dataUrl);

          const item = document.createElement('div');
          item.className = 'image-preview-item';
          const idx = this.uploadedImages.length - 1;
          item.innerHTML = `
            <img src="${esc(dataUrl)}" alt="Pré-visualização da foto ${idx + 1}">
            <div class="remove-img" role="button" tabindex="0" aria-label="Remover foto" onclick="removeImage(${idx}, this)">✕</div>
          `;
          previewGrid.appendChild(item);
        } catch (e) {
          Toast.show(`Não foi possível ler: ${file.name}`, 'error');
        }
      }
    },

    nextStep() {
      if (this.currentStep === 1) {
        const cat = document.getElementById('post-category').value;
        if (!cat) {
          Toast.show('Por favor, selecione uma categoria.', 'warning');
          return;
        }
      }
      
      if (this.currentStep === 2) {
        const title = document.getElementById('post-title').value.trim();
        const province = document.getElementById('post-province').value;
        const location = document.getElementById('post-location').value.trim();
        
        if (!title) {
          Toast.show('Por favor, insira o título do anúncio.', 'warning');
          return;
        }
        if (!province) {
          Toast.show('Por favor, selecione a província.', 'warning');
          return;
        }
        if (!location) {
          Toast.show('Por favor, insira a localização.', 'warning');
          return;
        }
      }
      
      if (this.currentStep < 3) {
        this.showStep(this.currentStep + 1);
      }
    },

    async submitAd() {
      const user = AppData.getUser();
      if (!user) {
        Toast.show('Precisa de estar logado para publicar.', 'warning');
        Router.navigate('login');
        return;
      }
      
      const cat = document.getElementById('post-category').value;
      const subcat = document.getElementById('post-subcategory').value;
      const title = document.getElementById('post-title').value.trim();
      const priceStr = document.getElementById('post-price').value.trim();
      const price = priceStr ? parseInt(priceStr.replace(/\D/g, '')) : null;
      const province = document.getElementById('post-province').value;
      const location = document.getElementById('post-location').value.trim();
      const condition = document.getElementById('post-condition').value;
      const description = document.getElementById('post-description').value.trim();
      
      if (!cat || !title || !province || !location || !description) {
        Toast.show('Por favor, preencha todos os campos obrigatórios.', 'warning');
        return;
      }
      if (title.length < 3 || title.length > 120) {
        Toast.show('O título deve ter entre 3 e 120 caracteres.', 'warning');
        return;
      }
      if (description.length < 10) {
        Toast.show('A descrição deve ter pelo menos 10 caracteres.', 'warning');
        return;
      }
      if (price !== null && (Number.isNaN(price) || price < 0)) {
        Toast.show('Preço inválido.', 'warning');
        return;
      }
      
      const newAd = {
        id: AppData.generateId(),
        user_id: user.id,
        title,
        price,
        category: cat,
        subcategory: subcat || '',
        description,
        location,
        province,
        condition,
        images: [...this.uploadedImages],
        seller: {
          name: user.name,
          phone: user.phone || '+245 000 000 000',
          avatar: user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
        },
        date: new Date().toISOString().split('T')[0],
        status: 'active',
        featured: false,
        views: 0
      };
      
      const saved = await AppData.addAd(newAd);
      if (!saved) {
        Toast.show('Erro ao publicar o anúncio. Tente novamente.', 'error');
        return;
      }
      
      Toast.show('Anúncio publicado com sucesso! 🎉', 'success');
      Router.navigate(`ad/${saved.id}`);
    }
  },

  editAd: {
    adId: null,
    adImages: [],
    init(adId) {
      const id = parseInt(adId, 10);
      if (Number.isNaN(id)) {
        Toast.show('Anúncio inválido.', 'error');
        Router.navigate('dashboard');
        return;
      }
      const ad = AppData.getAd(id);
      if (!ad) {
        Toast.show('Anúncio não encontrado.', 'error');
        Router.navigate('dashboard');
        return;
      }
      
      const user = AppData.getUser();
      if (!isOwnerOf(ad, user)) {
        Toast.show('Não tem permissão para editar este anúncio.', 'error');
        Router.navigate('dashboard');
        return;
      }
      
      const catSelect = document.getElementById('edit-category');
      if (catSelect) {
        catSelect.innerHTML = '<option value="">Selecione uma categoria</option>' +
          AppData.categories.map(c => `<option value="${c.id}">${c.icon} ${c.name}</option>`).join('');
        catSelect.value = ad.category || '';
      }
      
      document.getElementById('edit-title').value = ad.title || '';
      document.getElementById('edit-price').value = ad.price || '';
      document.getElementById('edit-province').value = ad.province || '';
      document.getElementById('edit-location').value = ad.location || '';
      document.getElementById('edit-condition').value = ad.condition || '';
      document.getElementById('edit-description').value = ad.description || '';
      
      this.updateSubcategories(ad.subcategory);
      
      // Show existing images
      const previewGrid = document.getElementById('edit-image-grid');
      if (previewGrid) {
        previewGrid.innerHTML = '';
        if (ad.images && ad.images.length > 0) {
          previewGrid.innerHTML = ad.images.map((img, i) => {
            const safe = safeImg(img);
            if (!safe) return '';
            return `
            <div class="image-preview-item">
              <img src="${esc(safe)}" alt="Foto ${i + 1} do anúncio">
              <div class="remove-img" role="button" tabindex="0" aria-label="Remover foto ${i + 1}" onclick="removeEditImage(${i})">✕</div>
            </div>`;
          }).join('');
        }
      }

      // Upload de novas fotos na edição
      const uploadArea = document.getElementById('edit-image-upload-area');
      const fileInput = document.getElementById('edit-image-input');
      if (uploadArea && fileInput) {
        uploadArea.onclick = () => fileInput.click();
        uploadArea.onkeydown = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fileInput.click(); } };
        fileInput.onchange = async (e) => {
          for (const file of Array.from(e.target.files)) {
            if (this.adImages.length >= 5) { Toast.show('Máximo de 5 fotos.', 'warning'); break; }
            try {
              let dataUrl = (AppData.isCloud && typeof supabaseClient !== 'undefined' && supabaseClient) ? await AppData.uploadImage(file) : null;
              if (!dataUrl) dataUrl = await compressImageFile(file);
              this.adImages.push(dataUrl);
            } catch (err) { Toast.show(`Falha ao ler ${file.name}`, 'error'); }
          }
          fileInput.value = '';
          this.refreshImages();
        };
      }
      
      this.adId = String(id);
      this.adImages = ad.images ? [...ad.images] : [];
      this.refreshImages();
    },

    updateSubcategories(selected = '') {
      const catId = document.getElementById('edit-category') ? document.getElementById('edit-category').value : '';
      const subSelect = document.getElementById('edit-subcategory');
      if (!subSelect) return;
      const cat = AppData.categories.find(c => c.id === catId);
      if (cat && cat.subs) {
        subSelect.innerHTML = '<option value="">Selecione subcategoria</option>' +
          cat.subs.map(s => `<option value="${esc(s)}">${esc(s)}</option>`).join('');
        if (selected) subSelect.value = selected;
      } else {
        subSelect.innerHTML = '<option value="">Selecione primeiro uma categoria</option>';
      }
    },

    refreshImages() {
      const previewGrid = document.getElementById('edit-image-grid');
      if (!previewGrid) return;
      previewGrid.innerHTML = (this.adImages || []).map((img, i) => {
        const safe = safeImg(img);
        if (!safe) return '';
        return `
          <div class="image-preview-item">
            <img src="${esc(safe)}" alt="Foto ${i + 1} do anúncio">
            <div class="remove-img" role="button" tabindex="0" aria-label="Remover foto ${i + 1}" onclick="removeEditImage(${i})">✕</div>
          </div>`;
      }).join('');
    },

    async submitEdit() {
      const adId = parseInt(this.adId, 10);
      if (Number.isNaN(adId) || !AppData.getAd(adId)) {
        Toast.show('Anúncio não encontrado.', 'error');
        return;
      }
      
      const priceStr = document.getElementById('edit-price').value.trim();
      const price = priceStr ? parseInt(priceStr.replace(/\D/g, ''), 10) : null;
      const title = document.getElementById('edit-title').value.trim();
      const description = document.getElementById('edit-description').value.trim();
      if (!title || title.length < 3) { Toast.show('Título inválido (mín. 3 caracteres).', 'warning'); return; }
      if (!description || description.length < 10) { Toast.show('Descrição muito curta (mín. 10 caracteres).', 'warning'); return; }
      if (price !== null && (Number.isNaN(price) || price < 0)) { Toast.show('Preço inválido.', 'warning'); return; }
      const fields = {
        category: document.getElementById('edit-category').value,
        subcategory: document.getElementById('edit-subcategory') ? document.getElementById('edit-subcategory').value : '',
        title,
        price,
        province: document.getElementById('edit-province').value,
        location: document.getElementById('edit-location').value.trim(),
        condition: document.getElementById('edit-condition').value,
        description,
        images: this.adImages || []
      };
      
      const ok = await AppData.updateAd(adId, fields);
      if (ok) {
        Toast.show('Anúncio atualizado com sucesso! ✓', 'success');
        Router.navigate(`ad/${adId}`);
      } else {
        Toast.show('Erro ao atualizar o anúncio.', 'error');
      }
    }
  },

  auth: {
    // Descobre providers OAuth ativos (endpoint público do Supabase Auth)
    _oauthCache: null,
    async activeOAuthProviders() {
      if (!AppData.isCloud) return [];
      const now = Date.now();
      if (this._oauthCache && now - this._oauthCache.at < 5 * 60 * 1000) return this._oauthCache.list;
      try {
        const base = SUPABASE_URL.replace(/\/$/, '');
        const res = await fetch(base + '/auth/v1/settings', {
          headers: { apikey: SUPABASE_ANON_KEY }
        });
        if (!res.ok) throw new Error('settings-' + res.status);
        const data = await res.json();
        const ext = (data && data.external) || {};
        const list = ['google', 'facebook'].filter(p => !!ext[p]);
        this._oauthCache = { at: now, list };
        return list;
      } catch (e) {
        return [];
      }
    },

    // Injeta botões só dos providers ativos (silencioso se nenhum)
    async renderOAuth(elId) {
      const el = document.getElementById(elId);
      if (!el) return;
      const active = await this.activeOAuthProviders();
      if (!active.length) return;
      const btns = {
        google: `
          <button type="button" class="btn btn-outline btn-lg btn-block" onclick="AuthController.oauth('google')" aria-label="Continuar com Google">
            <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3l5.7-5.7C34.3 6.1 29.4 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.6-.4-3.9z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3l5.7-5.7C34.3 6.1 29.4 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C36.9 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z"/></svg>
            Continuar com Google
          </button>`,
        facebook: `
          <button type="button" class="btn btn-lg btn-block" style="background:#1877F2;color:#fff;" onclick="AuthController.oauth('facebook')" aria-label="Continuar com Facebook">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.6-1.5h1.3V4.9c-.3 0-1.1-.1-2-.1-2 0-3.4 1.2-3.4 3.5V11H8.5v3H11v7h2.5z"/></svg>
            Continuar com Facebook
          </button>`
      };
      el.innerHTML = `
        <div class="form-divider"><span>ou</span></div>
        <div style="display:flex;flex-direction:column;gap:10px;">
          ${active.map(p => btns[p]).join('')}
        </div>`;
    },

    showLogin() {
      const c = document.getElementById('login-form-container');
      if (!c) return;
      c.innerHTML = `
        <div class="auth-header">
          <h2>Bem-vindo de volta!</h2>
          <p>Entre na sua conta GUINÉ-VENDAS</p>
        </div>
        <form onsubmit="AuthController.login(event)">
          <div class="form-group">
            <label class="form-label" for="login-email">Email ou Telefone</label>
            <input type="text" class="form-input" id="login-email" placeholder="exemplo@email.com ou +245 000 000 000" required autocomplete="username">
          </div>
          <div class="form-group">
            <label class="form-label" for="login-password">Palavra-passe</label>
            <input type="password" class="form-input" id="login-password" placeholder="••••••••" required autocomplete="current-password">
          </div>
          <button type="submit" class="btn btn-accent btn-lg btn-block">Entrar</button>
        </form>
        <div id="oauth-login"></div>
        <div class="form-footer">
          Não tem conta? <a href="#/register" onclick="Router.navigate('register')">Registar agora</a>
        </div>
      `;
      this.renderPendingEmailNotice(c);
      this.renderOAuth('oauth-login');
    },

    // Aviso persistente de confirmação de email (fica até confirmar)
    renderPendingEmailNotice(container) {
      let pending = null;
      try { pending = sessionStorage.getItem('gv_pending_email'); } catch (e) { /* ignore */ }
      if (!pending || !container) return;
      const header = container.querySelector('.auth-header');
      if (!header || container.querySelector('#pending-email-notice')) return;
      const box = document.createElement('div');
      box.id = 'pending-email-notice';
      box.setAttribute('role', 'status');
      box.innerHTML = `
        <div style="margin:0 0 20px;padding:14px 16px;border:2px solid var(--accent);border-radius:var(--radius);background:var(--accent-light);font-size:0.9rem;line-height:1.6;">
          <div style="font-weight:800;margin-bottom:4px;">📧 Confirme o seu email</div>
          <div style="color:var(--text-light);">Enviámos um link para <strong>${esc(pending)}</strong>. Abra o email (verifique também o spam) e clique no link antes de entrar.</div>
          <button type="button" class="btn btn-outline btn-sm" style="margin-top:10px;" onclick="AuthController.resendEmail()">↻ Reenviar email</button>
        </div>`;
      header.after(box);
    },

    showRegister() {
      const c = document.getElementById('register-form-container');
      if (!c) return;
      c.innerHTML = `
        <div class="auth-header">
          <h2>Criar Conta</h2>
          <p>Junte-se à comunidade GUINÉ-VENDAS</p>
        </div>
        <form onsubmit="AuthController.register(event)">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="reg-name">Nome *</label>
              <input type="text" class="form-input" id="reg-name" placeholder="Seu nome" required minlength="2" autocomplete="given-name">
            </div>
            <div class="form-group">
              <label class="form-label" for="reg-lastname">Sobrenome *</label>
              <input type="text" class="form-input" id="reg-lastname" placeholder="Seu sobrenome" required minlength="2" autocomplete="family-name">
            </div>
          </div>
          <div class="form-group">
            <label class="form-label" for="reg-email">Email *</label>
            <input type="email" class="form-input" id="reg-email" placeholder="exemplo@email.com" required autocomplete="email">
          </div>
          <div class="form-group">
            <label class="form-label" for="reg-phone">Telefone *</label>
            <input type="tel" class="form-input" id="reg-phone" placeholder="+245 955 394 566" required autocomplete="tel">
          </div>
          <div class="form-group">
            <label class="form-label" for="reg-password">Palavra-passe *</label>
            <input type="password" class="form-input" id="reg-password" placeholder="Mínimo 6 caracteres" required minlength="6" autocomplete="new-password">
          </div>
          <div class="form-group">
            <label class="form-check">
              <input type="checkbox" required> Aceito os <a href="#/terms">Termos de Uso</a> e <a href="#/privacy">Política de Privacidade</a>
            </label>
          </div>
          <button type="submit" class="btn btn-accent btn-lg btn-block">Criar Conta</button>
        </form>
        <div id="oauth-register"></div>
        <div class="form-footer">
          Já tem conta? <a href="#/login" onclick="Router.navigate('login')">Entrar</a>
        </div>
      `;
      this.renderOAuth('oauth-register');
    }
  },

  dashboard: {
    init() {
      const user = AppData.getUser();
      if (!user) {
        Toast.show('Precisa de estar logado.', 'warning');
        Router.navigate('login');
        return;
      }
      
      document.getElementById('dashboard-welcome').innerHTML = `Olá, <span>${esc(user.name)}</span>! 👋`;
      
      const userAds = AppData.getAds().filter(a => isOwnerOf(a, user));
      const activeAds = userAds.filter(a => a.status === 'active').length;
      const totalViews = userAds.reduce((sum, a) => sum + (a.views || 0), 0);
      
      document.getElementById('stat-active').textContent = activeAds;
      document.getElementById('stat-total').textContent = userAds.length;
      document.getElementById('stat-views').textContent = totalViews;
      document.getElementById('stat-favorites').textContent = AppData.getFavorites().length;
      
      this.renderListings(userAds);
    },

    renderListings(ads) {
      const tbody = document.getElementById('my-listings-body');
      
      if (ads.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="5" style="text-align:center; padding:40px;">
              <div class="empty-icon" style="font-size:3rem; margin-bottom:12px;">📝</div>
              <h3 style="font-size:1.1rem; margin-bottom:8px;">Nenhum anúncio ainda</h3>
              <p style="color:var(--text-muted); margin-bottom:16px;">Publique o seu primeiro anúncio!</p>
              <button class="btn btn-accent" onclick="Router.navigate('post-ad')">Publicar Anúncio</button>
            </td>
          </tr>
        `;
        return;
      }
      
      tbody.innerHTML = ads.map(ad => {
        const category = AppData.categories.find(c => c.id === ad.category);
        const user = AppData.getUser();
        const isOwner = isOwnerOf(ad, user);
        const cover = ad.images && ad.images.length ? safeImg(ad.images[0]) : '';
        const thumb = cover
          ? `<div class="listing-thumb" style="padding:0;overflow:hidden;"><img src="${esc(cover)}" alt="" style="width:100%;height:100%;object-fit:cover;" onerror="this.remove()"></div>`
          : `<div class="listing-thumb">${category ? category.icon : '📦'}</div>`;
        
        return `
          <tr>
            <td>
              <div style="display:flex;align-items:center;gap:12px;">
                ${thumb}
                <div>
                  <div style="font-weight:600;max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${esc(ad.title)}</div>
                  <div style="font-size:0.8rem;color:var(--text-muted);">${AppData.formatDate(ad.date)}</div>
                </div>
              </div>
            </td>
            <td style="font-weight:700;color:var(--accent);">${AppData.formatPrice(ad.price)}</td>
            <td><span class="status-badge status-${ad.status}">${this.getStatusLabel(ad.status)}</span></td>
            <td>👁️ ${ad.views || 0}</td>
            <td>
              <div class="table-actions">
                ${isOwner ? `
                  <button class="btn btn-outline btn-sm" onclick="Router.navigate('edit-ad/${ad.id}')">✏️ Editar</button>
                  <button class="btn btn-danger btn-sm" onclick="AdController.deleteAd(${ad.id})">🗑️</button>
                ` : ''}
                <button class="btn btn-outline btn-sm" onclick="Router.navigate('ad/${ad.id}')">👁️ Ver</button>
              </div>
            </td>
          </tr>
        `;
      }).join('');
    },

    getStatusLabel(status) {
      const labels = { active: 'Ativo', pending: 'Pendente', expired: 'Expirado', sold: 'Vendido' };
      return labels[status] || status;
    }
  },

  favorites: {
    init(gridId) {
      const favs = AppData.getFavorites();
      const ads = favs.map(id => AppData.getAd(id)).filter(Boolean);
      const grid = document.getElementById(gridId || 'favorites-grid');
      if (!grid) return;
      
      if (ads.length === 0) {
        grid.innerHTML = `
          <div class="empty-state" style="grid-column: 1/-1;">
            <div class="empty-icon">❤️</div>
            <h3>Nenhum favorito ainda</h3>
            <p>Adicione anúncios aos seus favoritos para os encontrar aqui.</p>
            <button class="btn btn-accent btn-lg" onclick="Router.navigate('home')">Explorar Anúncios</button>
          </div>
        `;
        return;
      }
      
      grid.innerHTML = ads.map(ad => Pages.home.renderAdCard(ad)).join('');
    }
  },

  about: {
    init() {}
  },

  contact: {
    init() {},
    submit(e) {
      e.preventDefault();
      if (!RateLimit.check('contact', 3, 60000)) {
        Toast.show('Aguarde antes de enviar outra mensagem.', 'warning');
        return;
      }
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const subject = document.getElementById('contact-subject').value;
      const message = document.getElementById('contact-message').value.trim();
      if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !subject || message.length < 10) {
        Toast.show('Verifique os campos (mensagem mín. 10 caracteres).', 'warning');
        return;
      }
      try {
        const box = JSON.parse(localStorage.getItem('gv_contact') || '[]');
        box.push({ name, email, subject, message: message.slice(0, 2000), date: new Date().toISOString() });
        localStorage.setItem('gv_contact', JSON.stringify(box));
      } catch (err) { /* ignore */ }
      const mailto = `mailto:josimarrtx4070@gmail.com?subject=${encodeURIComponent('[GUINÉ-VENDAS] ' + subject)}&body=${encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')')}`;
      window.location.href = mailto;
      Toast.show('Mensagem preparada! Obrigado pelo contacto. 📩', 'success');
      e.target.reset();
    }
  },

  help: {
    init() {}
  }
};

// ==================== AUTH CONTROLLER ====================
const AuthController = {
  async login(e) {
    e.preventDefault();
    if (!RateLimit.check('login', 5, 60000)) {
      Toast.show('Muitas tentativas. Aguarde 1 minuto.', 'warning');
      return;
    }

    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
      Toast.show('Preencha todos os campos.', 'warning');
      return;
    }

    // ===== CLOUD MODE (Supabase Auth) =====
    if (AppData.isCloud) {
      const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
      if (error || !data || !data.session) {
        const code = error && error.code ? String(error.code) : '';
        const msg = error && error.message ? String(error.message) : '';
        if (code === 'email_not_confirmed' || /confirm|verif/i.test(msg)) {
          try { sessionStorage.setItem('gv_pending_email', email); } catch (e) { /* ignore */ }
          Toast.show('Falta confirmar o seu email. Verifique a caixa de entrada e o spam.', 'warning');
          try { Pages.auth.showLogin(); } catch (e) { /* ignore */ }
          return;
        }
        Toast.show('Email ou palavra-passe incorretos.', 'error');
        return;
      }
      try { sessionStorage.removeItem('gv_pending_email'); } catch (e) { /* ignore */ }
      await AppData.enterSession();
      const u = AppData.getUser();
      Toast.show(`Bem-vindo de volta, ${u ? esc(u.name) : ''}! 👋`, 'success');
      Router.navigate('dashboard');
      return;
    }

    // ===== LOCAL MODE (hash SHA-256 + salt, sem backdoor demo) =====
    const users = JSON.parse(localStorage.getItem('gv_users') || '[]');
    const inputHash = await hashPassword(password);
    const inputRaw = inputHash.replace(/^sha256\$/, '');
    const matchesHash = (stored) => stored === inputHash || stored === inputRaw;
    let user = users.find(u => (u.email === email || u.phone === email) && (matchesHash(u.password) || matchesHash(u.passwordHash)));
    // Compat: migra contas antigas em texto puro
    if (!user) {
      const legacy = users.find(u => (u.email === email || u.phone === email) && u.password === password);
      if (legacy) {
        legacy.password = inputHash;
        legacy.passwordHash = inputHash;
        try { localStorage.setItem('gv_users', JSON.stringify(users)); } catch (err) { /* quota */ }
        user = legacy;
      }
    }

    if (user) {
      AppData.setUser({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone
      });
      Toast.show(`Bem-vindo de volta, ${esc(user.name)}! 👋`, 'success');
      Router.navigate('dashboard');
    } else {
      Toast.show('Email ou palavra-passe incorretos.', 'error');
    }
  },

  // Reenvia o email de confirmação (modo cloud)
  async resendEmail() {
    if (!AppData.isCloud) return;
    let email = '';
    try { email = sessionStorage.getItem('gv_pending_email') || ''; } catch (e) { /* ignore */ }
    if (!email) {
      Toast.show('Registe-se primeiro para receber o email.', 'warning');
      return;
    }
    if (!RateLimit.check('resend-' + email, 3, 60000)) {
      Toast.show('Aguarde 1 minuto antes de reenviar.', 'warning');
      return;
    }
    const { error } = await supabaseClient.auth.resend({ type: 'signup', email });
    if (error) {
      Toast.show('Não foi possível reenviar. Tente mais tarde.', 'error');
      return;
    }
    Toast.show(`Email reenviado para ${email}! 📧 Verifique a caixa de entrada e o spam.`, 'success');
  },

  async register(e) {
    e.preventDefault();
    if (!RateLimit.check('register', 5, 60000)) {
      Toast.show('Muitas tentativas. Aguarde 1 minuto.', 'warning');
      return;
    }

    const name = document.getElementById('reg-name').value.trim();
    const lastname = document.getElementById('reg-lastname').value.trim();
    const email = document.getElementById('reg-email').value.trim().toLowerCase();
    const phone = document.getElementById('reg-phone').value.trim();
    const password = document.getElementById('reg-password').value;

    if (name.length < 2 || lastname.length < 2) {
      Toast.show('Nome e sobrenome devem ter pelo menos 2 caracteres.', 'warning');
      return;
    }

    if (password.length < 6) {
      Toast.show('A palavra-passe deve ter pelo menos 6 caracteres.', 'warning');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Toast.show('Insira um email válido.', 'warning');
      return;
    }

    if (!isValidPhone(phone)) {
      Toast.show('Insira um telefone válido da Guiné-Bissau (ex.: +245 955 394 566).', 'warning');
      return;
    }

    const fullName = `${name} ${lastname}`;
    const normPhone = normalizePhone(phone);
    
    // ===== CLOUD MODE (Supabase Auth) =====
    if (AppData.isCloud) {
      const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName, phone },
          emailRedirectTo: window.location.origin + window.location.pathname
        }
      });
      if (error) {
        Toast.show(error.message || 'Erro ao criar a conta. Tente novamente.', 'error');
        return;
      }
      // Se o Supabase devolveu sessão na hora (email não confirmado), entra já.
      if (data && data.session) {
        try { sessionStorage.removeItem('gv_pending_email'); } catch (e) { /* ignore */ }
        await AppData.enterSession();
        Toast.show('Conta criada com sucesso! 🎉', 'success');
        Router.navigate('dashboard');
      } else {
        try { sessionStorage.setItem('gv_pending_email', email); } catch (e) { /* ignore */ }
        Toast.show('Conta criada! Verifique o seu email para ativar a conta.', 'info');
        Router.navigate('login');
      }
      return;
    }
    
    // ===== LOCAL MODE (hash, sem texto puro) =====
    const users = JSON.parse(localStorage.getItem('gv_users') || '[]');
    
    if (users.find(u => u.email.toLowerCase() === email)) {
      Toast.show('Este email já está registado.', 'warning');
      return;
    }

    const pwHash = await hashPassword(password);
    
    const newUser = {
      id: Date.now(),
      name: fullName,
      email,
      phone: normPhone,
      password: pwHash,
      passwordHash: pwHash
    };
    
    users.push(newUser);
    localStorage.setItem('gv_users', JSON.stringify(users));
    
    AppData.setUser({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone
    });
    
    Toast.show('Conta criada com sucesso! 🎉', 'success');
    Router.navigate('dashboard');
  },

  // ---- Login social (Google / Facebook) via Supabase Auth ----
  // Grátis, sem custo por login. Exige ativar o provider no painel:
  // Authentication → Providers → Google / Facebook.
  async oauth(provider) {
    if (provider !== 'google' && provider !== 'facebook') return;
    if (!AppData.isCloud) {
      Toast.show('Login social disponível após ligar o Supabase (modo cloud).', 'info');
      return;
    }
    if (!RateLimit.check('oauth-' + provider, 5, 60000)) {
      Toast.show('Muitas tentativas. Aguarde 1 minuto.', 'warning');
      return;
    }
    try {
      // Sem '#/' no fim: o Supabase anexa ?code= ou #tokens; com
      // fragmento no redirectTo alguns fluxos quebravam o retorno.
      const redirectTo = window.location.origin + window.location.pathname;
      const { error } = await supabaseClient.auth.signInWithOAuth({
        provider,
        options: { redirectTo }
      });
      if (error) throw error;
      // O browser navega para o Google/Facebook; ao voltar, o
      // Router.handleAuthCallback conclui a sessão. Se o provider
      // não estiver ativo no Supabase, cai aqui:
    } catch (err) {
      const name = provider === 'google' ? 'Google' : 'Facebook';
      Toast.show(`Login com ${name} indisponível. Ative o provider no Supabase (Auth → Providers).`, 'error');
    }
  },

  async logout() {
    if (AppData.isCloud) {
      try { await supabaseClient.auth.signOut(); } catch (e) { /* ignore */ }
    }
    AppData.setUser(null);
    Toast.show('Sessão terminada. Até breve! 👋', 'info');
    Router.navigate('home');
  }
};

// ==================== AD CONTROLLER ====================
const AdController = {
  async deleteAd(adId) {
    if (!confirm('Tem certeza que deseja eliminar este anúncio? Esta ação não pode ser desfeita.')) return;
    
    const ok = await AppData.deleteAd(adId);
    Toast.show(ok ? 'Anúncio eliminado.' : 'Erro ao eliminar o anúncio.', ok ? 'info' : 'error');
    
    const user = AppData.getUser();
    if (user) {
      Router.navigate('dashboard');
    } else {
      Router.navigate('home');
    }
  },

  async toggleAdStatus(adId) {
    const ad = AppData.getAd(adId);
    if (!ad) return;
    
    const newStatus = ad.status === 'active' ? 'expired' : 'active';
    await AppData.updateAd(adId, { status: newStatus });
    Toast.show(newStatus === 'active' ? 'Anúncio reativado!' : 'Anúncio desativado.', newStatus === 'active' ? 'success' : 'info');
    Router.navigate('dashboard');
  },

  async reportAd(adId) {
    const id = parseInt(adId, 10);
    if (Number.isNaN(id)) return;
    if (!RateLimit.check('report', 5, 60000)) {
      Toast.show('Muitas denúncias. Aguarde um pouco.', 'warning');
      return;
    }
    const ad = AppData.getAd(id);
    if (!ad) return;
    
    const reason = prompt(`Reportar anúncio: "${ad.title}"\n\nMotivo da denúncia:\n1 - Conteúdo inadequado\n2 - Preço incorreto\n3 - Produto indisponível\n4 - Outro`);
    
    if (reason && reason.trim()) {
      if (AppData.isCloud) {
        try {
          const { error } = await supabaseClient.from('reports').insert({ ad_id: id, reason: reason.trim().slice(0, 500) });
          if (error) {
            Toast.show('Precisa de iniciar sessão para denunciar.', 'warning');
            return;
          }
        } catch (e) {
          Toast.show('Erro ao enviar denúncia.', 'error');
          return;
        }
      } else {
        try {
          const reps = JSON.parse(localStorage.getItem('gv_reports') || '[]');
          reps.push({ ad_id: id, reason: reason.trim().slice(0, 500), date: new Date().toISOString() });
          localStorage.setItem('gv_reports', JSON.stringify(reps));
        } catch (e) { /* ignore */ }
      }
      Toast.show('Denúncia enviada. Obrigado por nos ajudar! 🙏', 'success');
    }
  }
};

// ==================== GLOBAL FUNCTIONS ====================
async function toggleFavorite(adId, el) {
  if (AppData.isFavorite(adId)) {
    await AppData.removeFavorite(adId);
    Toast.show('Removido dos favoritos.', 'info');
    if (el) {
      el.classList.remove('active');
      el.innerHTML = '🤍';
    }
  } else {
    await AppData.addFavorite(adId);
    Toast.show('Adicionado aos favoritos! ❤️', 'success');
    if (el) {
      el.classList.add('active');
      el.innerHTML = '❤️';
    }
  }
  
  updateFavoritesCount();
}

function updateFavoritesCount() {
  const count = AppData.getFavorites().length;
  const el = document.getElementById('favorites-count');
  if (el) el.textContent = count;
}

function showContactModal(phone) {
  const modal = document.getElementById('contact-modal');
  document.getElementById('modal-phone').textContent = phone;
  modal.classList.add('active');
}

function closeContactModal() {
  document.getElementById('contact-modal').classList.remove('active');
}

function filterAds() {
  // Lê header primeiro, usa hero como fallback (corrige botão hero que antes ignorava o próprio campo)
  const headerQ = document.getElementById('search-input')?.value.trim() || '';
  const headerC = document.getElementById('search-category')?.value || '';
  const heroQ = document.getElementById('hero-search-input')?.value.trim() || '';
  const heroC = document.getElementById('hero-search-category')?.value || '';
  const query = headerQ || heroQ;
  const category = headerC || heroC;

  Router.navigate(`search/${category}/${encodeURIComponent(query)}`);
}

function changeAdImage(src, el) {
  const safe = safeImg(src);
  if (!safe) return;
  document.getElementById('ad-main-image').innerHTML = `<img src="${esc(safe)}" alt="Foto do anúncio">`;
  document.querySelectorAll('.ad-thumb').forEach(t => t.classList.remove('active'));
  if (el) el.classList.add('active');
}

function copyAdLink(adId) {
  const url = window.location.href.split('#')[0] + '#/ad/' + adId;
  navigator.clipboard.writeText(url).then(() => {
    Toast.show('Link copiado! 🔗', 'success');
  }).catch(() => {
    prompt('Copie o link:', url);
  });
}

function openModal(id) {
  document.getElementById(id).classList.add('active');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('active');
}

function removeImage(idx, el) {
  Pages.postAd.uploadedImages.splice(idx, 1);
  el.parentElement.remove();
}

function removeEditImage(idx) {
  if (Pages.editAd.adImages) {
    Pages.editAd.adImages.splice(idx, 1);
    Pages.editAd.refreshImages();
  }
}

function exportData() {
  const json = AppData.exportData();
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'guine-vendas-backup-' + new Date().toISOString().split('T')[0] + '.json';
  a.click();
  URL.revokeObjectURL(url);
  Toast.show('Dados exportados com sucesso! 💾', 'success');
}

function importDataClick() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const success = await AppData.importData(ev.target.result);
      if (success) {
        Toast.show('Dados importados com sucesso! 📥', 'success');
        Router.navigate('home');
      } else {
        Toast.show('Erro ao importar dados. Ficheiro inválido.', 'error');
      }
    };
    reader.readAsText(file);
  };
  input.click();
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', async () => {
  await AppData.init();
  Router.init();
  updateFavoritesCount();
  updateHeaderAuth(AppData.getUser());
  // Sem polling: header atualiza via AppData.setUser() + eventos de storage entre abas
  window.addEventListener('storage', (e) => {
    if (e.key === 'gv_user') {
      try { updateHeaderAuth(JSON.parse(e.newValue || 'null')); } catch (err) { /* ignore */ }
    }
  });
});

function updateHeaderAuth(user) {
  const authSection = document.getElementById('header-auth');
  const userSection = document.getElementById('header-user');
  if (!authSection || !userSection) return;
  
  if (user && user.name) {
    authSection.style.display = 'none';
    userSection.style.display = 'flex';
    const avatar = document.getElementById('user-avatar');
    const uname = document.getElementById('user-name');
    if (avatar) avatar.textContent = String(user.name).split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U';
    if (uname) uname.textContent = String(user.name).split(' ')[0];
  } else {
    authSection.style.display = 'flex';
    userSection.style.display = 'none';
  }
}
