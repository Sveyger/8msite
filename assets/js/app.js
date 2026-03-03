const STORAGE_KEY = 'march8_master_profiles_v3';
const AUTH_KEY = 'march8_admin_auth';
const ADMIN_CODE = 'M8';

// Fill these values for production on GitHub Pages.
const SUPABASE_URL = 'https://xpfaragwxgmstrkaizcv.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_aJQbRNVHoJ_VmhAfx33m1Q_L_h3ujnY';
const SUPABASE_TABLE = 'march8_profiles';
const SUPABASE_BUCKET = 'media';

const THEMES = {
  warm: { '--accent': '#C4956A', '--accent-light': '#E8CEB5', '--accent-dark': '#8B6914', '--accent-glow': 'rgba(196, 149, 106, 0.4)', '--bg-primary': '#0A0A0A', '--bg-secondary': '#111111', '--bg-card': '#1A1A1A', '--text-primary': '#F5F0EB', '--text-secondary': '#B8AFA6', '--text-muted': '#6B6460', '--gold': '#D4AF37', '--gold-light': '#F0D879' },
  brunette: { '--accent': '#A97A50', '--accent-light': '#D9B28B', '--accent-dark': '#6F4C2A', '--accent-glow': 'rgba(169, 122, 80, 0.42)', '--bg-primary': '#0C0B0B', '--bg-secondary': '#141212', '--bg-card': '#1B1715', '--text-primary': '#F2ECE6', '--text-secondary': '#BFAE9F', '--text-muted': '#76675E', '--gold': '#C7A04E', '--gold-light': '#E4C57A' },
  blonde: { '--accent': '#B8A9C9', '--accent-light': '#DDD3E8', '--accent-dark': '#7B6B8A', '--accent-glow': 'rgba(184, 169, 201, 0.42)', '--bg-primary': '#0D0C11', '--bg-secondary': '#15131A', '--bg-card': '#1D1B23', '--text-primary': '#F3EEF8', '--text-secondary': '#BCB2CA', '--text-muted': '#7A7288', '--gold': '#C9B277', '--gold-light': '#E6D7AD' },
  black: { '--accent': '#7A9EB8', '--accent-light': '#B5D1E3', '--accent-dark': '#4A7A99', '--accent-glow': 'rgba(122, 158, 184, 0.42)', '--bg-primary': '#090E12', '--bg-secondary': '#10171D', '--bg-card': '#152028', '--text-primary': '#ECF3F8', '--text-secondary': '#AFC2CF', '--text-muted': '#6D818F', '--gold': '#C5A96C', '--gold-light': '#E2CFA2' },
  girl_pink_white_black: { '--accent': '#FF4FA0', '--accent-light': '#FFE8F3', '--accent-dark': '#2A0D1D', '--accent-glow': 'rgba(255, 79, 160, 0.45)', '--bg-primary': '#060607', '--bg-secondary': '#101015', '--bg-gradient-start': '#13060F', '--bg-gradient-end': '#0A0A12', '--bg-card': '#17171D', '--text-primary': '#FFFFFF', '--text-secondary': '#F3D5E7', '--text-muted': '#B190A7', '--gold': '#FF83B8', '--gold-light': '#FFD1E7' },
  girl_pink: { '--accent': '#FF5DAF', '--accent-light': '#FFC2E0', '--accent-dark': '#A01D5E', '--accent-glow': 'rgba(255, 93, 175, 0.45)', '--bg-primary': '#130A12', '--bg-secondary': '#1A1020', '--bg-gradient-start': '#2A0E22', '--bg-gradient-end': '#13091A', '--bg-card': '#241425', '--text-primary': '#FFF0F7', '--text-secondary': '#E2B5CB', '--text-muted': '#A47D94', '--gold': '#FF75BA', '--gold-light': '#FFBFE0' },
  girl_violet: { '--accent': '#8E58FF', '--accent-light': '#C8ADFF', '--accent-dark': '#4B2A96', '--accent-glow': 'rgba(142, 88, 255, 0.45)', '--bg-primary': '#0E0A1A', '--bg-secondary': '#151126', '--bg-gradient-start': '#22133E', '--bg-gradient-end': '#120F24', '--bg-card': '#1E1735', '--text-primary': '#F3EEFF', '--text-secondary': '#C7B9EB', '--text-muted': '#8B7EAE', '--gold': '#9A6CFF', '--gold-light': '#D4C1FF' },
  girl_light_blue: { '--accent': '#6EC9FF', '--accent-light': '#D9F2FF', '--accent-dark': '#2A6C96', '--accent-glow': 'rgba(110, 201, 255, 0.45)', '--bg-primary': '#07131D', '--bg-secondary': '#0D1D2A', '--bg-gradient-start': '#0D2A3A', '--bg-gradient-end': '#0A1826', '--bg-card': '#142A3A', '--text-primary': '#ECF8FF', '--text-secondary': '#B9D6E8', '--text-muted': '#7F9EB2', '--gold': '#7ED0FF', '--gold-light': '#CDEEFF' },
  girl_black: { '--accent': '#FFFFFF', '--accent-light': '#FFFFFF', '--accent-dark': '#8A8A8A', '--accent-glow': 'rgba(255, 255, 255, 0.34)', '--bg-primary': '#000000', '--bg-secondary': '#080808', '--bg-gradient-start': '#262626', '--bg-gradient-end': '#020202', '--bg-card': '#121212', '--text-primary': '#FFFFFF', '--text-secondary': '#D4D4D4', '--text-muted': '#8E8E8E', '--gold': '#FFFFFF', '--gold-light': '#DCDCDC' }
};

const DEFAULT_COMPLIMENTS = [
  'Даже в детстве было понятно, что растет звезда обложки.',
  'У тебя редкий талант: быть стильной без усилий и яркой без лишних слов.',
  'В каждом кадре ты выглядишь так, будто это съемка для главного номера года.',
  'Твоя энергия собирает внимание сильнее любого заголовка на обложке.',
  'Ты тот самый человек, рядом с которым хочется становиться лучше и смелее.'
];

const DEFAULT_PROFILE = {
  name: 'Екатерина',
  theme: 'warm',
  videoSrc: 'assets/kling-story.mp4',
  posterSrc: 'assets/poster.jpg',
  photos: ['assets/photo1.jpg', 'assets/photo2.jpg', 'assets/photo3.jpg'],
  compliments: DEFAULT_COMPLIMENTS,
  buttonLabel: 'Узнать правду о себе',
  mediaTip: 'From little girl to cover star',
  quoteText: '«Даже в детстве было понятно, что растет <mark>звезда обложки</mark>!»'
};

const els = {
  girlRoute: document.getElementById('girlRoute'),
  adminLoginView: document.getElementById('adminLoginView'),
  adminView: document.getElementById('adminView'),
  emptyView: document.getElementById('emptyView'),
  invalidView: document.getElementById('invalidView')
};

const state = {
  db: { profiles: {} },
  selectedKey: null,
  complimentIndex: -1,
  isAnimating: false,
  activeProfile: null,
  galleryImages: ['', '', ''],
  galleryOrder: [0, 1, 2],
  galleryBusy: false,
  galleryBound: false,
  backendFallbackReason: '',
  backendMode: 'local',
  supabase: null
};

const params = new URLSearchParams(location.search);
const routeKey = params.get('key');

bootstrap().catch((err) => {
  console.error(err);
  showOnly('emptyView');
});

async function bootstrap() {
  await initBackend();
  setSplashScrollLock(false);

  if (routeKey) {
    const profile = await findProfile(routeKey);
    if (!profile) {
      showOnly('invalidView');
      return;
    }
    renderGirlPage(profile);
    return;
  }

  renderAdminEntry();
}

async function initBackend() {
  if (window.supabase && SUPABASE_URL && SUPABASE_ANON_KEY) {
    state.supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    state.backendMode = 'supabase';
    await loadProfiles();
    if (!Object.keys(state.db.profiles).length) {
      const seed = makeProfile(generateKey(), DEFAULT_PROFILE);
      await upsertProfile(seed);
      state.db.profiles[seed.id] = seed;
    }
    return;
  }

  state.backendMode = 'local';
  state.db = loadLocalDb();
  if (!Object.keys(state.db.profiles).length) {
    const seed = makeProfile(generateKey(), DEFAULT_PROFILE);
    state.db.profiles[seed.id] = seed;
    saveLocalDb();
  }
}

async function loadProfiles() {
  if (state.backendMode !== 'supabase') return;
  const { data, error } = await state.supabase
    .from(SUPABASE_TABLE)
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('Supabase load failed, fallback to localStorage.', error);
    state.backendMode = 'local';
    state.backendFallbackReason = String(error.message || 'Supabase query failed');
    state.db = loadLocalDb();
    return;
  }

  const map = {};
  data.forEach((row) => {
    map[row.access_key] = rowToProfile(row);
  });
  state.db.profiles = map;
}

async function findProfile(key) {
  if (state.backendMode === 'supabase') {
    const { data, error } = await state.supabase
      .from(SUPABASE_TABLE)
      .select('*')
      .eq('access_key', key)
      .limit(1)
      .maybeSingle();

    if (error || !data) return null;
    return rowToProfile(data);
  }

  return state.db.profiles[key] || null;
}

async function upsertProfile(profile) {
  if (state.backendMode === 'supabase') {
    const { error } = await state.supabase.from(SUPABASE_TABLE).upsert(profileToRow(profile), {
      onConflict: 'access_key'
    });
    if (error) throw error;
    return;
  }

  state.db.profiles[profile.id] = profile;
  saveLocalDb();
}

async function removeProfile(key) {
  if (state.backendMode === 'supabase') {
    const { error } = await state.supabase.from(SUPABASE_TABLE).delete().eq('access_key', key);
    if (error) throw error;
    return;
  }

  delete state.db.profiles[key];
  saveLocalDb();
}

async function uploadFileToStorage(file) {
  if (state.backendMode !== 'supabase') {
    throw new Error('Storage upload works only with Supabase backend.');
  }

  const ext = (file.name.split('.').pop() || 'bin').toLowerCase();
  const cleanBase = file.name.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 40) || 'file';
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${cleanBase}.${ext}`;
  const path = `uploads/${filename}`;

  const { error } = await state.supabase.storage.from(SUPABASE_BUCKET).upload(path, file, {
    upsert: false,
    cacheControl: '3600',
    contentType: file.type || undefined
  });
  if (error) throw error;

  const { data } = state.supabase.storage.from(SUPABASE_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

function makeProfile(key, source) {
  return {
    id: key,
    name: source.name || 'Героиня',
    theme: source.theme || 'warm',
    videoSrc: source.videoSrc || '',
    posterSrc: source.posterSrc || '',
    photos: normalizeLines(source.photos),
    compliments: normalizeLines(source.compliments),
    buttonLabel: source.buttonLabel || 'Узнать правду о себе',
    mediaTip: source.mediaTip || 'From little girl to cover star',
    quoteText: source.quoteText || DEFAULT_PROFILE.quoteText,
    createdAt: source.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

function rowToProfile(row) {
  return {
    id: row.access_key,
    name: row.name || 'Героиня',
    theme: row.theme || 'warm',
    videoSrc: row.video_src || '',
    posterSrc: row.poster_src || '',
    photos: normalizeLines(row.photos),
    compliments: normalizeLines(row.compliments),
    buttonLabel: row.button_label || 'Узнать правду о себе',
    mediaTip: row.media_tip || 'From little girl to cover star',
    quoteText: row.quote_text || DEFAULT_PROFILE.quoteText,
    createdAt: row.created_at || new Date().toISOString(),
    updatedAt: row.updated_at || new Date().toISOString()
  };
}

function profileToRow(profile) {
  return {
    access_key: profile.id,
    name: profile.name,
    theme: profile.theme,
    video_src: profile.videoSrc,
    poster_src: profile.posterSrc,
    photos: normalizeLines(profile.photos),
    compliments: normalizeLines(profile.compliments),
    button_label: profile.buttonLabel,
    media_tip: profile.mediaTip,
    quote_text: profile.quoteText,
    created_at: profile.createdAt,
    updated_at: new Date().toISOString()
  };
}

function loadLocalDb() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { profiles: {} };
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || !parsed.profiles) return { profiles: {} };
    return parsed;
  } catch {
    return { profiles: {} };
  }
}

function saveLocalDb() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.db));
}

function showOnly(id) {
  Object.keys(els).forEach((key) => {
    els[key].classList.toggle('hidden', key !== id);
  });
}

function applyTheme(themeName) {
  const theme = THEMES[themeName] || THEMES.warm;
  Object.entries(theme).forEach(([k, v]) => document.documentElement.style.setProperty(k, v));
}

function renderGirlPage(profile) {
  applyTheme(profile.theme);
  initFlowers();
  showOnly('girlRoute');
  setSplashScrollLock(true);
  state.activeProfile = profile;
  state.complimentIndex = -1;

  document.getElementById('storyName').textContent = profile.name || 'Героиня';
  document.title = 'История одной обложки: ' + (profile.name || 'Героиня');

  const compliments = normalizeLines(profile.compliments);
  const complimentBtn = document.getElementById('complimentBtn');
  const complimentText = document.getElementById('complimentText');
  const complimentSource = document.getElementById('complimentSource');
  complimentBtn.textContent = profile.buttonLabel || 'Узнать правду о себе';
  setChunkedText(complimentText, compliments[0] || DEFAULT_COMPLIMENTS[0]);
  complimentSource.classList.add('visible');

  document.getElementById('videoOverlayBottom').textContent = profile.mediaTip || 'From little girl to cover star';
  document.getElementById('quoteBig').innerHTML = profile.quoteText || DEFAULT_PROFILE.quoteText;
  applyStaticChunkHover();

  renderMedia(profile);
  renderGallery(profile);

  complimentBtn.onclick = () => nextCompliment();
}

function renderMedia(profile) {
  const video = document.getElementById('girlVideo');
  const image = document.getElementById('girlImage');
  const placeholder = document.getElementById('videoPlaceholder');
  const videoSrc = (profile.videoSrc || '').trim();
  const fallbackImage = normalizeLines(profile.photos)[0] || profile.posterSrc || '';

  if (videoSrc) {
    video.src = videoSrc;
    video.poster = profile.posterSrc || '';
    video.classList.remove('hidden');
    image.classList.add('hidden');
    placeholder.classList.add('hidden');
    video.load();
    return;
  }

  video.removeAttribute('src');
  video.classList.add('hidden');

  if (fallbackImage) {
    image.src = fallbackImage;
    image.classList.remove('hidden');
    placeholder.classList.add('hidden');
  } else {
    image.classList.add('hidden');
    placeholder.classList.remove('hidden');
  }
}

function renderGallery(profile) {
  const photos = normalizeLines(profile.photos).slice(0, 3);
  while (photos.length < 3) photos.push('');
  state.galleryImages = photos;
  state.galleryOrder = [0, 1, 2];
  state.galleryBusy = false;

  const slides = getGallerySlides();
  slides.forEach((slide, idx) => {
    setSlideImage(slide, state.galleryImages[idx], idx);
  });
  slides[state.galleryOrder[0]].setAttribute('data-pos', 'left');
  slides[state.galleryOrder[1]].setAttribute('data-pos', 'center');
  slides[state.galleryOrder[2]].setAttribute('data-pos', 'right');

  ensureGalleryDots();
  syncGalleryDots();
  bindGalleryEvents();
  renderPhotoManager();
}

function getGallerySlides() {
  return Array.from(document.querySelectorAll('.slide'));
}

function setSlideImage(slide, src, idx) {
  const img = slide.querySelector('img');
  const ph = slide.querySelector('.gallery-placeholder');
  img.alt = 'Фото ' + (idx + 1);
  if (src) {
    img.src = src;
    img.style.display = 'block';
    if (ph) ph.style.display = 'none';
  } else {
    img.removeAttribute('src');
    img.style.display = 'none';
    if (ph) {
      ph.style.display = 'flex';
      ph.textContent = 'Фото ' + (idx + 1);
    }
  }
}

function ensureGalleryDots() {
  const dotsWrap = document.getElementById('galleryDots');
  if (!dotsWrap) return;
  dotsWrap.innerHTML = '';
  state.galleryImages.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot';
    dot.type = 'button';
    dot.setAttribute('aria-label', 'Слайд ' + (i + 1));
    dot.dataset.i = String(i);
    dot.addEventListener('click', () => {
      if (state.galleryBusy || i === state.galleryOrder[1]) return;
      goGallery(i === state.galleryOrder[2] ? 'next' : 'prev');
    });
    dotsWrap.appendChild(dot);
  });
}

function syncGalleryDots() {
  const dots = Array.from(document.querySelectorAll('#galleryDots .dot'));
  dots.forEach((d, i) => d.classList.toggle('on', i === state.galleryOrder[1]));
}

function bindGalleryEvents() {
  if (state.galleryBound) return;
  state.galleryBound = true;

  const carousel = document.getElementById('carousel');
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');

  if (prev) prev.addEventListener('click', () => goGallery('prev'));
  if (next) next.addEventListener('click', () => goGallery('next'));

  getGallerySlides().forEach((s) => s.addEventListener('click', () => {
    const p = s.getAttribute('data-pos');
    if (p === 'left') goGallery('prev');
    if (p === 'right') goGallery('next');
  }));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') goGallery('next');
    if (e.key === 'ArrowLeft') goGallery('prev');
  });

  if (carousel) {
    let sx = 0;
    let sy = 0;
    carousel.addEventListener('touchstart', (e) => {
      sx = e.touches[0].clientX;
      sy = e.touches[0].clientY;
    }, { passive: true });
    carousel.addEventListener('touchend', (e) => {
      const dx = sx - e.changedTouches[0].clientX;
      const dy = sy - e.changedTouches[0].clientY;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        goGallery(dx > 0 ? 'next' : 'prev');
      }
    }, { passive: true });
  }
}

function goGallery(dir) {
  const slides = getGallerySlides();
  if (slides.length < 3 || state.galleryBusy) return;
  state.galleryBusy = true;

  const order = state.galleryOrder;
  let wrapIdx;
  let targetPos;
  let newOrder;

  if (dir === 'next') {
    wrapIdx = order[0];
    targetPos = 'right';
    newOrder = [order[1], order[2], order[0]];
  } else {
    wrapIdx = order[2];
    targetPos = 'left';
    newOrder = [order[2], order[0], order[1]];
  }

  const wrapEl = slides[wrapIdx];
  const FADE_OUT = 200;
  const FADE_IN = 360;

  wrapEl.style.transition = `opacity ${FADE_OUT}ms ease-out`;
  wrapEl.style.opacity = '0';

  if (dir === 'next') {
    slides[order[1]].setAttribute('data-pos', 'left');
    slides[order[2]].setAttribute('data-pos', 'center');
  } else {
    slides[order[0]].setAttribute('data-pos', 'center');
    slides[order[1]].setAttribute('data-pos', 'right');
  }
  state.galleryOrder = newOrder;
  syncGalleryDots();

  setTimeout(() => {
    wrapEl.style.transition = 'none';
    wrapEl.setAttribute('data-pos', targetPos);
    void wrapEl.offsetHeight;

    requestAnimationFrame(() => {
      wrapEl.style.transition = `opacity ${FADE_IN}ms ease-in`;
      wrapEl.style.opacity = '';
      setTimeout(() => {
        wrapEl.style.transition = '';
        wrapEl.style.opacity = '';
        state.galleryBusy = false;
      }, FADE_IN + 40);
    });
  }, FADE_OUT + 20);
}

function readPhotosFromInput() {
  return normalizeLines(document.getElementById('photosInput').value).slice(0, 3);
}

function writePhotosToInput(photos) {
  document.getElementById('photosInput').value = photos.join('\n');
}

function renderPhotoManager() {
  const list = document.getElementById('photoManagerList');
  if (!list) return;
  const photos = readPhotosFromInput();
  list.innerHTML = '';

  if (!photos.length) {
    list.innerHTML = '<p class="admin-hint">Фото пока не добавлены.</p>';
    return;
  }

  photos.forEach((url, i) => {
    const row = document.createElement('div');
    row.className = 'photo-row';
    row.innerHTML = [
      '<div class="photo-thumb"><img src="' + escapeHtml(url) + '" alt="Фото ' + (i + 1) + '"></div>',
      '<div class="photo-url">' + escapeHtml(url) + '</div>',
      '<div class="photo-actions">',
      '<button class="photo-btn" data-act="up" data-i="' + i + '" title="Выше">↑</button>',
      '<button class="photo-btn" data-act="down" data-i="' + i + '" title="Ниже">↓</button>',
      '<button class="photo-btn" data-act="center" data-i="' + i + '" title="Сделать центральной">⦿</button>',
      '<button class="photo-btn danger" data-act="remove" data-i="' + i + '" title="Удалить">×</button>',
      '</div>'
    ].join('');
    list.appendChild(row);
  });
}

function updatePhotoManagerAndGallery() {
  const photos = readPhotosFromInput();
  state.galleryImages = [...photos, ...Array(Math.max(0, 3 - photos.length)).fill('')];
  state.galleryOrder = [0, 1, 2];
  const slides = getGallerySlides();
  slides.forEach((slide, idx) => setSlideImage(slide, state.galleryImages[idx], idx));
  slides[state.galleryOrder[0]].setAttribute('data-pos', 'left');
  slides[state.galleryOrder[1]].setAttribute('data-pos', 'center');
  slides[state.galleryOrder[2]].setAttribute('data-pos', 'right');
  ensureGalleryDots();
  syncGalleryDots();
  renderPhotoManager();
}

function nextCompliment() {
  if (state.isAnimating || !state.activeProfile) return;
  state.isAnimating = true;
  const compliments = normalizeLines(state.activeProfile.compliments);
  const textEl = document.getElementById('complimentText');
  const sourceEl = document.getElementById('complimentSource');
  const btn = document.getElementById('complimentBtn');

  createSparkles(btn);
  textEl.classList.add('fading');
  sourceEl.classList.remove('visible');

  setTimeout(() => {
    state.complimentIndex = (state.complimentIndex + 1) % Math.max(compliments.length, 1);
    setChunkedText(textEl, compliments[state.complimentIndex] || DEFAULT_COMPLIMENTS[0]);
    textEl.classList.remove('fading');
    sourceEl.classList.add('visible');
    btn.textContent = 'Еще комплимент ✨';
    state.isAnimating = false;
  }, 500);
}

function createSparkles(element) {
  const rect = element.getBoundingClientRect();
  const container = document.getElementById('sparkleContainer');
  for (let i = 0; i < 12; i++) {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    const x = rect.left + rect.width / 2 + (Math.random() - 0.5) * rect.width;
    const y = rect.top + rect.height / 2;
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.setProperty('--sx', (Math.random() - 0.5) * 120 + 'px');
    sparkle.style.setProperty('--sy', (Math.random() - 0.5) * 120 - 30 + 'px');
    sparkle.style.width = Math.random() * 4 + 2 + 'px';
    sparkle.style.height = sparkle.style.width;
    sparkle.style.animationDuration = Math.random() * 0.8 + 0.8 + 's';
    container.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 2000);
  }
}

function setChunkedText(el, text) {
  const raw = String(text || '').trim();
  if (!raw) {
    el.textContent = '';
    return;
  }
  const html = raw
    .split(/(\s+)/)
    .map((part) => (/^\s+$/.test(part) ? part : '<span class="hover-chunk">' + escapeHtml(part) + '</span>'))
    .join('');
  el.innerHTML = html;
}

function applyStaticChunkHover() {
  const candidates = [
    '.brand-top',
    '.brand-date',
    '.story-label',
    '#videoOverlayTop',
    '#videoOverlayBottom',
    '.quote-author',
    '.secret-trigger'
  ];

  candidates.forEach((sel) => {
    document.querySelectorAll(sel).forEach((el) => {
      if (el.dataset.chunked === '1' && el.children.length > 0) return;
      if (el.children.length > 0) return;
      setChunkedText(el, el.textContent || '');
      el.dataset.chunked = '1';
    });
  });
}

function closeSplash() {
  const splash = document.getElementById('splash');
  if (!splash || splash.classList.contains('closing')) return;
  splash.classList.add('closing');
  setTimeout(() => {
    splash.style.display = 'none';
    setSplashScrollLock(false);
    document.getElementById('mainContent').classList.add('visible');
    initScrollReveal();
  }, 900);
}

function setSplashScrollLock(locked) {
  document.documentElement.classList.toggle('splash-lock', locked);
  document.body.classList.toggle('splash-lock', locked);
}

function initFlowers() {
  const container = document.getElementById('splashFlowers');
  if (!container) return;
  const flowers = ['✿', '❀', '✾', '❁', '✽', '♡', '⚘', '❋'];
  const cs = getComputedStyle(document.documentElement);
  const palette = [
    cs.getPropertyValue('--accent').trim(),
    cs.getPropertyValue('--accent-light').trim(),
    cs.getPropertyValue('--text-primary').trim(),
    cs.getPropertyValue('--text-secondary').trim(),
    cs.getPropertyValue('--text-muted').trim(),
    cs.getPropertyValue('--gold-light').trim()
  ].filter(Boolean);
  container.innerHTML = '';
  for (let i = 0; i < 20; i++) {
    const el = document.createElement('div');
    el.classList.add('flower');
    el.textContent = flowers[Math.floor(Math.random() * flowers.length)];
    el.style.left = Math.random() * 100 + '%';
    el.style.fontSize = Math.random() * 1.2 + 0.8 + 'rem';
    el.style.animationDuration = Math.random() * 4 + 5 + 's';
    el.style.animationDelay = Math.random() * 6 + 's';
    el.style.color = palette[Math.floor(Math.random() * palette.length)] || 'rgba(255,255,255,.75)';
    container.appendChild(el);
  }
}

function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('revealed'), idx * 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  reveals.forEach((el) => observer.observe(el));
}

function toggleSecret() {
  const content = document.getElementById('secretContent');
  content.classList.toggle('open');
}

function renderAdminEntry() {
  const authed = sessionStorage.getItem(AUTH_KEY) === '1';
  if (authed) {
    renderAdmin();
    return;
  }

  showOnly('adminLoginView');
  const loginBtn = document.getElementById('adminLoginBtn');
  const codeInput = document.getElementById('adminCode');
  const loginMsg = document.getElementById('adminLoginMsg');
  loginBtn.onclick = () => {
    if (codeInput.value.trim() === ADMIN_CODE) {
      sessionStorage.setItem(AUTH_KEY, '1');
      renderAdmin();
    } else {
      loginMsg.textContent = 'Неверный код доступа.';
    }
  };
}

function renderAdmin() {
  showOnly('adminView');
  bindAdminEvents();
  refreshList();
  if (!state.selectedKey) {
    const first = Object.keys(state.db.profiles)[0];
    if (first) selectProfile(first);
  }
}

function bindAdminEvents() {
  const form = document.getElementById('profileForm');
  const uploadBtn = document.getElementById('uploadMediaBtn');
  const mediaInput = document.getElementById('mediaFileInput');
  const mediaTarget = document.getElementById('mediaTarget');
  const uploadMsg = document.getElementById('uploadMsg');
  if (form.dataset.bound === '1') return;
  form.dataset.bound = '1';

  const photosInput = document.getElementById('photosInput');
  photosInput.addEventListener('input', () => renderPhotoManager());

  const manager = document.getElementById('photoManagerList');
  manager.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-act]');
    if (!btn) return;
    const act = btn.dataset.act;
    const idx = Number(btn.dataset.i);
    const photos = readPhotosFromInput();
    if (!Number.isFinite(idx) || idx < 0 || idx >= photos.length) return;

    if (act === 'remove') {
      photos.splice(idx, 1);
    } else if (act === 'up' && idx > 0) {
      [photos[idx - 1], photos[idx]] = [photos[idx], photos[idx - 1]];
    } else if (act === 'down' && idx < photos.length - 1) {
      [photos[idx + 1], photos[idx]] = [photos[idx], photos[idx + 1]];
    } else if (act === 'center' && idx !== 1) {
      const picked = photos.splice(idx, 1)[0];
      photos.splice(1, 0, picked);
    }

    writePhotosToInput(photos.slice(0, 3));
    updatePhotoManagerAndGallery();
  });

  document.getElementById('newProfileBtn').onclick = async () => {
    const key = generateKey();
    const profile = makeProfile(key, DEFAULT_PROFILE);
    await upsertProfile(profile);
    state.db.profiles[key] = profile;
    refreshList();
    selectProfile(key);
    renderPhotoManager();
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!state.selectedKey) return;

    const profile = makeProfile(state.selectedKey, {
      name: document.getElementById('nameInput').value.trim() || 'Героиня',
      theme: document.getElementById('themeInput').value || 'warm',
      videoSrc: document.getElementById('videoInput').value.trim(),
      posterSrc: document.getElementById('posterInput').value.trim(),
      photos: normalizeLines(document.getElementById('photosInput').value),
      buttonLabel: document.getElementById('buttonInput').value.trim() || 'Узнать правду о себе',
      compliments: normalizeLines(document.getElementById('complimentsInput').value),
      mediaTip: document.getElementById('tipInput').value.trim() || 'From little girl to cover star',
      quoteText: document.getElementById('quoteInput').value.trim() || DEFAULT_PROFILE.quoteText,
      createdAt: state.db.profiles[state.selectedKey]?.createdAt
    });

    await upsertProfile(profile);
    state.db.profiles[profile.id] = profile;
    refreshList();
    selectProfile(profile.id);
    renderPhotoManager();
    flashSaved('Сохранено');
  });

  document.getElementById('deleteBtn').onclick = async () => {
    if (!state.selectedKey) return;
    const profile = state.db.profiles[state.selectedKey];
    const ok = confirm('Удалить профиль "' + (profile?.name || '') + '"?');
    if (!ok) return;

    await removeProfile(state.selectedKey);
    delete state.db.profiles[state.selectedKey];
    state.selectedKey = null;
    refreshList();
    const first = Object.keys(state.db.profiles)[0];
    if (first) {
      selectProfile(first);
    } else {
      document.getElementById('profileForm').reset();
      document.getElementById('profileLink').textContent = 'Профилей пока нет';
      document.getElementById('adminPreview').innerHTML = '';
      renderPhotoManager();
    }
  };

  document.getElementById('copyLinkBtn').onclick = async () => {
    const link = currentProfileLink();
    if (!link) return;
    try {
      await navigator.clipboard.writeText(link);
      flashSaved('Ссылка скопирована');
    } catch {
      flashSaved('Не удалось скопировать, скопируйте вручную');
    }
  };

  document.getElementById('openLinkBtn').onclick = () => {
    const link = currentProfileLink();
    if (!link) return;
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  document.getElementById('logoutBtn').onclick = () => {
    sessionStorage.removeItem(AUTH_KEY);
    location.href = location.pathname;
  };

  uploadBtn.onclick = async () => {
    const files = Array.from(mediaInput.files || []);
    if (!files.length) {
      uploadMsg.textContent = 'Выберите файл для загрузки.';
      return;
    }
    if (state.backendMode !== 'supabase') {
      const reason = state.backendFallbackReason ? (' Причина fallback: ' + state.backendFallbackReason + '.') : '';
      uploadMsg.textContent = 'Сейчас включен localStorage.' + reason + ' Для Supabase-режима проверь SUPABASE_URL/SUPABASE_ANON_KEY и выполни SQL из supabase_schema.sql.';
      return;
    }

    uploadMsg.textContent = 'Загрузка...';
    try {
      const urls = [];
      for (const file of files) {
        const url = await uploadFileToStorage(file);
        urls.push(url);
      }

      if (mediaTarget.value === 'video') {
        document.getElementById('videoInput').value = urls[0];
      } else if (mediaTarget.value === 'poster') {
        document.getElementById('posterInput').value = urls[0];
      } else {
        const oldLines = normalizeLines(photosInput.value);
        photosInput.value = [...oldLines, ...urls].join('\n');
        updatePhotoManagerAndGallery();
      }

      mediaInput.value = '';
      uploadMsg.textContent = 'Загрузка завершена, ссылка(и) подставлена(ы) в форму.';
    } catch (err) {
      console.error(err);
      const reason = err?.message ? String(err.message) : 'Неизвестная ошибка';
      uploadMsg.textContent = 'Ошибка загрузки: ' + reason + '. Проверь bucket "media" (public) и Storage policy для anon.';
    }
  };
}

function refreshList() {
  const list = document.getElementById('profileList');
  list.innerHTML = '';
  const entries = Object.values(state.db.profiles).sort((a, b) => (a.name || '').localeCompare(b.name || '', 'ru'));
  entries.forEach((profile) => {
    const item = document.createElement('article');
    item.className = 'admin-item' + (state.selectedKey === profile.id ? ' active' : '');
    item.onclick = () => selectProfile(profile.id);
    item.innerHTML = '<p class="admin-item-name">' + escapeHtml(profile.name || 'Без имени') + '</p><p class="admin-item-key">key: ' + escapeHtml(profile.id) + '</p>';
    list.appendChild(item);
  });
}

function selectProfile(key) {
  const p = state.db.profiles[key];
  if (!p) return;
  state.selectedKey = key;
  refreshList();
  document.getElementById('nameInput').value = p.name || '';
  document.getElementById('themeInput').value = p.theme || 'warm';
  document.getElementById('videoInput').value = p.videoSrc || '';
  document.getElementById('posterInput').value = p.posterSrc || '';
  document.getElementById('photosInput').value = normalizeLines(p.photos).join('\n');
  document.getElementById('buttonInput').value = p.buttonLabel || 'Узнать правду о себе';
  document.getElementById('complimentsInput').value = normalizeLines(p.compliments).join('\n');
  document.getElementById('tipInput').value = p.mediaTip || 'From little girl to cover star';
  document.getElementById('quoteInput').value = p.quoteText || DEFAULT_PROFILE.quoteText;
  document.getElementById('profileLink').textContent = currentProfileLink();
  renderAdminPreview(p);
  renderPhotoManager();
}

function renderAdminPreview(profile) {
  const wrap = document.getElementById('adminPreview');
  wrap.innerHTML = '<div style="border:1px solid rgba(255,255,255,.14);border-radius:12px;padding:10px;"><p style="margin:0;font-weight:700;">Предпросмотр: ' + escapeHtml(profile.name || 'Героиня') + '</p><p style="margin:6px 0 0;color:var(--text-muted);font-size:12px;">Тема: ' + escapeHtml(profile.theme || 'warm') + '</p><p style="margin:6px 0 0;color:var(--text-muted);font-size:12px;">Фото: ' + normalizeLines(profile.photos).length + '</p><p style="margin:6px 0 0;color:var(--text-muted);font-size:12px;">Комплименты: ' + normalizeLines(profile.compliments).length + '</p><p style="margin:6px 0 0;color:var(--text-muted);font-size:12px;">Backend: ' + state.backendMode + '</p></div>';
}

function currentProfileLink() {
  if (!state.selectedKey) return '';
  return getBaseUrl() + '?key=' + encodeURIComponent(state.selectedKey);
}

function getBaseUrl() {
  if (location.protocol === 'file:') {
    return location.href.split('?')[0].split('#')[0];
  }
  return location.origin + location.pathname;
}

function flashSaved(text) {
  const msg = document.getElementById('savedMsg');
  msg.textContent = text;
  setTimeout(() => {
    if (msg.textContent === text) msg.textContent = '';
  }, 1800);
}

function normalizeLines(value) {
  if (Array.isArray(value)) return value.map((s) => String(s).trim()).filter(Boolean);
  return String(value || '').split(/\r?\n/g).map((s) => s.trim()).filter(Boolean);
}

function generateKey() {
  const bytes = new Uint8Array(8);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

function escapeHtml(input) {
  return String(input).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
}

document.addEventListener('dblclick', (e) => e.preventDefault());
