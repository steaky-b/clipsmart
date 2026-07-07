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
  created_at   timestamptz default now()
);

-- If the table already exists, add the column (safe to run multiple times):
alter table public.profiles add column if not exists paypal_email text;

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
