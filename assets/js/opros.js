(function () {
  const SUPABASE_URL = 'https://xpfaragwxgmstrkaizcv.supabase.co';
  const SUPABASE_ANON_KEY = 'sb_publishable_aJQbRNVHoJ_VmhAfx33m1Q_L_h3ujnY';
  const SUPABASE_BUCKET = 'media';
  const CACHE_PREFIX = 'march8_survey_progress_v1:';
  const DONE_PREFIX = 'march8_survey_done_v1:';
  const FIELD_IDS = {
    name: 'f_name',
    birthDate: 'f_age',
    grade: 'f_grade',
    exist: 'f_exist',
    about: 'f_about',
    signs: 'f_signs',
    gift: 'f_gift'
  };
  const STEP_FIELDS = {
    '1': 'f_name',
    '2': 'f_age',
    '3': 'f_grade',
    '4': 'f_exist',
    '5': 'f_about',
    '6': 'f_signs'
  };

  if (!window.supabase || !SUPABASE_URL || !SUPABASE_ANON_KEY) return;

  const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  const authBtn = document.getElementById('authBtn');
  const authKeyInput = document.getElementById('authKey');
  const authErr = document.getElementById('authErr');
  const infoInner = document.getElementById('infoInner');
  const rejectedText = document.querySelector('#rejectedScreen .rej-text');
  const rejectedSub = document.querySelector('#rejectedScreen .rej-sub');

  const app = {
    code: '',
    inviteName: '',
    photoUrls: [],
    stepState: makeEmptyStepState(),
    authBusy: false,
    submitBusy: false,
    saveTimer: null
  };

  const params = new URLSearchParams(location.search);
  const codeFromUrl = String(params.get('code') || '').trim().toUpperCase();
  if (codeFromUrl && authKeyInput) authKeyInput.value = codeFromUrl;

  bindAuth();
  bindSubmit();
  bindDraftPersistence();
  bindStepPersistence();
  patchPhotoHandlers();

  function makeEmptyStepState() {
    return { '1': false, '2': false, '3': false, '4': false, '5': false, '6': false, '7': false, '8': false };
  }

  function getCacheKey(code) {
    return CACHE_PREFIX + String(code || '').toUpperCase();
  }

  function getDoneKey(code) {
    return DONE_PREFIX + String(code || '').toUpperCase();
  }

  function readCache(code) {
    try {
      const raw = localStorage.getItem(getCacheKey(code));
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  function writeCache(draft) {
    if (!draft?.code) return;
    localStorage.setItem(getCacheKey(draft.code), JSON.stringify(draft));
    if (draft.completed) localStorage.setItem(getDoneKey(draft.code), '1');
  }

  function isCompletedLocally(code) {
    return localStorage.getItem(getDoneKey(code)) === '1';
  }

  function markCompletedLocally(code, draft) {
    localStorage.setItem(getDoneKey(code), '1');
    if (draft) writeCache({ ...draft, completed: true });
  }

  function buildDraft() {
    return {
      code: app.code,
      inviteName: app.inviteName,
      payload: {
        name: getFieldValue(FIELD_IDS.name),
        birthDate: getFieldValue(FIELD_IDS.birthDate),
        grade: getFieldValue(FIELD_IDS.grade),
        exist: getFieldValue(FIELD_IDS.exist),
        about: getFieldValue(FIELD_IDS.about),
        signs: getFieldValue(FIELD_IDS.signs),
        gift: getFieldValue(FIELD_IDS.gift),
        confirmChecked: !!document.getElementById('confirmCb')?.checked,
        stepState: { ...app.stepState }
      },
      photoUrls: [...app.photoUrls],
      completed: false,
      updatedAt: new Date().toISOString()
    };
  }

  function getFieldValue(id) {
    return String(document.getElementById(id)?.value || '').trim();
  }

  function pickLatestDraft(serverDraft, localDraft) {
    if (!serverDraft) return localDraft;
    if (!localDraft) return serverDraft;
    const serverTs = new Date(serverDraft.updatedAt || 0).getTime();
    const localTs = new Date(localDraft.updatedAt || 0).getTime();
    return localTs > serverTs ? localDraft : serverDraft;
  }

  function normalizeDraftFromSession(session) {
    if (!session?.ok) return null;
    return {
      code: session.access_code,
      inviteName: session.display_name,
      payload: session.payload && typeof session.payload === 'object' ? session.payload : {},
      photoUrls: Array.isArray(session.photo_urls) ? session.photo_urls.filter(Boolean) : [],
      completed: !!session.is_submitted,
      updatedAt: session.updated_at || session.submitted_at || ''
    };
  }

  function bindAuth() {
    if (!authBtn || !authKeyInput) return;
    authBtn.addEventListener('click', onAuthClick, true);
  }

  async function onAuthClick(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    if (app.authBusy) return;
    app.authBusy = true;

    const code = String(authKeyInput.value || '').trim().toUpperCase();
    hideAuthError();

    if (!code) {
      showAuthError('Введите ключ доступа.');
      app.authBusy = false;
      return;
    }

    authBtn.disabled = true;
    authKeyInput.disabled = true;

    try {
      const { data, error } = await client.rpc('march8_survey_session', { p_code: code });
      if (error) throw error;

      if (!data?.ok) {
        showAuthError('Неверный ключ.');
        authBtn.disabled = false;
        authKeyInput.disabled = false;
        app.authBusy = false;
        return;
      }

      const serverDraft = normalizeDraftFromSession(data);
      const localDraft = readCache(code);

      if (data.is_submitted || isCompletedLocally(code) || localDraft?.completed) {
        markCompletedLocally(code, serverDraft || localDraft || { code });
        showRejected('Доступ закрыт.', 'Вы уже заполняли эту анкету ранее.');
        app.authBusy = false;
        return;
      }

      app.code = code;
      app.inviteName = data.display_name || '';
      app.stepState = makeEmptyStepState();
      app.photoUrls = [];

      if (infoInner) {
        infoInner.textContent = 'Ключ подтвержден · ' + (app.inviteName || code);
        infoInner.parentElement?.classList.add('visible');
      }

      playAuthToFormTransition();

      const draft = pickLatestDraft(serverDraft, localDraft);
      setTimeout(() => {
        if (draft) restoreDraft(draft);
        else writeCache(buildDraft());
      }, 920);
    } catch (err) {
      console.error(err);
      showAuthError('Не удалось связаться с сервером опроса.');
      authBtn.disabled = false;
      authKeyInput.disabled = false;
    } finally {
      app.authBusy = false;
    }
  }

  function showAuthError(message) {
    if (!authErr) return;
    authErr.textContent = message;
    authErr.classList.add('show');
  }

  function hideAuthError() {
    if (!authErr) return;
    authErr.classList.remove('show');
    authErr.textContent = '';
  }

  function showRejected(title, subtitle) {
    if (rejectedText) rejectedText.textContent = title;
    if (rejectedSub) rejectedSub.textContent = subtitle;
    if (typeof showRejectedScreen === 'function') showRejectedScreen();
  }

  function restoreDraft(draft) {
    const payload = draft?.payload && typeof draft.payload === 'object' ? draft.payload : {};
    app.stepState = { ...makeEmptyStepState(), ...(payload.stepState || {}) };
    app.photoUrls = Array.isArray(draft.photoUrls) ? draft.photoUrls.filter(Boolean) : [];

    Object.entries(FIELD_IDS).forEach(([key, id]) => {
      const el = document.getElementById(id);
      if (el) el.value = payload[key] || '';
    });

    restorePhotoThumbs(app.photoUrls);
    refreshDerivedUi();
    applyStepStateToUi(payload.confirmChecked === true);
    updateProgress();
    writeCache(buildDraft());
  }

  function refreshDerivedUi() {
    [FIELD_IDS.exist, FIELD_IDS.about, FIELD_IDS.gift].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.dispatchEvent(new Event('input', { bubbles: true }));
    });
    const cb = document.getElementById('confirmCb');
    if (cb) cb.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function showStepImmediate(num) {
    const pad = String(num).padStart(2, '0');
    const fg = document.querySelector('.fg[data-num="' + pad + '"]');
    if (!fg) return;
    fg.style.display = 'block';
    fg.style.opacity = '1';
    fg.style.transform = 'none';
  }

  function showSubmitAreaImmediate() {
    const cbWrap = document.getElementById('cbWrap');
    const submitWrap = document.getElementById('submitWrap');
    const footer = document.getElementById('ftrEl');
    [cbWrap, submitWrap, footer].forEach((el, index) => {
      if (!el) return;
      el.style.display = index === 0 ? 'flex' : 'block';
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }

  function removeIfExists(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
  }

  function finalizeStepUi(stepNumber) {
    const stepKey = String(stepNumber);
    showStepImmediate(stepNumber);
    const fg = document.querySelector('.fg[data-num="' + stepKey.padStart(2, '0') + '"]');
    if (fg) fg.classList.add('field-done');

    if (STEP_FIELDS[stepKey]) {
      lockField(STEP_FIELDS[stepKey]);
      removeIfExists('btn_0' + stepNumber);
      return;
    }

    if (stepKey === '7') {
      removeIfExists('btn_07');
      removeIfExists('skip_07');
      const photoInput = document.getElementById('photoInput');
      const photoArea = document.getElementById('photoArea');
      if (photoInput) photoInput.disabled = true;
      if (photoArea) {
        photoArea.style.pointerEvents = 'none';
        photoArea.style.opacity = '.5';
      }
      return;
    }

    if (stepKey === '8') {
      lockField(FIELD_IDS.gift);
      removeIfExists('btn_08');
      removeIfExists('skip_08');
    }
  }

  function applyStepStateToUi(confirmed) {
    let nextStep = 1;
    while (nextStep <= 8 && app.stepState[String(nextStep)]) {
      finalizeStepUi(nextStep);
      nextStep += 1;
    }

    if (nextStep <= 8) {
      showStepImmediate(nextStep);
    } else {
      showSubmitAreaImmediate();
    }

    const cb = document.getElementById('confirmCb');
    const cbNote = document.getElementById('cbNote');
    if (cb && confirmed) {
      cb.checked = true;
      if (typeof cbLocked !== 'undefined') cbLocked = true;
      cb.style.cursor = 'not-allowed';
      if (cbNote) cbNote.textContent = 'Подтверждение получено и зафиксировано.';
      showSubmitAreaImmediate();
    }
  }

  function bindDraftPersistence() {
    Object.values(FIELD_IDS).forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('input', () => scheduleDraftSave());
      el.addEventListener('change', () => scheduleDraftSave());
    });
    document.getElementById('confirmCb')?.addEventListener('change', () => scheduleDraftSave());
  }

  function bindStepPersistence() {
    Object.entries(STEP_FIELDS).forEach(([step, fieldId]) => {
      const btn = document.getElementById('btn_0' + Number(step));
      if (!btn) return;
      btn.addEventListener('click', () => {
        setTimeout(() => {
          if (document.getElementById(fieldId)?.readOnly) {
            app.stepState[step] = true;
            scheduleDraftSave();
          }
        }, 320);
      });
    });

    document.getElementById('btn_07')?.addEventListener('click', () => {
      setTimeout(async () => {
        app.stepState['7'] = true;
        await flushSurveyPhotos();
        scheduleDraftSave();
      }, 320);
    });

    document.getElementById('skip_07')?.addEventListener('click', () => {
      setTimeout(() => {
        app.stepState['7'] = true;
        scheduleDraftSave();
      }, 320);
    });

    ['btn_08', 'skip_08'].forEach((id) => {
      document.getElementById(id)?.addEventListener('click', () => {
        setTimeout(() => {
          app.stepState['8'] = true;
          scheduleDraftSave();
        }, 320);
      });
    });
  }

  function patchPhotoHandlers() {
    if (typeof addPhotos === 'function') {
      const originalAddPhotos = addPhotos;
      addPhotos = function patchedAddPhotos(files) {
        originalAddPhotos(files);
        scheduleDraftSave();
      };
    }

    if (typeof removePhoto === 'function') {
      const originalRemovePhoto = removePhoto;
      removePhoto = function patchedRemovePhoto(id) {
        originalRemovePhoto(id);
        setTimeout(() => {
          syncPhotoUrlsFromUploadedFiles();
          scheduleDraftSave();
        }, 320);
      };
    }
  }

  function syncPhotoUrlsFromUploadedFiles() {
    if (!Array.isArray(uploadedFiles)) return;
    app.photoUrls = uploadedFiles
      .map((item) => item.uploadedUrl || (item.isRemote ? item.previewUrl : ''))
      .filter(Boolean);
  }

  function restorePhotoThumbs(urls) {
    if (!Array.isArray(urls) || !photoPreviews) return;
    cleanupAllPhotoPreviews();
    uploadedFiles = [];

    urls.forEach((url) => {
      const id = typeof makeFileId === 'function' ? makeFileId() : String(Date.now() + Math.random());
      const item = { id, file: null, previewUrl: url, uploadedUrl: url, thumbEl: null, isRemote: true };

      const thumb = document.createElement('div');
      thumb.className = 'photo-thumb loaded';
      thumb.dataset.id = id;

      const img = document.createElement('img');
      img.src = url;
      img.alt = '';
      img.loading = 'lazy';
      img.decoding = 'async';

      const del = document.createElement('div');
      del.className = 'photo-thumb-del';
      del.textContent = 'удалить';
      del.addEventListener('click', () => removePhoto(id));

      thumb.appendChild(img);
      thumb.appendChild(del);
      photoPreviews.appendChild(thumb);
      item.thumbEl = thumb;
      uploadedFiles.push(item);
    });

    if (typeof updatePhotoCount === 'function') updatePhotoCount();
  }

  function scheduleDraftSave() {
    if (!app.code || app.submitBusy) return;
    const draft = buildDraft();
    writeCache(draft);
    clearTimeout(app.saveTimer);
    app.saveTimer = setTimeout(() => {
      saveDraftRemote(draft).catch((err) => console.error(err));
    }, 700);
  }

  async function saveDraftRemote(draft) {
    if (!app.code || draft.completed) return;
    const { data, error } = await client.rpc('march8_save_survey_progress', {
      p_code: app.code,
      p_payload: draft.payload,
      p_photo_urls: draft.photoUrls
    });
    if (error) throw error;
    if (data?.reason === 'already_submitted') {
      markCompletedLocally(app.code, draft);
      showRejected('Доступ закрыт.', 'Анкета по этому коду уже отправлена.');
    }
  }

  async function flushSurveyPhotos() {
    if (!app.code || !Array.isArray(uploadedFiles) || !uploadedFiles.length) return app.photoUrls;
    const pending = uploadedFiles.filter((item) => item.file && !item.uploadedUrl);
    if (!pending.length) {
      syncPhotoUrlsFromUploadedFiles();
      return app.photoUrls;
    }

    for (const [index, item] of pending.entries()) {
      const ext = (item.file.name.split('.').pop() || 'jpg').toLowerCase();
      const safeBase = item.file.name.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 36) || 'photo';
      const path = 'survey/' + app.code + '/' + Date.now() + '-' + index + '-' + safeBase + '.' + ext;

      const { error } = await client.storage.from(SUPABASE_BUCKET).upload(path, item.file, {
        upsert: false,
        cacheControl: '3600',
        contentType: item.file.type || undefined
      });
      if (error) throw error;

      const { data } = client.storage.from(SUPABASE_BUCKET).getPublicUrl(path);
      item.uploadedUrl = data.publicUrl;
      item.previewUrl = data.publicUrl;
      item.isRemote = true;
      if (item.thumbEl?.querySelector('img')) item.thumbEl.querySelector('img').src = data.publicUrl;
    }

    syncPhotoUrlsFromUploadedFiles();
    const draft = buildDraft();
    writeCache(draft);
    return app.photoUrls;
  }

  function bindSubmit() {
    const submitBtn = document.getElementById('sbtn');
    if (!submitBtn) return;
    submitBtn.addEventListener('click', onSubmitClick, true);
  }

  async function onSubmitClick(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    if (app.submitBusy || !app.code) return;

    const checkboxError = document.getElementById('e_cb');
    if (!document.getElementById('confirmCb')?.checked) {
      if (checkboxError) {
        checkboxError.textContent = 'Необходимо подтвердить данные.';
        checkboxError.classList.add('show');
      }
      return;
    }

    const required = ['f_name', 'f_age', 'f_grade', 'f_exist', 'f_about', 'f_signs'];
    const invalid = required.some((id) => !validateField(id));
    if (invalid) return;

    app.submitBusy = true;
    const submitBtn = document.getElementById('sbtn');
    const submitText = document.getElementById('sbtnText');
    if (submitBtn) submitBtn.disabled = true;
    if (submitText) submitText.textContent = 'Сохранение анкеты...';

    try {
      app.stepState['7'] = true;
      app.stepState['8'] = true;
      await flushSurveyPhotos();
      const draft = buildDraft();
      const { data, error } = await client.rpc('march8_submit_survey_response', {
        p_code: app.code,
        p_payload: draft.payload,
        p_photo_urls: draft.photoUrls
      });
      if (error) throw error;

      if (!data?.ok && data?.reason === 'already_submitted') {
        markCompletedLocally(app.code, { ...draft, completed: true });
        showRejected('Доступ закрыт.', 'Анкета по этому коду уже отправлена.');
        return;
      }
      if (!data?.ok) {
        throw new Error('submit_failed');
      }

      markCompletedLocally(app.code, { ...draft, completed: true });
      launchDateFlash();
    } catch (err) {
      console.error(err);
      if (checkboxError) {
        checkboxError.textContent = 'Не удалось отправить анкету. Попробуйте еще раз.';
        checkboxError.classList.add('show');
      }
      if (submitBtn) submitBtn.disabled = false;
      if (submitText) submitText.textContent = 'Отправить анкету';
    } finally {
      app.submitBusy = false;
    }
  }
})();
