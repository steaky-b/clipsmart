-- ═══════════════════════════════════════════════════════
--  ClipSmart — Supabase Schema
--  Run this entire file in your Supabase SQL Editor:
--  https://supabase.com/dashboard → your project → SQL Editor
-- ═══════════════════════════════════════════════════════

-- ───────────────────────────
--  PROFILES
--  Extended user info, linked to Supabase Auth (auth.users)
-- ───────────────────────────
create table if not exists public.profiles (
  id           uuid primary key references auth.users (id) on delete cascade,
  username     text unique not null,
  avatar_url   text,
  paypal_email text,
  role         text not null default 'creator',  -- creator | client | admin
  company_name text,
  created_at   timestamptz default now()
);

-- If the table already exists, add these columns (safe to run multiple times):
alter table public.profiles add column if not exists paypal_email  text;
alter table public.profiles add column if not exists role          text not null default 'creator';
alter table public.profiles add column if not exists company_name  text;

-- ───────────────────────────
--  APPLICATIONS
--  Creator applies to a campaign; ClipSmart team sets status
-- ───────────────────────────
create table if not exists public.applications (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users (id) on delete cascade,
  campaign_slug text not null,
  status        text not null default 'pending',  -- pending | accepted | denied
  applied_at    timestamptz default now(),
  unique (user_id, campaign_slug)
);

-- ───────────────────────────
--  SUBMISSIONS  (clips)
--  Creator submits a video for a campaign
-- ───────────────────────────
create table if not exists public.submissions (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users (id) on delete cascade,
  campaign_slug text not null,
  platform      text not null,   -- TikTok | Instagram | YouTube
  video_url     text not null,
  note          text,
  status        text not null default 'pending',  -- pending | accepted | denied
  views_count   bigint default 0,
  submitted_at  timestamptz default now()
);

-- ───────────────────────────
--  TRANSACTIONS  (earnings)
--  Created by ClipSmart team when a clip earns money
-- ───────────────────────────
create table if not exists public.transactions (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references auth.users (id) on delete cascade,
  campaign_slug  text not null,
  submission_id  uuid references public.submissions (id) on delete set null,
  amount_usd     numeric(10, 2) not null,
  views_counted  bigint default 0,
  status         text not null default 'pending',  -- pending | paid
  created_at     timestamptz default now()
);

-- ═══════════════════════════════════════════════════════
--  ROW-LEVEL SECURITY
-- ═══════════════════════════════════════════════════════
alter table public.profiles     enable row level security;
alter table public.applications enable row level security;
alter table public.submissions  enable row level security;
alter table public.transactions enable row level security;

-- profiles: each user can only see and edit their own row
create policy "profiles_select_own"  on public.profiles for select  using (auth.uid() = id);
create policy "profiles_insert_own"  on public.profiles for insert  with check (auth.uid() = id);
create policy "profiles_update_own"  on public.profiles for update  using (auth.uid() = id);

-- applications: users can view and insert their own applications
create policy "apps_select_own"  on public.applications for select  using (auth.uid() = user_id);
create policy "apps_insert_own"  on public.applications for insert  with check (auth.uid() = user_id);

-- submissions: users can view and insert their own submissions
create policy "subs_select_own"  on public.submissions for select  using (auth.uid() = user_id);
create policy "subs_insert_own"  on public.submissions for insert  with check (auth.uid() = user_id);

-- transactions: users can only READ their own (ClipSmart team writes these)
create policy "tx_select_own"    on public.transactions for select  using (auth.uid() = user_id);

-- ═══════════════════════════════════════════════════════
--  AUTO-CREATE PROFILE ON SIGN-UP
--  Falls back to the email prefix if no username was supplied
-- ═══════════════════════════════════════════════════════
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, username)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data->>'username',
      split_part(new.email, '@', 1)
    )
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

-- Drop existing trigger if it exists, then recreate
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute procedure public.handle_new_user();

-- ═══════════════════════════════════════════════════════
--  CAMPAIGNS  (admin-managed via Supabase Table Editor)
--  Benny edits rows here; the website reads them live.
-- ═══════════════════════════════════════════════════════
create table if not exists public.campaigns (
  id               uuid primary key default gen_random_uuid(),
  slug             text unique not null,
  name             text not null,
  client_user_id   uuid references auth.users (id) on delete set null,
  cat              text not null default 'clipping',
  cat_label        text not null default 'Clipping Campaign',
  subtitle         text,
  img              text,
  gradient         text default 'linear-gradient(135deg,#0d0d1a,#05050a)',
  client_rpm       numeric(6,3) default 1.00,
  budget_total     numeric(10,2) default 2500,
  views_guaranteed bigint default 2000000,
  base_views       bigint default 0,
  base_posts       int default 0,
  base_creators    int default 0,
  anchor_iso       text default to_char(now() at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
  platform_split   jsonb default '{"TikTok":60,"Instagram":30,"YouTube":10}',
  is_active        boolean default true,
  is_past          boolean default false,
  created_at       timestamptz default now()
);

-- Row-level security
alter table public.campaigns enable row level security;

-- Anyone (even anonymous) can read active campaigns
create policy "campaigns_read_active"
  on public.campaigns for select
  using (is_active = true or client_user_id = auth.uid());

-- The client linked to a campaign can see it even when inactive
create policy "campaigns_client_owns"
  on public.campaigns for select
  using (client_user_id = auth.uid());

-- Allow clients to read ALL submissions for their campaign (not just their own)
create policy "subs_client_reads_their_campaign"
  on public.submissions for select
  using (
    campaign_slug in (
      select slug from public.campaigns where client_user_id = auth.uid()
    )
  );

-- ═══════════════════════════════════════════════════════
--  ZULACHAT CAMPAIGN  (Jack's campaign)
--  Run this to insert the campaign.
--  After Jack's account is created, run the UPDATE below
--  to link client_user_id to his auth.users row.
-- ═══════════════════════════════════════════════════════
insert into public.campaigns (
  slug, name, cat, cat_label, subtitle,
  client_rpm, budget_total, views_guaranteed,
  base_views, base_posts, base_creators,
  anchor_iso, platform_split,
  gradient, is_active, is_past
) values (
  'zulachat',
  'Zulachat',
  'ugc',
  'UGC Campaign',
  'AI Chat Platform — UGC Push',
  1.00,
  3000.00,
  3000000,
  0,
  0,
  0,
  '2026-07-08T00:00:00Z',
  '{"TikTok":55,"Instagram":35,"YouTube":10}'::jsonb,
  'linear-gradient(135deg,#041525 0%,#0a3d7c 100%)',
  true,
  false
) on conflict (slug) do nothing;

-- ═══════════════════════════════════════════════════════
--  JACK'S ACCOUNT SETUP
--
--  Step 1 — Create Jack's account (you do this in Supabase):
--    Supabase Dashboard → Authentication → Users → "Invite user"
--    Email: (Jack's real email)
--    Jack will receive a magic-link invite to set his password.
--
--  Step 2 — After Jack has confirmed his account, run the SQL
--    below (replace the email with Jack's real email):
-- ═══════════════════════════════════════════════════════

-- Set Jack's profile role and company (run AFTER he's signed up):
-- update public.profiles
-- set role = 'client', company_name = 'Zulachat'
-- where id = (select id from auth.users where email = 'jack@zulachat.com');

-- Link Zulachat campaign to Jack's account:
-- update public.campaigns
-- set client_user_id = (select id from auth.users where email = 'jack@zulachat.com')
-- where slug = 'zulachat';
