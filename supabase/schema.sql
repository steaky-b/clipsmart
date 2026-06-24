-- ClipSmart dashboard cloud storage
-- Run once in Supabase: SQL Editor → New query → paste → Run

create table if not exists public.clipsmart_portal (
  id text primary key default 'main',
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.clipsmart_portal enable row level security;

drop policy if exists "clipsmart_portal_select" on public.clipsmart_portal;
drop policy if exists "clipsmart_portal_insert" on public.clipsmart_portal;
drop policy if exists "clipsmart_portal_update" on public.clipsmart_portal;

create policy "clipsmart_portal_select"
  on public.clipsmart_portal for select
  using (true);

create policy "clipsmart_portal_insert"
  on public.clipsmart_portal for insert
  with check (true);

create policy "clipsmart_portal_update"
  on public.clipsmart_portal for update
  using (true);

-- Realtime: enable in Dashboard → Database → Replication → clipsmart_portal
-- Or run (if publication exists):
-- alter publication supabase_realtime add table public.clipsmart_portal;

insert into public.clipsmart_portal (id, data)
values ('main', '{}'::jsonb)
on conflict (id) do nothing;
