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
  black: { '--accent': '#7A9EB8', '--accent-light': '#B5D1E3', '--accent-dark': '#4A7A99', '--accent-glow': 'rgba(122, 158, 184, 0.42)', '--bg-primary': '#090E12', '--bg-secondary': '#10171D', '--bg-card': '#152028', '--text-primary': '#ECF3F8', '--text-secondary': '#AFC2CF', '--text-muted': '#6D818F', '--gold': '#C5A96C', '--gold-light': '#E2CFA2' }
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
  galleryPhotos: ['', '', ''],
  galleryCenterIndex: 0,
  gallerySlots: null,
  galleryAnimating: false,
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
  initFlowers();
  await initBackend();

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
    cacheControl: '3600'
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
  showOnly('girlRoute');
  state.activeProfile = profile;
  state.complimentIndex = -1;
  state.galleryCenterIndex = 0;
  applyTheme(profile.theme);

  document.getElementById('storyName').textContent = profile.name || 'Героиня';
  document.title = 'История одной обложки: ' + (profile.name || 'Героиня');

  const compliments = normalizeLines(profile.compliments);
  const complimentBtn = document.getElementById('complimentBtn');
  const complimentText = document.getElementById('complimentText');
  const complimentSource = document.getElementById('complimentSource');
  complimentBtn.textContent = profile.buttonLabel || 'Узнать правду о себе';
  complimentText.textContent = compliments[0] || DEFAULT_COMPLIMENTS[0];
  complimentSource.classList.add('visible');

  document.getElementById('videoOverlayBottom').textContent = profile.mediaTip || 'From little girl to cover star';
  document.getElementById('quoteBig').innerHTML = profile.quoteText || DEFAULT_PROFILE.quoteText;

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
  state.galleryPhotos = photos;
  state.galleryCenterIndex = wrappedIndex(state.galleryCenterIndex, state.galleryPhotos.length);

  bindGalleryEvents();
  initGallerySlots();
  resetGalleryForCurrentCenter();
  rebuildGalleryDots();
}

function bindGalleryEvents() {
  const stage = document.getElementById('galleryGrid');
  if (!stage || stage.dataset.bound === '1') return;
  stage.dataset.bound = '1';

  const prevBtn = document.getElementById('galleryPrevBtn');
  const nextBtn = document.getElementById('galleryNextBtn');

  prevBtn.onclick = () => shiftGallery(-1);
  nextBtn.onclick = () => shiftGallery(1);

  let touchStartX = 0;
  let touchStartY = 0;

  stage.addEventListener('touchstart', (e) => {
    const t = e.changedTouches[0];
    touchStartX = t.clientX;
    touchStartY = t.clientY;
  }, { passive: true });

  stage.addEventListener('touchend', (e) => {
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStartX;
    const dy = t.clientY - touchStartY;
    if (Math.abs(dx) < 32 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) shiftGallery(1);
    else shiftGallery(-1);
  }, { passive: true });
}

function shiftGallery(step) {
  const count = state.galleryPhotos.length;
  if (!count || state.galleryAnimating || !state.gallerySlots) return;

  const leftEl = state.gallerySlots.left;
  const centerEl = state.gallerySlots.center;
  const rightEl = state.gallerySlots.right;

  state.galleryAnimating = true;

  if (step > 0) {
    const incomingIdx = wrappedIndex(state.galleryCenterIndex + 2, count);
    prepareIncomingCard(leftEl, 'off-right', incomingIdx);

    requestAnimationFrame(() => {
      setCardPosition(centerEl, 'left');
      setCardPosition(rightEl, 'center');
      setCardPosition(leftEl, 'right');
    });

    waitCardTransition(rightEl, () => {
      state.galleryCenterIndex = wrappedIndex(state.galleryCenterIndex + 1, count);
      state.gallerySlots = { left: centerEl, center: rightEl, right: leftEl };
      updateGalleryDotsActive();
      state.galleryAnimating = false;
    });
    return;
  }

  const incomingIdx = wrappedIndex(state.galleryCenterIndex - 2, count);
  prepareIncomingCard(rightEl, 'off-left', incomingIdx);

  requestAnimationFrame(() => {
    setCardPosition(leftEl, 'center');
    setCardPosition(centerEl, 'right');
    setCardPosition(rightEl, 'left');
  });

  waitCardTransition(leftEl, () => {
    state.galleryCenterIndex = wrappedIndex(state.galleryCenterIndex - 1, count);
    state.gallerySlots = { left: rightEl, center: leftEl, right: centerEl };
    updateGalleryDotsActive();
    state.galleryAnimating = false;
  });
}

function rebuildGalleryDots() {
  const dots = document.getElementById('galleryDots');
  if (!dots) return;
  dots.innerHTML = '';
  state.galleryPhotos.forEach((_, idx) => {
    const dot = document.createElement('span');
    dot.className = 'gallery-dot' + (idx === state.galleryCenterIndex ? ' active' : '');
    dot.addEventListener('click', () => {
      if (state.galleryAnimating) return;
      state.galleryCenterIndex = idx;
      resetGalleryForCurrentCenter();
      updateGalleryDotsActive();
    });
    dots.appendChild(dot);
  });
}

function initGallerySlots() {
  if (state.gallerySlots) return;
  state.gallerySlots = {
    left: document.querySelector('.gallery-card[data-slot="left"]'),
    center: document.querySelector('.gallery-card[data-slot="center"]'),
    right: document.querySelector('.gallery-card[data-slot="right"]')
  };
}

function resetGalleryForCurrentCenter() {
  if (!state.gallerySlots) return;
  const count = state.galleryPhotos.length;
  const leftIdx = wrappedIndex(state.galleryCenterIndex - 1, count);
  const centerIdx = wrappedIndex(state.galleryCenterIndex, count);
  const rightIdx = wrappedIndex(state.galleryCenterIndex + 1, count);

  setCardPosition(state.gallerySlots.left, 'left');
  setCardPosition(state.gallerySlots.center, 'center');
  setCardPosition(state.gallerySlots.right, 'right');
  setCardPhoto(state.gallerySlots.left, leftIdx);
  setCardPhoto(state.gallerySlots.center, centerIdx);
  setCardPhoto(state.gallerySlots.right, rightIdx);
  state.galleryAnimating = false;
}

function prepareIncomingCard(card, offPosition, photoIdx) {
  setCardPhoto(card, photoIdx);
  card.classList.add('gallery-card--no-transition');
  setCardPosition(card, offPosition);
  void card.offsetWidth;
  card.classList.remove('gallery-card--no-transition');
}

function setCardPhoto(card, photoIdx) {
  if (!card) return;
  const img = card.querySelector('img');
  const fallback = card.querySelector('.gallery-placeholder');
  const src = state.galleryPhotos[photoIdx] || '';

  img.alt = 'Фото ' + (photoIdx + 1);
  if (src) {
    img.src = src;
    img.style.display = 'block';
    fallback.style.display = 'none';
  } else {
    img.removeAttribute('src');
    img.style.display = 'none';
    fallback.style.display = 'flex';
    fallback.textContent = 'Фото ' + (photoIdx + 1);
  }
}

function setCardPosition(card, position) {
  if (!card) return;
  card.classList.remove('gallery-card--left', 'gallery-card--center', 'gallery-card--right', 'gallery-card--off-left', 'gallery-card--off-right');
  card.classList.add('gallery-card--' + position);
}

function waitCardTransition(card, done) {
  let called = false;
  const finish = () => {
    if (called) return;
    called = true;
    done();
  };

  const onEnd = (e) => {
    if (e.target !== card || e.propertyName !== 'transform') return;
    card.removeEventListener('transitionend', onEnd);
    finish();
  };

  card.addEventListener('transitionend', onEnd);
  setTimeout(() => {
    card.removeEventListener('transitionend', onEnd);
    finish();
  }, 520);
}

function updateGalleryDotsActive() {
  const dots = document.querySelectorAll('#galleryDots .gallery-dot');
  dots.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === state.galleryCenterIndex);
  });
}

function wrappedIndex(i, len) {
  if (!len) return 0;
  return ((i % len) + len) % len;
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
    textEl.textContent = compliments[state.complimentIndex] || DEFAULT_COMPLIMENTS[0];
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

function closeSplash() {
  const splash = document.getElementById('splash');
  if (!splash || splash.classList.contains('closing')) return;
  splash.classList.add('closing');
  setTimeout(() => {
    splash.style.display = 'none';
    document.getElementById('mainContent').classList.add('visible');
    initScrollReveal();
  }, 900);
}

function initFlowers() {
  const container = document.getElementById('splashFlowers');
  if (!container) return;
  const flowers = ['✿', '❀', '✾', '❁', '✽', '♡', '⚘', '❋'];
  container.innerHTML = '';
  for (let i = 0; i < 20; i++) {
    const el = document.createElement('div');
    el.classList.add('flower');
    el.textContent = flowers[Math.floor(Math.random() * flowers.length)];
    el.style.left = Math.random() * 100 + '%';
    el.style.fontSize = Math.random() * 1.2 + 0.8 + 'rem';
    el.style.animationDuration = Math.random() * 4 + 5 + 's';
    el.style.animationDelay = Math.random() * 6 + 's';
    el.style.color = `hsl(${Math.random() * 40 + 15}, ${Math.random() * 30 + 40}%, ${Math.random() * 20 + 60}%)`;
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

  document.getElementById('newProfileBtn').onclick = async () => {
    const key = generateKey();
    const profile = makeProfile(key, DEFAULT_PROFILE);
    await upsertProfile(profile);
    state.db.profiles[key] = profile;
    refreshList();
    selectProfile(key);
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
      uploadMsg.textContent = 'Сейчас включен localStorage. Для загрузки укажите SUPABASE_URL и SUPABASE_ANON_KEY.';
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
        const photosInput = document.getElementById('photosInput');
        const oldLines = normalizeLines(photosInput.value);
        photosInput.value = [...oldLines, ...urls].join('\n');
      }

      mediaInput.value = '';
      uploadMsg.textContent = 'Загрузка завершена, ссылка(и) подставлена(ы) в форму.';
    } catch (err) {
      console.error(err);
      uploadMsg.textContent = 'Ошибка загрузки. Проверь bucket "media" (public) и права Storage.';
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
