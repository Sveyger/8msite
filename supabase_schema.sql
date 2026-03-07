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
  contest_title text not null default 'Конкурс цветов',
  contest_hint text not null default 'Введите код победителя, чтобы открыть свой приз.',
  contest_button_label text not null default 'Проверить код',
  contest_win_text text not null default 'Поздравляем! Код подтвержден.',
  contest_lose_text text not null default 'Код не найден. Проверьте ввод.',
  contest_codes jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.admin_users (
  user_id uuid primary key,
  created_at timestamptz not null default now()
);

alter table public.march8_global_settings add column if not exists team_members jsonb not null default '[]'::jsonb;
alter table public.march8_global_settings add column if not exists haptics_enabled boolean not null default true;

insert into public.march8_global_settings (id)
values ('global')
on conflict (id) do nothing;

insert into public.admin_users (user_id)
values ('03fee3db-d1f4-4c7f-9be7-6133a167ed3f')
on conflict (user_id) do nothing;

alter table public.march8_profiles enable row level security;
alter table public.march8_global_settings enable row level security;
alter table public.admin_users enable row level security;

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
