-- THE TARUN / portfolio platform schema
-- Run in the Supabase SQL editor for the project used by the portfolio.

create extension if not exists pgcrypto;

create table if not exists public.contact_queries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  type text not null check (type in ('question', 'collaboration', 'project', 'other')),
  message text not null,
  status text not null default 'new' check (status in ('new', 'reviewing', 'replied', 'archived')),
  source text not null default 'portfolio',
  created_at timestamptz not null default now()
);

create table if not exists public.work_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  title text not null,
  category text not null,
  description text not null,
  why_share text not null,
  project_url text,
  github_url text,
  cover_path text,
  status text not null default 'pending' check (status in ('pending', 'reviewing', 'approved', 'rejected', 'archived')),
  source text not null default 'portfolio',
  reviewed_at timestamptz,
  admin_note text,
  created_at timestamptz not null default now()
);

create table if not exists public.station_updates (
  id uuid primary key default gen_random_uuid(),
  type text not null,
  title text not null,
  summary text not null,
  project_slug text,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists contact_queries_created_at_idx
  on public.contact_queries (created_at desc);

create index if not exists work_submissions_created_at_idx
  on public.work_submissions (created_at desc);

create index if not exists work_submissions_status_idx
  on public.work_submissions (status, created_at desc);

create index if not exists station_updates_status_idx
  on public.station_updates (status, published_at desc);

-- Public clients should not read or write these tables directly.
-- Server routes use the service role key. Keep it server-only.
alter table public.contact_queries enable row level security;
alter table public.work_submissions enable row level security;
alter table public.station_updates enable row level security;

-- No anon/authenticated policies are intentionally created here.
-- Admin/auth policies should be added only when the private control desk is implemented.
