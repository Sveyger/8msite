create table if not exists public.march8_profiles (
  access_key text primary key,
  name text not null,
  theme text not null default 'warm',
  video_src text not null default '',
  poster_src text not null default '',
  photos jsonb not null default '[]'::jsonb,
  compliments jsonb not null default '[]'::jsonb,
  believes_predictions boolean not null default true,
  prediction_button_label text not null default 'Узнать предсказание',
  skeptic_answers_message text not null default 'Вы не верите в предсказания :)',
  survey_answers jsonb not null default '[]'::jsonb,
  predictions_believe jsonb not null default '[]'::jsonb,
  section_visibility jsonb not null default '{}'::jsonb,
  button_label text not null default 'Узнать правду о себе',
  media_tip text not null default 'From little girl to cover star',
  quote_text text not null default '«Даже в детстве было понятно, что растет <mark>звезда обложки</mark>!»',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.march8_profiles add column if not exists believes_predictions boolean not null default true;
alter table public.march8_profiles add column if not exists prediction_button_label text not null default 'Узнать предсказание';
alter table public.march8_profiles add column if not exists skeptic_answers_message text not null default 'Вы не верите в предсказания :)';
alter table public.march8_profiles add column if not exists survey_answers jsonb not null default '[]'::jsonb;
alter table public.march8_profiles add column if not exists predictions_believe jsonb not null default '[]'::jsonb;
alter table public.march8_profiles add column if not exists section_visibility jsonb not null default '{}'::jsonb;
alter table public.march8_profiles drop column if exists predictions_skeptic;

create table if not exists public.march8_global_settings (
  id text primary key default 'global',
  answers_button_label text not null default 'Посмотреть мои ответы',
  credits_lines jsonb not null default '[]'::jsonb,
  team_members jsonb not null default '[]'::jsonb,
  haptics_enabled boolean not null default true,
  girl_route_password text not null default '',
  team_photo_crop boolean not null default false,
  contest_title text not null default 'Победа в конкурсе',
  contest_hint text not null default 'Вы заняли призовое место в этапе с кроссвордом.',
  contest_button_label text not null default 'Проверить код',
  contest_win_text text not null default 'Поздравляем! Код подтвержден.',
  contest_lose_text text not null default 'Код не найден. Проверьте ввод.',
  contest_codes jsonb not null default '[]'::jsonb,
  contest_winners jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.march8_survey_invites (
  access_code text primary key,
  display_name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.march8_survey_responses (
  access_code text primary key references public.march8_survey_invites(access_code) on delete cascade,
  invite_name text not null default '',
  payload jsonb not null default '{}'::jsonb,
  photo_urls jsonb not null default '[]'::jsonb,
  is_submitted boolean not null default false,
  started_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  submitted_at timestamptz
);

create table if not exists public.admin_users (
  user_id uuid primary key,
  created_at timestamptz not null default now()
);

alter table public.march8_global_settings add column if not exists team_members jsonb not null default '[]'::jsonb;
alter table public.march8_global_settings add column if not exists haptics_enabled boolean not null default true;
alter table public.march8_global_settings add column if not exists girl_route_password text not null default '';
alter table public.march8_global_settings add column if not exists team_photo_crop boolean not null default false;
alter table public.march8_global_settings add column if not exists contest_winners jsonb not null default '[]'::jsonb;
alter table public.march8_survey_invites add column if not exists display_name text not null default '';
alter table public.march8_survey_responses add column if not exists invite_name text not null default '';
alter table public.march8_survey_responses add column if not exists payload jsonb not null default '{}'::jsonb;
alter table public.march8_survey_responses add column if not exists photo_urls jsonb not null default '[]'::jsonb;
alter table public.march8_survey_responses add column if not exists is_submitted boolean not null default false;
alter table public.march8_survey_responses add column if not exists started_at timestamptz not null default now();
alter table public.march8_survey_responses add column if not exists updated_at timestamptz not null default now();
alter table public.march8_survey_responses add column if not exists submitted_at timestamptz;

insert into public.march8_global_settings (id)
values ('global')
on conflict (id) do nothing;

insert into public.march8_survey_invites (access_code, display_name)
values
  ('DAR27', 'Аргачева Дарья'),
  ('KAR14', 'Долгополова Карина'),
  ('ADE05', 'Жукова Аделия'),
  ('KSE96', 'Казанцева Ксения'),
  ('VLA18', 'Лемешонок Влада'),
  ('MAR82', 'Моисеенко Мария'),
  ('NOD41', 'Новикова Дарья'),
  ('NEL79', 'Нуреева Нелли'),
  ('ARI53', 'Правдина Арина'),
  ('ANT27', 'Пшеницына Антонина'),
  ('VAL64', 'Садовникова Валентина'),
  ('VIK91', 'Саломатина Виктория'),
  ('ANG58', 'Сергеева Анжелика'),
  ('ALE20', 'Смирнова Александра'),
  ('ANA16', 'Сонина Анастасия'),
  ('OLG43', 'Суслопарова Ольга'),
  ('TUD89', 'Тухватулина Дарья'),
  ('SHA15', 'Шеншина Анастасия'),
  ('SHV34', 'Шефер Виктория')
on conflict (access_code) do update
set display_name = excluded.display_name,
    updated_at = now();

insert into public.admin_users (user_id)
values ('03fee3db-d1f4-4c7f-9be7-6133a167ed3f')
on conflict (user_id) do nothing;

alter table public.march8_profiles enable row level security;
alter table public.march8_global_settings enable row level security;
alter table public.march8_survey_invites enable row level security;
alter table public.march8_survey_responses enable row level security;
alter table public.admin_users enable row level security;

create or replace function public.march8_survey_session(p_code text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_code text := upper(trim(coalesce(p_code, '')));
  v_invite public.march8_survey_invites%rowtype;
  v_response public.march8_survey_responses%rowtype;
begin
  select * into v_invite
  from public.march8_survey_invites
  where access_code = v_code;

  if not found then
    return jsonb_build_object('ok', false, 'reason', 'invalid_code');
  end if;

  select * into v_response
  from public.march8_survey_responses
  where access_code = v_code;

  return jsonb_build_object(
    'ok', true,
    'access_code', v_invite.access_code,
    'display_name', v_invite.display_name,
    'is_submitted', coalesce(v_response.is_submitted, false),
    'payload', coalesce(v_response.payload, '{}'::jsonb),
    'photo_urls', coalesce(v_response.photo_urls, '[]'::jsonb),
    'updated_at', v_response.updated_at,
    'submitted_at', v_response.submitted_at
  );
end;
$$;

create or replace function public.march8_save_survey_progress(
  p_code text,
  p_payload jsonb default '{}'::jsonb,
  p_photo_urls jsonb default '[]'::jsonb
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_code text := upper(trim(coalesce(p_code, '')));
  v_invite public.march8_survey_invites%rowtype;
  v_response public.march8_survey_responses%rowtype;
begin
  select * into v_invite
  from public.march8_survey_invites
  where access_code = v_code;

  if not found then
    return jsonb_build_object('ok', false, 'reason', 'invalid_code');
  end if;

  select * into v_response
  from public.march8_survey_responses
  where access_code = v_code;

  if found and v_response.is_submitted then
    return jsonb_build_object('ok', false, 'reason', 'already_submitted');
  end if;

  insert into public.march8_survey_responses (
    access_code,
    invite_name,
    payload,
    photo_urls,
    is_submitted,
    started_at,
    updated_at
  )
  values (
    v_code,
    v_invite.display_name,
    coalesce(p_payload, '{}'::jsonb),
    coalesce(p_photo_urls, '[]'::jsonb),
    false,
    coalesce(v_response.started_at, now()),
    now()
  )
  on conflict (access_code) do update
  set invite_name = excluded.invite_name,
      payload = excluded.payload,
      photo_urls = excluded.photo_urls,
      updated_at = now();

  return public.march8_survey_session(v_code);
end;
$$;

create or replace function public.march8_submit_survey_response(
  p_code text,
  p_payload jsonb default '{}'::jsonb,
  p_photo_urls jsonb default '[]'::jsonb
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_code text := upper(trim(coalesce(p_code, '')));
  v_invite public.march8_survey_invites%rowtype;
  v_response public.march8_survey_responses%rowtype;
begin
  select * into v_invite
  from public.march8_survey_invites
  where access_code = v_code;

  if not found then
    return jsonb_build_object('ok', false, 'reason', 'invalid_code');
  end if;

  select * into v_response
  from public.march8_survey_responses
  where access_code = v_code;

  if found and v_response.is_submitted then
    return jsonb_build_object('ok', false, 'reason', 'already_submitted');
  end if;

  insert into public.march8_survey_responses (
    access_code,
    invite_name,
    payload,
    photo_urls,
    is_submitted,
    started_at,
    updated_at,
    submitted_at
  )
  values (
    v_code,
    v_invite.display_name,
    coalesce(p_payload, '{}'::jsonb),
    coalesce(p_photo_urls, '[]'::jsonb),
    true,
    coalesce(v_response.started_at, now()),
    now(),
    now()
  )
  on conflict (access_code) do update
  set invite_name = excluded.invite_name,
      payload = excluded.payload,
      photo_urls = excluded.photo_urls,
      is_submitted = true,
      updated_at = now(),
      submitted_at = coalesce(public.march8_survey_responses.submitted_at, now());

  return public.march8_survey_session(v_code);
end;
$$;

create or replace function public.march8_replace_survey_code(
  p_old_code text,
  p_new_code text
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_old_code text := upper(trim(coalesce(p_old_code, '')));
  v_new_code text := upper(trim(coalesce(p_new_code, '')));
  v_invite public.march8_survey_invites%rowtype;
  v_response public.march8_survey_responses%rowtype;
  v_has_response boolean := false;
begin
  if not exists (
    select 1 from public.admin_users au
    where au.user_id = auth.uid()
  ) then
    return jsonb_build_object('ok', false, 'reason', 'forbidden');
  end if;

  if v_old_code = '' or v_new_code = '' then
    return jsonb_build_object('ok', false, 'reason', 'empty_code');
  end if;

  if v_old_code = v_new_code then
    return jsonb_build_object('ok', false, 'reason', 'same_code');
  end if;

  select * into v_invite
  from public.march8_survey_invites
  where access_code = v_old_code;

  if not found then
    return jsonb_build_object('ok', false, 'reason', 'old_code_not_found');
  end if;

  if exists (
    select 1 from public.march8_survey_invites
    where access_code = v_new_code
  ) then
    return jsonb_build_object('ok', false, 'reason', 'new_code_exists');
  end if;

  select * into v_response
  from public.march8_survey_responses
  where access_code = v_old_code;
  v_has_response := found;

  insert into public.march8_survey_invites (access_code, display_name, created_at, updated_at)
  values (v_new_code, v_invite.display_name, v_invite.created_at, now());

  if v_has_response then
    insert into public.march8_survey_responses (
      access_code,
      invite_name,
      payload,
      photo_urls,
      is_submitted,
      started_at,
      updated_at,
      submitted_at
    )
    values (
      v_new_code,
      v_response.invite_name,
      v_response.payload,
      v_response.photo_urls,
      v_response.is_submitted,
      v_response.started_at,
      now(),
      v_response.submitted_at
    );

    delete from public.march8_survey_responses
    where access_code = v_old_code;
  end if;

  delete from public.march8_survey_invites
  where access_code = v_old_code;

  return jsonb_build_object(
    'ok', true,
    'old_code', v_old_code,
    'new_code', v_new_code
  );
end;
$$;

create or replace function public.march8_hard_reset_survey(
  p_code text
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_code text := upper(trim(coalesce(p_code, '')));
  v_invite public.march8_survey_invites%rowtype;
begin
  if not exists (
    select 1 from public.admin_users au
    where au.user_id = auth.uid()
  ) then
    return jsonb_build_object('ok', false, 'reason', 'forbidden');
  end if;

  if v_code = '' then
    return jsonb_build_object('ok', false, 'reason', 'empty_code');
  end if;

  select * into v_invite
  from public.march8_survey_invites
  where access_code = v_code;

  if not found then
    return jsonb_build_object('ok', false, 'reason', 'code_not_found');
  end if;

  delete from public.march8_survey_invites
  where access_code = v_code;

  insert into public.march8_survey_invites (
    access_code,
    display_name,
    created_at,
    updated_at
  )
  values (
    v_code,
    v_invite.display_name,
    now(),
    now()
  );

  return jsonb_build_object(
    'ok', true,
    'code', v_code
  );
end;
$$;

drop policy if exists "admin_users_self_select" on public.admin_users;
create policy "admin_users_self_select" on public.admin_users
for select
to authenticated
using (user_id = auth.uid());

-- Public read, whitelisted admin write.
drop policy if exists "march8_profiles_select" on public.march8_profiles;
create policy "march8_profiles_select" on public.march8_profiles
for select
to anon, authenticated
using (true);

drop policy if exists "march8_profiles_insert" on public.march8_profiles;
create policy "march8_profiles_insert" on public.march8_profiles
for insert
to authenticated
with check (exists (
  select 1 from public.admin_users au
  where au.user_id = auth.uid()
));

drop policy if exists "march8_profiles_update" on public.march8_profiles;
create policy "march8_profiles_update" on public.march8_profiles
for update
to authenticated
using (exists (
  select 1 from public.admin_users au
  where au.user_id = auth.uid()
))
with check (exists (
  select 1 from public.admin_users au
  where au.user_id = auth.uid()
));

drop policy if exists "march8_profiles_delete" on public.march8_profiles;
create policy "march8_profiles_delete" on public.march8_profiles
for delete
to authenticated
using (exists (
  select 1 from public.admin_users au
  where au.user_id = auth.uid()
));

drop policy if exists "march8_global_settings_select" on public.march8_global_settings;
create policy "march8_global_settings_select" on public.march8_global_settings
for select
to anon, authenticated
using (true);

drop policy if exists "march8_global_settings_insert" on public.march8_global_settings;
create policy "march8_global_settings_insert" on public.march8_global_settings
for insert
to authenticated
with check (exists (
  select 1 from public.admin_users au
  where au.user_id = auth.uid()
));

drop policy if exists "march8_global_settings_update" on public.march8_global_settings;
create policy "march8_global_settings_update" on public.march8_global_settings
for update
to authenticated
using (exists (
  select 1 from public.admin_users au
  where au.user_id = auth.uid()
))
with check (exists (
  select 1 from public.admin_users au
  where au.user_id = auth.uid()
));

drop policy if exists "march8_survey_invites_admin_select" on public.march8_survey_invites;
create policy "march8_survey_invites_admin_select" on public.march8_survey_invites
for select
to authenticated
using (exists (
  select 1 from public.admin_users au
  where au.user_id = auth.uid()
));

drop policy if exists "march8_survey_responses_admin_select" on public.march8_survey_responses;
create policy "march8_survey_responses_admin_select" on public.march8_survey_responses
for select
to authenticated
using (exists (
  select 1 from public.admin_users au
  where au.user_id = auth.uid()
));

drop policy if exists "march8_survey_responses_admin_delete" on public.march8_survey_responses;
create policy "march8_survey_responses_admin_delete" on public.march8_survey_responses
for delete
to authenticated
using (exists (
  select 1 from public.admin_users au
  where au.user_id = auth.uid()
));

-- Storage bucket and policies for media upload from frontend.
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do update set public = true;

drop policy if exists "media_public_read" on storage.objects;
create policy "media_public_read"
on storage.objects
for select
to public
using (bucket_id = 'media');

drop policy if exists "media_anon_insert" on storage.objects;
create policy "media_anon_insert"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'media'
  and exists (
    select 1 from public.admin_users au
    where au.user_id = auth.uid()
  )
);

drop policy if exists "media_anon_update" on storage.objects;
create policy "media_anon_update"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'media'
  and exists (
    select 1 from public.admin_users au
    where au.user_id = auth.uid()
  )
)
with check (
  bucket_id = 'media'
  and exists (
    select 1 from public.admin_users au
    where au.user_id = auth.uid()
  )
);

drop policy if exists "media_anon_delete" on storage.objects;
create policy "media_anon_delete"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'media'
  and exists (
    select 1 from public.admin_users au
    where au.user_id = auth.uid()
  )
);

drop policy if exists "media_survey_anon_insert" on storage.objects;
create policy "media_survey_anon_insert"
on storage.objects
for insert
to anon
with check (
  bucket_id = 'media'
  and name like 'survey/%'
);
