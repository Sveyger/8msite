create table if not exists public.march8_profiles (
  access_key text primary key,
  name text not null,
  theme text not null default 'warm',
  video_src text not null default '',
  poster_src text not null default '',
  photos jsonb not null default '[]'::jsonb,
  compliments jsonb not null default '[]'::jsonb,
  button_label text not null default 'Узнать правду о себе',
  media_tip text not null default 'From little girl to cover star',
  quote_text text not null default '«Даже в детстве было понятно, что растет <mark>звезда обложки</mark>!»',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.march8_profiles enable row level security;

-- Demo mode policies for frontend-only app (anon key in browser).
-- This is convenient, but not fully secure against enumeration.
create policy "march8_profiles_select" on public.march8_profiles
for select
to anon
using (true);

create policy "march8_profiles_insert" on public.march8_profiles
for insert
to anon
with check (true);

create policy "march8_profiles_update" on public.march8_profiles
for update
to anon
using (true)
with check (true);

create policy "march8_profiles_delete" on public.march8_profiles
for delete
to anon
using (true);

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
to anon
with check (bucket_id = 'media');

drop policy if exists "media_anon_update" on storage.objects;
create policy "media_anon_update"
on storage.objects
for update
to anon
using (bucket_id = 'media')
with check (bucket_id = 'media');

drop policy if exists "media_anon_delete" on storage.objects;
create policy "media_anon_delete"
on storage.objects
for delete
to anon
using (bucket_id = 'media');
