-- ============================================================
-- Athar Heritage Platform — Supabase Schema (pgvector + RAG)
-- Run this in the Supabase SQL Editor
-- ============================================================

-- Enable pgvector extension
create extension if not exists vector;

-- Heritage sites table (mirrors mock data structure)
create table if not exists heritage_sites (
  id text primary key,
  name_ar text not null,
  name_en text not null,
  type text not null check (type in ('religious', 'archaeological', 'cultural', 'museum')),
  city text not null check (city in ('makkah', 'madinah')),
  lat double precision not null,
  lng double precision not null,
  brief_ar text,
  brief_en text,
  full_ar text,
  full_en text,
  images text[] default '{}',
  hours text,
  hours_ar text,
  accessibility text,
  accessibility_ar text,
  created_at timestamptz default now()
);

-- Heritage embeddings for RAG
create table if not exists heritage_embeddings (
  id bigint generated always as identity primary key,
  site_id text references heritage_sites(id),
  content text not null,
  content_ar text,
  language text not null check (language in ('en', 'ar')),
  chunk_type text not null check (chunk_type in ('brief', 'full', 'visitor_info', 'historical_context')),
  embedding vector(768) not null,
  metadata jsonb default '{}',
  created_at timestamptz default now()
);

-- Index for fast similarity search
create index on heritage_embeddings using ivfflat (embedding vector_cosine_ops) with (lists = 20);

-- RLS policies
alter table heritage_sites enable row level security;
alter table heritage_embeddings enable row level security;

-- Read access for everyone
create policy "Public read access on heritage_sites" on heritage_sites for select using (true);
create policy "Public read access on heritage_embeddings" on heritage_embeddings for select using (true);

-- Insert/update policies for ingestion script (uses anon key)
-- NOTE: In production, remove these policies and use the service role key instead.
create policy "Allow insert on heritage_sites" on heritage_sites for insert with check (true);
create policy "Allow update on heritage_sites" on heritage_sites for update using (true) with check (true);
create policy "Allow delete on heritage_embeddings" on heritage_embeddings for delete using (true);
create policy "Allow insert on heritage_embeddings" on heritage_embeddings for insert with check (true);

-- Function for similarity search
create or replace function match_heritage_embeddings(
  query_embedding vector(768),
  match_threshold float default 0.7,
  match_count int default 5
)
returns table (
  id bigint,
  site_id text,
  content text,
  content_ar text,
  language text,
  chunk_type text,
  similarity float
)
language sql stable
as $$
  select
    e.id,
    e.site_id,
    e.content,
    e.content_ar,
    e.language,
    e.chunk_type,
    1 - (e.embedding <=> query_embedding) as similarity
  from heritage_embeddings e
  where 1 - (e.embedding <=> query_embedding) > match_threshold
  order by e.embedding <=> query_embedding
  limit match_count;
$$;
