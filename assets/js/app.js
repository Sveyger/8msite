const STORAGE_KEY = 'march8_master_profiles_v3';
const GLOBAL_STORAGE_KEY = 'march8_global_settings_v1';
const AUTH_KEY = 'march8_admin_auth';
const ADMIN_CODE = 'ANVLM8';

// Fill these values for production on GitHub Pages.
const SUPABASE_URL = 'https://xpfaragwxgmstrkaizcv.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_aJQbRNVHoJ_VmhAfx33m1Q_L_h3ujnY';
const SUPABASE_TABLE = 'march8_profiles';
const SUPABASE_BUCKET = 'media';
const SUPABASE_GLOBAL_TABLE = 'march8_global_settings';

const THEMES = {
  warm: { '--accent': '#C4956A', '--accent-light': '#E8CEB5', '--accent-dark': '#8B6914', '--accent-glow': 'rgba(196, 149, 106, 0.4)', '--bg-primary': '#0A0A0A', '--bg-secondary': '#111111', '--bg-card': '#1A1A1A', '--text-primary': '#F5F0EB', '--text-secondary': '#B8AFA6', '--text-muted': '#6B6460', '--gold': '#D4AF37', '--gold-light': '#F0D879' },
  brunette: { '--accent': '#A97A50', '--accent-light': '#D9B28B', '--accent-dark': '#6F4C2A', '--accent-glow': 'rgba(169, 122, 80, 0.42)', '--bg-primary': '#0C0B0B', '--bg-secondary': '#141212', '--bg-card': '#1B1715', '--text-primary': '#F2ECE6', '--text-secondary': '#BFAE9F', '--text-muted': '#76675E', '--gold': '#C7A04E', '--gold-light': '#E4C57A' },
  blonde: { '--accent': '#B8A9C9', '--accent-light': '#DDD3E8', '--accent-dark': '#7B6B8A', '--accent-glow': 'rgba(184, 169, 201, 0.42)', '--bg-primary': '#0D0C11', '--bg-secondary': '#15131A', '--bg-card': '#1D1B23', '--text-primary': '#F3EEF8', '--text-secondary': '#BCB2CA', '--text-muted': '#7A7288', '--gold': '#C9B277', '--gold-light': '#E6D7AD' },
  black: { '--accent': '#7A9EB8', '--accent-light': '#B5D1E3', '--accent-dark': '#4A7A99', '--accent-glow': 'rgba(122, 158, 184, 0.42)', '--bg-primary': '#090E12', '--bg-secondary': '#10171D', '--bg-card': '#152028', '--text-primary': '#ECF3F8', '--text-secondary': '#AFC2CF', '--text-muted': '#6D818F', '--gold': '#C5A96C', '--gold-light': '#E2CFA2' },
  girl_pink_white_black: { '--accent': '#FF4FA0', '--accent-light': '#FFE8F3', '--accent-dark': '#2A0D1D', '--accent-glow': 'rgba(255, 79, 160, 0.45)', '--bg-primary': '#060607', '--bg-secondary': '#101015', '--bg-gradient-start': '#13060F', '--bg-gradient-end': '#0A0A12', '--bg-card': '#17171D', '--text-primary': '#FFFFFF', '--text-secondary': '#F3D5E7', '--text-muted': '#B190A7', '--gold': '#FF83B8', '--gold-light': '#FFD1E7' },
  girl_pink: { '--accent': '#FF5DAF', '--accent-light': '#FFC2E0', '--accent-dark': '#A01D5E', '--accent-glow': 'rgba(255, 93, 175, 0.45)', '--bg-primary': '#130A12', '--bg-secondary': '#1A1020', '--bg-gradient-start': '#2A0E22', '--bg-gradient-end': '#13091A', '--bg-card': '#241425', '--text-primary': '#FFF0F7', '--text-secondary': '#E2B5CB', '--text-muted': '#A47D94', '--gold': '#FF75BA', '--gold-light': '#FFBFE0' },
  girl_violet: { '--accent': '#8E58FF', '--accent-light': '#C8ADFF', '--accent-dark': '#4B2A96', '--accent-glow': 'rgba(142, 88, 255, 0.45)', '--bg-primary': '#0E0A1A', '--bg-secondary': '#151126', '--bg-gradient-start': '#22133E', '--bg-gradient-end': '#120F24', '--bg-card': '#1E1735', '--text-primary': '#F3EEFF', '--text-secondary': '#C7B9EB', '--text-muted': '#8B7EAE', '--gold': '#9A6CFF', '--gold-light': '#D4C1FF' },
  girl_lilac_soft: { '--accent': '#E7C6FF', '--accent-light': '#F4E5FF', '--accent-dark': '#A17BBE', '--accent-glow': 'rgba(231, 198, 255, 0.45)', '--bg-primary': '#140F1D', '--bg-secondary': '#1D1529', '--bg-gradient-start': '#2C1F3A', '--bg-gradient-end': '#171223', '--bg-card': '#231A31', '--text-primary': '#FBF5FF', '--text-secondary': '#DCC8EC', '--text-muted': '#A58BB8', '--gold': '#E7C6FF', '--gold-light': '#F6EAFF' },
  girl_ethereal_serene: { '--accent': '#EADCDC', '--accent-light': '#ECE4D9', '--accent-dark': '#BDA9A6', '--accent-glow': 'rgba(234, 220, 220, 0.44)', '--bg-primary': '#161415', '--bg-secondary': '#1E1A1C', '--bg-gradient-start': '#2B2528', '--bg-gradient-end': '#181517', '--bg-card': '#241F22', '--text-primary': '#F3ECE8', '--text-secondary': '#D8CFCB', '--text-muted': '#A79995', '--gold': '#EBCFCC', '--gold-light': '#F0DFDE' },
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

const DEFAULT_PREDICTIONS_BELIEVE = [
  'В ближайшие дни ты получишь знак, который подтвердит: ты идешь в правильном направлении.',
  'Твоя энергия притянет важное знакомство, и оно сыграет тебе на руку.',
  'До конца месяца случится приятный поворот, о котором ты давно мечтала.',
  'Твое «да» в нужный момент откроет дверь в красивую новую историю.'
];

const DEFAULT_PREDICTIONS_SKEPTIC = [
  'Ты не веришь в предсказания, и правильно: твой главный прогноз строится твоими решениями.',
  'Пока другие ждут знаки, ты создаешь результат сама. Это твой сильный стиль.',
  'Твоя интуиция работает лучше любых гороскопов, когда ты к себе прислушиваешься.',
  'Секретный прогноз редакции: ты сама автор лучшего сценария для своей жизни.'
];

const DEFAULT_PREDICTION_BUTTON = 'Узнать предсказание';
const DEFAULT_ANSWERS_BUTTON = 'Посмотреть мои ответы';
const DEFAULT_SKEPTIC_ANSWERS_MESSAGE = 'Вы не верите в предсказания :)';
const DEFAULT_CREDITS = [
  'Creative Direction — Team',
  'Photography — Team',
  'Video Production — Kling AI',
  'Design & Development — Team',
  'With Love — Всегда \u2665'
];
const DEFAULT_CONTEST_TITLE = 'Конкурс цветов';
const DEFAULT_CONTEST_HINT = 'Введите код победителя, чтобы открыть свой приз.';
const DEFAULT_CONTEST_BUTTON = 'Проверить код';
const DEFAULT_CONTEST_WIN = 'Поздравляем! Код подтвержден.';
const DEFAULT_CONTEST_LOSE = 'Код не найден. Проверьте ввод.';
const DEFAULT_CONTEST_CODES = [];

const DEFAULT_PROFILE = {
  name: 'Екатерина',
  theme: 'warm',
  videoSrc: 'assets/kling-story.mp4',
  posterSrc: 'assets/poster.jpg',
  photos: ['assets/photo1.jpg', 'assets/photo2.jpg', 'assets/photo3.jpg'],
  compliments: DEFAULT_COMPLIMENTS,
  believesPredictions: true,
  predictionButtonLabel: DEFAULT_PREDICTION_BUTTON,
  skepticAnswersMessage: DEFAULT_SKEPTIC_ANSWERS_MESSAGE,
  surveyAnswers: [],
  predictionsBelieve: DEFAULT_PREDICTIONS_BELIEVE,
  predictionsSkeptic: DEFAULT_PREDICTIONS_SKEPTIC,
  buttonLabel: 'Узнать правду о себе',
  mediaTip: 'From little girl to cover star',
  quoteText: '«Даже в детстве было понятно, что растет <mark>звезда обложки</mark>!»'
};

const DEFAULT_GLOBAL_SETTINGS = {
  answersButtonLabel: DEFAULT_ANSWERS_BUTTON,
  creditsLines: DEFAULT_CREDITS,
  contestTitle: DEFAULT_CONTEST_TITLE,
  contestHint: DEFAULT_CONTEST_HINT,
  contestButtonLabel: DEFAULT_CONTEST_BUTTON,
  contestWinText: DEFAULT_CONTEST_WIN,
  contestLoseText: DEFAULT_CONTEST_LOSE,
  contestCodes: DEFAULT_CONTEST_CODES
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
  globalSettings: { ...DEFAULT_GLOBAL_SETTINGS },
  selectedKey: null,
  complimentIndex: -1,
  isAnimating: false,
  activeProfile: null,
  predictionMode: 'believe',
  predictionIndex: -1,
  predictionBusy: false,
  predictionAnswersVisible: false,
  predictionCursor: { believe: 0, skeptic: 0 },
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
  setAppReady(true);
});

async function bootstrap() {
  await initBackend();
  setSplashScrollLock(false);
  setAppReady(false);

  if (routeKey) {
    const profile = await findProfile(routeKey);
    if (!profile) {
      showOnly('invalidView');
      setAppReady(true);
      return;
    }
    renderGirlPage(profile);
    setAppReady(true);
    return;
  }

  renderAdminEntry();
  setAppReady(true);
}

async function initBackend() {
  if (window.supabase && SUPABASE_URL && SUPABASE_ANON_KEY) {
    state.supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    state.backendMode = 'supabase';
    await loadProfiles();
    await loadGlobalSettings();
    if (!Object.keys(state.db.profiles).length) {
      const seed = makeProfile(generateKey(), DEFAULT_PROFILE);
      await upsertProfile(seed);
      state.db.profiles[seed.id] = seed;
    }
    return;
  }

  state.backendMode = 'local';
  state.db = loadLocalDb();
  const normalized = {};
  Object.entries(state.db.profiles || {}).forEach(([k, v]) => {
    normalized[k] = makeProfile(k, v || {});
  });
  state.db.profiles = normalized;
  state.globalSettings = loadLocalGlobalSettings();
  if (!Object.keys(state.db.profiles).length) {
    const seed = makeProfile(generateKey(), DEFAULT_PROFILE);
    state.db.profiles[seed.id] = seed;
  }
  saveLocalDb();
  saveLocalGlobalSettings();
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

async function loadGlobalSettings() {
  if (state.backendMode !== 'supabase') return;

  const { data, error } = await state.supabase
    .from(SUPABASE_GLOBAL_TABLE)
    .select('*')
    .eq('id', 'global')
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error('Supabase global settings load failed, fallback to local global settings.', error);
    state.globalSettings = loadLocalGlobalSettings();
    return;
  }

  if (!data) {
    state.globalSettings = { ...DEFAULT_GLOBAL_SETTINGS };
    await upsertGlobalSettings(state.globalSettings);
    return;
  }

  state.globalSettings = rowToGlobalSettings(data);
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

async function upsertGlobalSettings(settings) {
  const normalized = normalizeGlobalSettings(settings);
  if (state.backendMode === 'supabase') {
    const { error } = await state.supabase.from(SUPABASE_GLOBAL_TABLE).upsert(globalSettingsToRow(normalized), {
      onConflict: 'id'
    });
    if (error) throw error;
    state.globalSettings = normalized;
    return;
  }

  state.globalSettings = normalized;
  saveLocalGlobalSettings();
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
    believesPredictions: typeof source.believesPredictions === 'boolean' ? source.believesPredictions : true,
    predictionButtonLabel: source.predictionButtonLabel || DEFAULT_PREDICTION_BUTTON,
    skepticAnswersMessage: source.skepticAnswersMessage || DEFAULT_SKEPTIC_ANSWERS_MESSAGE,
    surveyAnswers: normalizeLines(source.surveyAnswers),
    predictionsBelieve: normalizeLines(source.predictionsBelieve).length ? normalizeLines(source.predictionsBelieve) : DEFAULT_PREDICTIONS_BELIEVE,
    predictionsSkeptic: normalizeLines(source.predictionsSkeptic).length ? normalizeLines(source.predictionsSkeptic) : DEFAULT_PREDICTIONS_SKEPTIC,
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
    believesPredictions: typeof row.believes_predictions === 'boolean' ? row.believes_predictions : true,
    predictionButtonLabel: row.prediction_button_label || DEFAULT_PREDICTION_BUTTON,
    skepticAnswersMessage: row.skeptic_answers_message || DEFAULT_SKEPTIC_ANSWERS_MESSAGE,
    surveyAnswers: normalizeLines(row.survey_answers),
    predictionsBelieve: normalizeLines(row.predictions_believe).length ? normalizeLines(row.predictions_believe) : DEFAULT_PREDICTIONS_BELIEVE,
    predictionsSkeptic: normalizeLines(row.predictions_skeptic).length ? normalizeLines(row.predictions_skeptic) : DEFAULT_PREDICTIONS_SKEPTIC,
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
    believes_predictions: !!profile.believesPredictions,
    prediction_button_label: profile.predictionButtonLabel || DEFAULT_PREDICTION_BUTTON,
    skeptic_answers_message: profile.skepticAnswersMessage || DEFAULT_SKEPTIC_ANSWERS_MESSAGE,
    survey_answers: normalizeLines(profile.surveyAnswers),
    predictions_believe: normalizeLines(profile.predictionsBelieve),
    predictions_skeptic: normalizeLines(profile.predictionsSkeptic),
    button_label: profile.buttonLabel,
    media_tip: profile.mediaTip,
    quote_text: profile.quoteText,
    created_at: profile.createdAt,
    updated_at: new Date().toISOString()
  };
}

function rowToGlobalSettings(row) {
  return normalizeGlobalSettings({
    answersButtonLabel: row.answers_button_label,
    creditsLines: row.credits_lines,
    contestTitle: row.contest_title,
    contestHint: row.contest_hint,
    contestButtonLabel: row.contest_button_label,
    contestWinText: row.contest_win_text,
    contestLoseText: row.contest_lose_text,
    contestCodes: row.contest_codes
  });
}

function globalSettingsToRow(settings) {
  return {
    id: 'global',
    answers_button_label: settings.answersButtonLabel || DEFAULT_ANSWERS_BUTTON,
    credits_lines: normalizeLines(settings.creditsLines),
    contest_title: settings.contestTitle || DEFAULT_CONTEST_TITLE,
    contest_hint: settings.contestHint || DEFAULT_CONTEST_HINT,
    contest_button_label: settings.contestButtonLabel || DEFAULT_CONTEST_BUTTON,
    contest_win_text: settings.contestWinText || DEFAULT_CONTEST_WIN,
    contest_lose_text: settings.contestLoseText || DEFAULT_CONTEST_LOSE,
    contest_codes: normalizeContestCodes(settings.contestCodes),
    updated_at: new Date().toISOString()
  };
}

function normalizeGlobalSettings(source) {
  const s = source || {};
  return {
    answersButtonLabel: s.answersButtonLabel || DEFAULT_ANSWERS_BUTTON,
    creditsLines: normalizeLines(s.creditsLines).length ? normalizeLines(s.creditsLines) : DEFAULT_CREDITS,
    contestTitle: s.contestTitle || DEFAULT_CONTEST_TITLE,
    contestHint: s.contestHint || DEFAULT_CONTEST_HINT,
    contestButtonLabel: s.contestButtonLabel || DEFAULT_CONTEST_BUTTON,
    contestWinText: s.contestWinText || DEFAULT_CONTEST_WIN,
    contestLoseText: s.contestLoseText || DEFAULT_CONTEST_LOSE,
    contestCodes: normalizeContestCodes(s.contestCodes)
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

function loadLocalGlobalSettings() {
  try {
    const raw = localStorage.getItem(GLOBAL_STORAGE_KEY);
    if (!raw) return { ...DEFAULT_GLOBAL_SETTINGS };
    return normalizeGlobalSettings(JSON.parse(raw));
  } catch {
    return { ...DEFAULT_GLOBAL_SETTINGS };
  }
}

function saveLocalGlobalSettings() {
  localStorage.setItem(GLOBAL_STORAGE_KEY, JSON.stringify(normalizeGlobalSettings(state.globalSettings)));
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
  state.predictionMode = profile.believesPredictions ? 'believe' : 'skeptic';
  state.predictionIndex = -1;
  state.predictionBusy = false;
  state.predictionAnswersVisible = false;
  state.predictionCursor = { believe: 0, skeptic: 0 };

  document.getElementById('storyName').textContent = profile.name || 'Героиня';
  document.title = 'История одной обложки: ' + (profile.name || 'Героиня');

  const compliments = normalizeLines(profile.compliments);
  const complimentBtn = document.getElementById('complimentBtn');
  const complimentText = document.getElementById('complimentText');
  const complimentSource = document.getElementById('complimentSource');
  complimentBtn.textContent = profile.buttonLabel || 'Узнать правду о себе';
  setChunkedText(complimentText, compliments[0] || DEFAULT_COMPLIMENTS[0]);
  complimentSource.classList.add('visible');
  initPredictionUi(profile);
  renderCredits(state.globalSettings);
  initContestUi(state.globalSettings);

  document.getElementById('videoOverlayBottom').textContent = profile.mediaTip || 'From little girl to cover star';
  document.getElementById('quoteBig').innerHTML = profile.quoteText || DEFAULT_PROFILE.quoteText;
  applyStaticChunkHover();

  renderMedia(profile);
  renderGallery(profile);

  complimentBtn.onclick = () => nextCompliment();
  const predictionBtn = document.getElementById('predictionBtn');
  if (predictionBtn) predictionBtn.onclick = () => nextPrediction();
  const answersBtn = document.getElementById('answersBtn');
  if (answersBtn) answersBtn.onclick = () => showSurveyAnswers();
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
      '<button class="photo-btn" data-act="up" data-i="' + i + '" title="Выше">^</button>',
      '<button class="photo-btn" data-act="down" data-i="' + i + '" title="Ниже">v</button>',
      '<button class="photo-btn" data-act="center" data-i="' + i + '" title="Сделать центральной">o</button>',
      '<button class="photo-btn danger" data-act="remove" data-i="' + i + '" title="Удалить">x</button>',
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
    btn.textContent = 'Еще комплимент \u2728';
    state.isAnimating = false;
  }, 500);
}

function initPredictionUi(profile) {
  const answersBtn = document.getElementById('answersBtn');
  const btn = document.getElementById('predictionBtn');
  const textEl = document.getElementById('predictionText');
  const sourceEl = document.getElementById('predictionSource');
  if (!answersBtn || !btn || !textEl || !sourceEl) return;

  state.predictionMode = profile?.believesPredictions ? 'believe' : 'skeptic';
  state.predictionIndex = -1;
  state.predictionBusy = false;
  state.predictionAnswersVisible = false;
  state.predictionCursor = { believe: 0, skeptic: 0 };
  btn.textContent = profile?.predictionButtonLabel || DEFAULT_PREDICTION_BUTTON;
  answersBtn.textContent = state.globalSettings?.answersButtonLabel || DEFAULT_ANSWERS_BUTTON;
  answersBtn.classList.remove('is-active');
  sourceEl.textContent = state.predictionMode === 'believe'
    ? '— Астрологическая колонка VOGUE'
    : '— Редакция рационального взгляда';
  setChunkedText(textEl, '');
  sourceEl.classList.remove('visible');
}

function nextPrediction() {
  if (!state.activeProfile || state.predictionBusy) return;
  state.predictionBusy = true;
  state.predictionAnswersVisible = false;

  const textEl = document.getElementById('predictionText');
  const sourceEl = document.getElementById('predictionSource');
  const answersBtn = document.getElementById('answersBtn');
  if (!textEl || !sourceEl) {
    state.predictionBusy = false;
    return;
  }
  if (answersBtn) answersBtn.classList.remove('is-active');

  const list = state.predictionMode === 'skeptic'
    ? normalizeLines(state.activeProfile.predictionsSkeptic)
    : normalizeLines(state.activeProfile.predictionsBelieve);
  const safeList = list.length ? list : (state.predictionMode === 'skeptic' ? DEFAULT_PREDICTIONS_SKEPTIC : DEFAULT_PREDICTIONS_BELIEVE);
  const modeKey = state.predictionMode === 'skeptic' ? 'skeptic' : 'believe';
  const len = safeList.length;
  const rawCursor = Number(state.predictionCursor[modeKey] || 0);
  const cursor = ((rawCursor % len) + len) % len;

  textEl.classList.add('fading');
  sourceEl.classList.remove('visible');

  setTimeout(() => {
    state.predictionIndex = cursor;
    setChunkedText(textEl, safeList[cursor] || '');
    state.predictionCursor[modeKey] = (cursor + 1) % len;
    textEl.classList.remove('fading');
    sourceEl.classList.add('visible');
    state.predictionBusy = false;
  }, 420);
}

function showSurveyAnswers() {
  if (!state.activeProfile || state.predictionBusy) return;
  state.predictionBusy = true;

  const textEl = document.getElementById('predictionText');
  const sourceEl = document.getElementById('predictionSource');
  const answersBtn = document.getElementById('answersBtn');
  if (!textEl || !sourceEl) {
    state.predictionBusy = false;
    return;
  }

  if (answersBtn) {
    answersBtn.classList.add('tap-anim');
    setTimeout(() => answersBtn.classList.remove('tap-anim'), 420);
  }

  textEl.classList.add('fading');
  sourceEl.classList.remove('visible');

  setTimeout(() => {
    if (state.predictionAnswersVisible) {
      textEl.textContent = '';
      sourceEl.classList.remove('visible');
      if (answersBtn) answersBtn.classList.remove('is-active');
      state.predictionAnswersVisible = false;
      textEl.classList.remove('fading');
      state.predictionBusy = false;
      return;
    }

    if (state.activeProfile.believesPredictions) {
      const tableRows = parseSurveyQa(state.activeProfile.surveyAnswers);
      if (tableRows.length) {
        textEl.innerHTML = renderSurveyTable(tableRows);
      } else {
        textEl.textContent = 'Ответы опроса пока не добавлены.';
      }
      sourceEl.textContent = '— Твои ответы';
    } else {
      setChunkedText(textEl, state.activeProfile.skepticAnswersMessage || DEFAULT_SKEPTIC_ANSWERS_MESSAGE);
      sourceEl.textContent = '— Редакция';
    }
    if (answersBtn) answersBtn.classList.add('is-active');
    state.predictionAnswersVisible = true;
    textEl.classList.remove('fading');
    sourceEl.classList.add('visible');
    state.predictionBusy = false;
  }, 420);
}

function renderCredits(profile) {
  const wrap = document.getElementById('creditsList');
  if (!wrap) return;
  const lines = normalizeLines(profile?.creditsLines);
  const finalLines = lines.length ? lines : DEFAULT_CREDITS;
  wrap.innerHTML = finalLines.map((line) => '<span>' + escapeHtml(line) + '</span>').join('');
}

function initContestUi(profile) {
  const titleEl = document.getElementById('contestTitle');
  const hintEl = document.getElementById('contestHint');
  const inputEl = document.getElementById('contestCodeInput');
  const buttonEl = document.getElementById('contestCheckBtn');
  const resultEl = document.getElementById('contestResult');
  const flowerWrap = document.getElementById('contestFlower');
  const flowerEmoji = document.getElementById('contestFlowerEmoji');
  if (!titleEl || !hintEl || !inputEl || !buttonEl || !resultEl || !flowerWrap || !flowerEmoji) return;

  titleEl.textContent = profile?.contestTitle || DEFAULT_CONTEST_TITLE;
  hintEl.textContent = profile?.contestHint || DEFAULT_CONTEST_HINT;
  buttonEl.textContent = profile?.contestButtonLabel || DEFAULT_CONTEST_BUTTON;
  resultEl.textContent = '';
  resultEl.className = 'contest-result';
  flowerWrap.classList.add('hidden');
  inputEl.value = '';

  const check = () => {
    const code = inputEl.value.trim().toUpperCase();
    const items = normalizeContestCodes(profile?.contestCodes);
    const hit = items.find((x) => x.code.toUpperCase() === code);
    if (hit) {
      resultEl.textContent = (profile?.contestWinText || DEFAULT_CONTEST_WIN) + ' ' + (hit.flower ? 'Твой цветок: ' + hit.flower + '.' : '');
      resultEl.className = 'contest-result win';
      flowerEmoji.textContent = detectFlowerEmoji(hit.flower);
      flowerWrap.classList.remove('hidden');
      return;
    }
    resultEl.textContent = profile?.contestLoseText || DEFAULT_CONTEST_LOSE;
    resultEl.className = 'contest-result lose';
    flowerWrap.classList.add('hidden');
  };

  buttonEl.onclick = check;
  inputEl.onkeydown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      check();
    }
  };
}

function detectFlowerEmoji(name) {
  const n = String(name || '').toLowerCase();
  if (n.includes('роза') || n.includes('rose')) return '\u{1F339}';
  if (n.includes('пион') || n.includes('peony')) return '\u{1F338}';
  if (n.includes('тюльпан') || n.includes('tulip')) return '\u{1F337}';
  if (n.includes('лилия') || n.includes('lily')) return '\u{1F33A}';
  if (n.includes('ромаш') || n.includes('daisy')) return '\u{1F33C}';
  return '\u{1F338}';
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
  el.classList.add('chunk-glow-scope');
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
  const flowers = [
    '\u{2744}',  // snowflake
    '\u{273F}',  // floral heart
    '\u{2740}',  // white florette
    '\u{2726}',  // black four pointed star
    '\u{2727}',  // white four pointed star
    '\u{273D}',  // heavy teardrop-spoked asterisk
    '\u{2728}',  // sparkles
    '\u{273C}'   // open center teardrop-spoked asterisk
  ];
  const cs = getComputedStyle(document.documentElement);
  const palette = [
    cs.getPropertyValue('--accent').trim(),
    cs.getPropertyValue('--accent-light').trim(),
    cs.getPropertyValue('--gold').trim(),
    cs.getPropertyValue('--gold-light').trim()
  ].filter(Boolean);
  container.innerHTML = '';
  for (let i = 0; i < 20; i++) {
    const el = document.createElement('div');
    el.classList.add('flower');
    el.textContent = flowers[Math.floor(Math.random() * flowers.length)];
    el.style.left = Math.random() * 100 + '%';
    el.style.fontSize = Math.random() * 1.2 + 0.8 + 'rem';
    el.style.animationDuration = Math.random() * 6 + 10 + 's';
    el.style.animationDelay = '-' + (Math.random() * 10).toFixed(2) + 's';
    el.style.color = palette[Math.floor(Math.random() * palette.length)] || 'rgba(255,255,255,.75)';
    el.style.textShadow = '0 0 12px color-mix(in srgb, var(--accent-glow) 50%, transparent)';
    container.appendChild(el);
  }
}

function setAppReady(ready) {
  document.body.classList.toggle('app-ready', !!ready);
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
  initAdminTabs();
  bindAdminEvents();
  fillGlobalForm();
  refreshList();
  activateAdminTab('profile');
  if (!state.selectedKey) {
    const first = Object.keys(state.db.profiles)[0];
    if (first) selectProfile(first);
  }
}

function bindAdminEvents() {
  const form = document.getElementById('profileForm');
  const globalForm = document.getElementById('globalForm');
  const uploadBtn = document.getElementById('uploadMediaBtn');
  const mediaInput = document.getElementById('mediaFileInput');
  const mediaTarget = document.getElementById('mediaTarget');
  const uploadMsg = document.getElementById('uploadMsg');
  if (form.dataset.bound === '1') return;
  form.dataset.bound = '1';

  const searchInput = document.getElementById('profileSearchInput');
  if (searchInput && searchInput.dataset.bound !== '1') {
    searchInput.dataset.bound = '1';
    searchInput.addEventListener('input', () => refreshList());
  }

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
    if (searchInput) searchInput.value = '';
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
      believesPredictions: document.getElementById('believesPredictionsInput').value === 'believe',
      predictionButtonLabel: document.getElementById('predictionButtonInput').value.trim() || DEFAULT_PREDICTION_BUTTON,
      skepticAnswersMessage: document.getElementById('skepticAnswersMessageInput').value.trim() || DEFAULT_SKEPTIC_ANSWERS_MESSAGE,
      surveyAnswers: normalizeLines(document.getElementById('surveyAnswersInput').value),
      predictionsBelieve: normalizeLines(document.getElementById('predictionsBelieveInput').value),
      predictionsSkeptic: normalizeLines(document.getElementById('predictionsSkepticInput').value),
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

  if (globalForm && globalForm.dataset.bound !== '1') {
    globalForm.dataset.bound = '1';
    globalForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const next = normalizeGlobalSettings({
        answersButtonLabel: DEFAULT_ANSWERS_BUTTON,
        creditsLines: normalizeLines(document.getElementById('creditsInput').value),
        contestTitle: document.getElementById('contestTitleInput').value.trim() || DEFAULT_CONTEST_TITLE,
        contestHint: document.getElementById('contestHintInput').value.trim() || DEFAULT_CONTEST_HINT,
        contestButtonLabel: document.getElementById('contestButtonInput').value.trim() || DEFAULT_CONTEST_BUTTON,
        contestWinText: document.getElementById('contestWinTextInput').value.trim() || DEFAULT_CONTEST_WIN,
        contestLoseText: document.getElementById('contestLoseTextInput').value.trim() || DEFAULT_CONTEST_LOSE,
        contestCodes: normalizeContestCodes(document.getElementById('contestCodesInput').value)
      });
      await upsertGlobalSettings(next);
      fillGlobalForm();
      const msg = document.getElementById('globalSavedMsg');
      msg.textContent = 'Общие сохранены';
      setTimeout(() => {
        if (msg.textContent === 'Общие сохранены') msg.textContent = '';
      }, 1800);
    });
  }
}

function refreshList() {
  const list = document.getElementById('profileList');
  const searchInput = document.getElementById('profileSearchInput');
  const countBadge = document.getElementById('profileCountBadge');
  const query = String(searchInput?.value || '').trim().toLowerCase();
  list.innerHTML = '';
  const entries = Object.values(state.db.profiles).sort((a, b) => (a.name || '').localeCompare(b.name || '', 'ru'));
  const filtered = query
    ? entries.filter((profile) => {
      const name = String(profile.name || '').toLowerCase();
      const key = String(profile.id || '').toLowerCase();
      return name.includes(query) || key.includes(query);
    })
    : entries;

  if (countBadge) countBadge.textContent = String(filtered.length);

  filtered.forEach((profile) => {
    const item = document.createElement('article');
    item.className = 'admin-item' + (state.selectedKey === profile.id ? ' active' : '');
    item.dataset.name = String(profile.name || '');
    item.dataset.key = String(profile.id || '');
    item.onclick = () => selectProfile(profile.id);
    item.innerHTML = [
      '<div class="mp-profile-avatar">' + escapeHtml(makeInitials(profile.name || 'Героиня')) + '</div>',
      '<div class="mp-profile-meta">',
      '<p class="admin-item-name">' + escapeHtml(profile.name || 'Без имени') + '</p>',
      '<p class="admin-item-key">' + escapeHtml(profile.id || '') + '</p>',
      '</div>',
      '<span class="mp-profile-status" aria-hidden="true"></span>'
    ].join('');
    list.appendChild(item);
  });

  if (!filtered.length) {
    list.innerHTML = '<p class="admin-hint">Ничего не найдено.</p>';
  }
}

function selectProfile(key) {
  const p = state.db.profiles[key];
  if (!p) return;
  state.selectedKey = key;
  refreshList();
  const adminCurrentName = document.getElementById('adminCurrentName');
  if (adminCurrentName) adminCurrentName.textContent = p.name || 'Героиня';
  document.getElementById('nameInput').value = p.name || '';
  document.getElementById('themeInput').value = p.theme || 'warm';
  document.getElementById('videoInput').value = p.videoSrc || '';
  document.getElementById('posterInput').value = p.posterSrc || '';
  document.getElementById('photosInput').value = normalizeLines(p.photos).join('\n');
  document.getElementById('buttonInput').value = p.buttonLabel || 'Узнать правду о себе';
  document.getElementById('complimentsInput').value = normalizeLines(p.compliments).join('\n');
  document.getElementById('believesPredictionsInput').value = p.believesPredictions ? 'believe' : 'skeptic';
  document.getElementById('predictionButtonInput').value = p.predictionButtonLabel || DEFAULT_PREDICTION_BUTTON;
  document.getElementById('skepticAnswersMessageInput').value = p.skepticAnswersMessage || DEFAULT_SKEPTIC_ANSWERS_MESSAGE;
  document.getElementById('surveyAnswersInput').value = normalizeLines(p.surveyAnswers).join('\n');
  document.getElementById('predictionsBelieveInput').value = normalizeLines(p.predictionsBelieve).join('\n');
  document.getElementById('predictionsSkepticInput').value = normalizeLines(p.predictionsSkeptic).join('\n');
  document.getElementById('tipInput').value = p.mediaTip || 'From little girl to cover star';
  document.getElementById('quoteInput').value = p.quoteText || DEFAULT_PROFILE.quoteText;
  document.getElementById('profileLink').textContent = currentProfileLink();
  renderAdminPreview(p);
  renderPhotoManager();
}

function initAdminTabs() {
  const buttons = Array.from(document.querySelectorAll('[data-admin-tab]'));
  if (!buttons.length) return;
  buttons.forEach((btn) => {
    if (btn.dataset.bound === '1') return;
    btn.dataset.bound = '1';
    btn.addEventListener('click', () => activateAdminTab(btn.dataset.adminTab || 'profile'));
  });
}

function activateAdminTab(tab) {
  const name = String(tab || 'profile');
  document.querySelectorAll('[data-admin-tab]').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.adminTab === name);
  });
  document.querySelectorAll('[data-admin-tab-panel]').forEach((panel) => {
    panel.classList.toggle('active', panel.dataset.adminTabPanel === name);
  });
}

function fillGlobalForm() {
  const g = normalizeGlobalSettings(state.globalSettings);
  state.globalSettings = g;
  const creditsInput = document.getElementById('creditsInput');
  const contestTitleInput = document.getElementById('contestTitleInput');
  const contestHintInput = document.getElementById('contestHintInput');
  const contestButtonInput = document.getElementById('contestButtonInput');
  const contestWinTextInput = document.getElementById('contestWinTextInput');
  const contestLoseTextInput = document.getElementById('contestLoseTextInput');
  const contestCodesInput = document.getElementById('contestCodesInput');
  if (!creditsInput || !contestTitleInput || !contestHintInput || !contestButtonInput || !contestWinTextInput || !contestLoseTextInput || !contestCodesInput) return;

  creditsInput.value = normalizeLines(g.creditsLines).join('\n');
  contestTitleInput.value = g.contestTitle || DEFAULT_CONTEST_TITLE;
  contestHintInput.value = g.contestHint || DEFAULT_CONTEST_HINT;
  contestButtonInput.value = g.contestButtonLabel || DEFAULT_CONTEST_BUTTON;
  contestWinTextInput.value = g.contestWinText || DEFAULT_CONTEST_WIN;
  contestLoseTextInput.value = g.contestLoseText || DEFAULT_CONTEST_LOSE;
  contestCodesInput.value = normalizeContestCodes(g.contestCodes).map((x) => x.code + (x.flower ? ' | ' + x.flower : '')).join('\n');
}

function renderAdminPreview(profile) {
  const wrap = document.getElementById('adminPreview');
  const g = normalizeGlobalSettings(state.globalSettings);
  wrap.innerHTML = '<div style="border:1px solid rgba(255,255,255,.14);border-radius:12px;padding:10px;"><p style="margin:0;font-weight:700;">Предпросмотр: ' + escapeHtml(profile.name || 'Героиня') + '</p><p style="margin:6px 0 0;color:var(--text-muted);font-size:12px;">Тема: ' + escapeHtml(profile.theme || 'warm') + '</p><p style="margin:6px 0 0;color:var(--text-muted);font-size:12px;">Фото: ' + normalizeLines(profile.photos).length + '</p><p style="margin:6px 0 0;color:var(--text-muted);font-size:12px;">Комплименты: ' + normalizeLines(profile.compliments).length + '</p><p style="margin:6px 0 0;color:var(--text-muted);font-size:12px;">Предсказания: ' + (profile.believesPredictions ? 'верит' : 'не верит') + ' / ' + normalizeLines(profile.predictionsBelieve).length + ' / ' + normalizeLines(profile.predictionsSkeptic).length + '</p><p style="margin:6px 0 0;color:var(--text-muted);font-size:12px;">Ответы опроса: ' + normalizeLines(profile.surveyAnswers).length + '</p><p style="margin:6px 0 0;color:var(--text-muted);font-size:12px;">Глобальные титры: ' + normalizeLines(g.creditsLines).length + '</p><p style="margin:6px 0 0;color:var(--text-muted);font-size:12px;">Глобальные коды конкурса: ' + normalizeContestCodes(g.contestCodes).length + '</p><p style="margin:6px 0 0;color:var(--text-muted);font-size:12px;">Backend: ' + state.backendMode + '</p></div>';
}

function makeInitials(name) {
  const parts = String(name || '').trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return '??';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
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

function normalizeContestCodes(value) {
  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (item && typeof item === 'object') {
          return {
            code: String(item.code || '').trim().toUpperCase(),
            flower: String(item.flower || '').trim()
          };
        }
        const raw = String(item || '').trim();
        if (!raw) return null;
        const [codePart, flowerPart] = raw.split('|');
        return { code: String(codePart || '').trim().toUpperCase(), flower: String(flowerPart || '').trim() };
      })
      .filter((x) => x && x.code);
  }

  return String(value || '')
    .split(/\r?\n/g)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [codePart, flowerPart] = line.split('|');
      return {
        code: String(codePart || '').trim().toUpperCase(),
        flower: String(flowerPart || '').trim()
      };
    })
    .filter((x) => x.code);
}

function parseSurveyQa(value) {
  const lines = Array.isArray(value)
    ? value.map((x) => String(x || '')).join('\n').split(/\r?\n/g)
    : String(value || '').split(/\r?\n/g);

  const rows = [];
  let q = '';
  let a = [];

  const flush = () => {
    if (!q) return;
    rows.push({ q: q.trim(), a: a.join(' ').replace(/\s+/g, ' ').trim() || '—' });
    q = '';
    a = [];
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;
    if (/^\d+\.\s+/.test(line)) {
      flush();
      q = line.replace(/^\d+\.\s+/, '').trim();
    } else if (q) {
      a.push(line);
    } else {
      a.push(line);
    }
  }
  flush();

  if (!rows.length) {
    const single = normalizeLines(lines);
    return single.map((x, i) => ({ q: 'Вопрос ' + (i + 1), a: x }));
  }
  return rows;
}

function renderSurveyTable(rows) {
  const head = '<table><thead><tr><th>Вопрос</th><th>Ответ</th></tr></thead><tbody>';
  const body = rows.map((r) => '<tr><td>' + escapeHtml(r.q) + '</td><td>' + escapeHtml(r.a) + '</td></tr>').join('');
  return head + body + '</tbody></table>';
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

