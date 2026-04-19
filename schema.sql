-- ============================================================
-- Natural Girlies Magazine — Database Schema (PostgreSQL)
-- ============================================================
-- Designed for PostgreSQL 14+ (works on Supabase, Neon, Vercel Postgres, etc.)
-- Covers: content, taxonomy, people, community, newsletter, analytics.
--
-- If you use Sanity (or another headless CMS) for editorial content,
-- you can skip sections 2–5 and keep only: comments, comment_reports,
-- newsletter_subscribers, bookmarks, users, and search_events.
--
-- Run top to bottom. Idempotent where possible (IF NOT EXISTS).
-- ============================================================


-- ============================================================
-- 0. EXTENSIONS & HELPERS
-- ============================================================

create extension if not exists "uuid-ossp";
create extension if not exists "pg_trgm";      -- fuzzy search on titles
create extension if not exists "citext";       -- case-insensitive email

-- Reusable updated_at trigger function
create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;


-- ============================================================
-- 1. USERS (optional — only needed for auth, bookmarks, moderator roles)
-- ============================================================
-- On Supabase, use auth.users as the source of truth and reference it.
-- This "profiles" table holds the app-level fields linked by id.

create table if not exists profiles (
  id              uuid primary key default uuid_generate_v4(),
  email           citext unique not null,
  display_name    text,
  avatar_url      text,
  role            text not null default 'reader'
    check (role in ('reader', 'commenter_trusted', 'moderator', 'editor', 'admin')),
  bio             text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create trigger profiles_updated_at
before update on profiles
for each row execute function set_updated_at();


-- ============================================================
-- 2. TAXONOMY — categories, tags, signature sections
-- ============================================================

create table if not exists categories (
  id                uuid primary key default uuid_generate_v4(),
  slug              text unique not null,
  name              text not null,
  description       text not null,
  long_description  text,                 -- editorial intro copy (prevents thin pages)
  icon              text,
  color             text,                 -- hex e.g. #E8956A
  accent_color      text,
  sort_order        int not null default 0,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create trigger categories_updated_at
before update on categories
for each row execute function set_updated_at();


create table if not exists tags (
  id          uuid primary key default uuid_generate_v4(),
  slug        text unique not null,
  name        text not null,
  description text,
  created_at  timestamptz not null default now()
);


create table if not exists signature_sections (
  -- The "Crown Report," "What's In Your Cabinet," "The Girlies Speak," etc.
  id          uuid primary key default uuid_generate_v4(),
  slug        text unique not null,
  title       text not null,
  tagline     text,
  description text not null,
  icon        text,
  accent_color text,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create trigger signature_sections_updated_at
before update on signature_sections
for each row execute function set_updated_at();


-- ============================================================
-- 3. AUTHORS
-- ============================================================

create table if not exists authors (
  id             uuid primary key default uuid_generate_v4(),
  slug           text unique not null,
  name           text not null,
  role           text,                      -- "Editor-in-Chief", etc.
  bio            text not null,
  long_bio       text,                      -- full editorial about copy
  avatar_url     text,
  expertise      text[] default '{}',
  instagram      text,
  twitter        text,
  website        text,
  profile_id     uuid references profiles(id) on delete set null,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create trigger authors_updated_at
before update on authors
for each row execute function set_updated_at();


-- ============================================================
-- 4. EDITORIAL CONTENT — issues, stories, blog posts
-- ============================================================

-- Magazine issues (quarterly)
create table if not exists issues (
  id              uuid primary key default uuid_generate_v4(),
  slug            text unique not null,
  title           text not null,             -- "Spring 2026 | Volume 3"
  season          text,                      -- "Spring"
  year            int,
  volume          int,
  cover_image_url text,
  editors_note    text not null,             -- required — prevents thin issue pages
  summary         text,                      -- short editorial summary
  flipbook_url    text,                      -- iframe url for reader
  is_current      boolean not null default false,
  published_at    timestamptz,
  seo_title       text,
  seo_description text,
  og_image_url    text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create trigger issues_updated_at
before update on issues
for each row execute function set_updated_at();

create unique index if not exists issues_single_current
  on issues((1))
  where is_current;                          -- at most one current issue


-- Long-form stories / features
create table if not exists stories (
  id              uuid primary key default uuid_generate_v4(),
  slug            text unique not null,
  title           text not null,
  subtitle        text,
  excerpt         text not null,
  body            text not null,             -- markdown or rich text JSON
  cover_image_url text,
  cover_alt       text,
  author_id       uuid not null references authors(id) on delete restrict,
  category_id     uuid not null references categories(id) on delete restrict,
  signature_id    uuid references signature_sections(id) on delete set null,
  issue_id        uuid references issues(id) on delete set null,
  read_time_min   int not null default 5,
  is_featured     boolean not null default false,
  is_trending     boolean not null default false,
  status          text not null default 'draft'
    check (status in ('draft', 'in_review', 'published', 'archived')),
  published_at    timestamptz,
  seo_title       text,
  seo_description text,
  og_image_url    text,
  view_count      bigint not null default 0,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create trigger stories_updated_at
before update on stories
for each row execute function set_updated_at();


-- Blog posts (ongoing editorial, launches, BTS)
create table if not exists blog_posts (
  id              uuid primary key default uuid_generate_v4(),
  slug            text unique not null,
  title           text not null,
  excerpt         text not null,
  body            text not null,
  cover_image_url text,
  cover_alt       text,
  author_id       uuid not null references authors(id) on delete restrict,
  category_id     uuid references categories(id) on delete set null,
  is_featured     boolean not null default false,
  status          text not null default 'draft'
    check (status in ('draft', 'in_review', 'published', 'archived')),
  published_at    timestamptz,
  seo_title       text,
  seo_description text,
  og_image_url    text,
  view_count      bigint not null default 0,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create trigger blog_posts_updated_at
before update on blog_posts
for each row execute function set_updated_at();


-- ============================================================
-- 5. JUNCTION TABLES (many-to-many)
-- ============================================================

create table if not exists story_tags (
  story_id  uuid not null references stories(id) on delete cascade,
  tag_id    uuid not null references tags(id) on delete cascade,
  primary key (story_id, tag_id)
);

create table if not exists blog_post_tags (
  blog_post_id uuid not null references blog_posts(id) on delete cascade,
  tag_id       uuid not null references tags(id) on delete cascade,
  primary key (blog_post_id, tag_id)
);

create table if not exists issue_contributors (
  issue_id  uuid not null references issues(id) on delete cascade,
  author_id uuid not null references authors(id) on delete cascade,
  role      text,                        -- "Photography", "Writing", etc.
  sort_order int not null default 0,
  primary key (issue_id, author_id)
);

-- Featured stories in an issue (ordered)
create table if not exists issue_stories (
  issue_id   uuid not null references issues(id) on delete cascade,
  story_id   uuid not null references stories(id) on delete cascade,
  sort_order int not null default 0,
  is_cover_story boolean not null default false,
  primary key (issue_id, story_id)
);


-- ============================================================
-- 6. COMMENTS (moderation-first)
-- ============================================================

create table if not exists comments (
  id              uuid primary key default uuid_generate_v4(),
  -- Target: exactly one of story_id or blog_post_id must be set
  story_id        uuid references stories(id) on delete cascade,
  blog_post_id    uuid references blog_posts(id) on delete cascade,
  parent_id       uuid references comments(id) on delete cascade,   -- threaded replies
  author_name     text not null,
  author_email    citext,
  author_profile  uuid references profiles(id) on delete set null,
  body            text not null,
  ip_address      inet,
  user_agent      text,
  status          text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected', 'spam', 'deleted')),
  moderated_by    uuid references profiles(id) on delete set null,
  moderated_at    timestamptz,
  moderation_note text,
  like_count      int not null default 0,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),

  constraint comment_target_check check (
    (story_id is not null)::int + (blog_post_id is not null)::int = 1
  )
);

create trigger comments_updated_at
before update on comments
for each row execute function set_updated_at();


create table if not exists comment_reports (
  id           uuid primary key default uuid_generate_v4(),
  comment_id   uuid not null references comments(id) on delete cascade,
  reporter_ip  inet,
  reporter_id  uuid references profiles(id) on delete set null,
  reason       text not null
    check (reason in ('spam', 'harassment', 'off_topic', 'misinformation', 'other')),
  details      text,
  resolved     boolean not null default false,
  resolved_by  uuid references profiles(id) on delete set null,
  resolved_at  timestamptz,
  created_at   timestamptz not null default now()
);


-- ============================================================
-- 7. NEWSLETTER
-- ============================================================

create table if not exists newsletter_subscribers (
  id               uuid primary key default uuid_generate_v4(),
  email            citext unique not null,
  status           text not null default 'pending'
    check (status in ('pending', 'active', 'unsubscribed', 'bounced')),
  source           text,                     -- "homepage_cta", "popup", "article_footer", etc.
  confirmed_at     timestamptz,
  unsubscribed_at  timestamptz,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create trigger newsletter_subscribers_updated_at
before update on newsletter_subscribers
for each row execute function set_updated_at();


-- ============================================================
-- 8. READER FEATURES — bookmarks, saved searches
-- ============================================================

create table if not exists bookmarks (
  id            uuid primary key default uuid_generate_v4(),
  profile_id    uuid not null references profiles(id) on delete cascade,
  story_id      uuid references stories(id) on delete cascade,
  blog_post_id  uuid references blog_posts(id) on delete cascade,
  issue_id      uuid references issues(id) on delete cascade,
  created_at    timestamptz not null default now(),

  constraint bookmark_target_check check (
    (story_id is not null)::int
    + (blog_post_id is not null)::int
    + (issue_id is not null)::int = 1
  ),
  unique (profile_id, story_id, blog_post_id, issue_id)
);


-- ============================================================
-- 9. ANALYTICS (lightweight — use dedicated analytics for production)
-- ============================================================

create table if not exists search_events (
  id            uuid primary key default uuid_generate_v4(),
  query         text not null,
  result_count  int not null,
  profile_id    uuid references profiles(id) on delete set null,
  created_at    timestamptz not null default now()
);

create table if not exists article_reads (
  id            uuid primary key default uuid_generate_v4(),
  story_id      uuid references stories(id) on delete cascade,
  blog_post_id  uuid references blog_posts(id) on delete cascade,
  profile_id    uuid references profiles(id) on delete set null,
  percentage    int not null check (percentage between 0 and 100),
  created_at    timestamptz not null default now()
);


-- ============================================================
-- 10. INDEXES
-- ============================================================

-- Published content lookups
create index if not exists stories_status_published_idx
  on stories (status, published_at desc) where status = 'published';
create index if not exists stories_category_idx on stories (category_id);
create index if not exists stories_author_idx on stories (author_id);
create index if not exists stories_featured_idx on stories (is_featured) where is_featured;
create index if not exists stories_trending_idx on stories (is_trending) where is_trending;

create index if not exists blog_posts_status_published_idx
  on blog_posts (status, published_at desc) where status = 'published';
create index if not exists blog_posts_category_idx on blog_posts (category_id);
create index if not exists blog_posts_author_idx on blog_posts (author_id);

create index if not exists issues_published_idx on issues (published_at desc);

-- Fuzzy search on titles
create index if not exists stories_title_trgm_idx
  on stories using gin (title gin_trgm_ops);
create index if not exists blog_posts_title_trgm_idx
  on blog_posts using gin (title gin_trgm_ops);

-- Comments
create index if not exists comments_story_idx
  on comments (story_id, created_at desc) where story_id is not null;
create index if not exists comments_blog_idx
  on comments (blog_post_id, created_at desc) where blog_post_id is not null;
create index if not exists comments_status_idx on comments (status);
create index if not exists comments_parent_idx on comments (parent_id) where parent_id is not null;


-- ============================================================
-- 11. SEED DATA — content pillars & signature sections
-- ============================================================

insert into categories (slug, name, description, long_description, icon, color, accent_color, sort_order)
values
  ('crown',   'Crown',
    'Hair wellness, protective styles, scalp health, and ingredient deep dives.',
    'The Crown pillar is the main character of Natural Girlies Magazine. Here we explore hair as wellness, as culture, as science, and as self-expression. From protective styles and scalp health to the ingredients that actually belong in your routine, this is where we do the deep work of understanding your crown.',
    '👑', '#E8956A', '#FBCBA0', 1),
  ('skin',    'Skin',
    'Melanin science, hyperpigmentation, hormones, and product breakdowns.',
    'Skin is the pillar where we get smart about what your face is actually asking for. Melanin science, hyperpigmentation, the ways hormones show up on your face, and ingredient breakdowns you can trust. We cut through marketing to the evidence.',
    '✨', '#E8A0B5', '#F2C4CE', 2),
  ('fashion', 'Fashion',
    'Effortless, elevated real life — natural hair + outfit pairings and capsule wardrobes.',
    'Fashion at Natural Girlies is less about trends and more about the relationship between what you wear and how you wear your hair. Capsule wardrobes, outfit pairings for protective styles, and the art of dressing like yourself.',
    '👗', '#D4C1EC', '#F7E5A0', 3),
  ('beauty',  'Beauty',
    'Intentional beauty, minimalist routines, and anti-overconsumption editorials.',
    'Beauty here is intentional. We believe in fewer products, better questions, and the radical idea that your routine should serve you — not the other way around. This is where we talk about minimalism, ritual, and what actually belongs in your cabinet.',
    '🌸', '#F5A882', '#F2C4CE', 4)
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  long_description = excluded.long_description,
  icon = excluded.icon,
  color = excluded.color,
  accent_color = excluded.accent_color,
  sort_order = excluded.sort_order,
  updated_at = now();


insert into signature_sections (slug, title, tagline, description, icon, accent_color, sort_order)
values
  ('crown-report',          'The Crown Report',
    'Data meets storytelling.',
    'Data-driven storytelling pulled from Hair Wellness Lab insights. Where the numbers meet the narrative.',
    '📊', '#E8956A', 1),
  ('whats-in-your-cabinet', 'What''s In Your Cabinet',
    'Real routines from real women.',
    'Honest routines, tested products, and the actual contents of bathroom cabinets across our community.',
    '🧴', '#F5A882', 2),
  ('the-girlies-speak',     'The Girlies Speak',
    'Your voices, in your words.',
    'Community-driven quotes, experiences, and mini-interviews. The section where our readers become the editorial.',
    '💬', '#F2C4CE', 3),
  ('beauty-but-smarter',    'Beauty, But Smarter',
    'Ingredient truths, myths debunked.',
    'Ingredient breakdowns, myths vs. facts, and the occasional "you''ve been lied to about…" investigation.',
    '🧪', '#F7E5A0', 4),
  ('crown-and-culture',     'Crown & Culture',
    'History you can wear.',
    'The history of natural styles through generations — braids, locs, silk presses, and the cultural weight they carry.',
    '🌿', '#D4C1EC', 5)
on conflict (slug) do update set
  title = excluded.title,
  tagline = excluded.tagline,
  description = excluded.description,
  icon = excluded.icon,
  accent_color = excluded.accent_color,
  sort_order = excluded.sort_order,
  updated_at = now();


-- ============================================================
-- 12. ROW LEVEL SECURITY (Supabase pattern — adjust for your setup)
-- ============================================================
-- Uncomment if you're running on Supabase and want to use the public
-- anon key directly from the Next.js app.

-- alter table categories enable row level security;
-- alter table tags enable row level security;
-- alter table signature_sections enable row level security;
-- alter table authors enable row level security;
-- alter table issues enable row level security;
-- alter table stories enable row level security;
-- alter table blog_posts enable row level security;
-- alter table comments enable row level security;
-- alter table comment_reports enable row level security;
-- alter table newsletter_subscribers enable row level security;
-- alter table bookmarks enable row level security;

-- Public can read published content
-- create policy "public reads published stories"
--   on stories for select
--   using (status = 'published');
-- create policy "public reads published blog posts"
--   on blog_posts for select
--   using (status = 'published');
-- create policy "public reads categories" on categories for select using (true);
-- create policy "public reads tags" on tags for select using (true);
-- create policy "public reads signature sections" on signature_sections for select using (true);
-- create policy "public reads authors" on authors for select using (true);
-- create policy "public reads issues" on issues for select using (published_at is not null);

-- Anyone can submit a comment, only moderators can update/delete
-- create policy "public submits comments"
--   on comments for insert with check (true);
-- create policy "public reads approved comments"
--   on comments for select using (status = 'approved');
-- create policy "moderators manage comments"
--   on comments for update using (
--     exists (select 1 from profiles where id = auth.uid()
--             and role in ('moderator', 'editor', 'admin'))
--   );

-- Newsletter signup: anyone can insert, only admins read
-- create policy "public subscribes"
--   on newsletter_subscribers for insert with check (true);
-- create policy "admins read subscribers"
--   on newsletter_subscribers for select using (
--     exists (select 1 from profiles where id = auth.uid() and role = 'admin')
--   );

-- Bookmarks: only the owner can see or modify
-- create policy "owner reads bookmarks"
--   on bookmarks for select using (profile_id = auth.uid());
-- create policy "owner writes bookmarks"
--   on bookmarks for all using (profile_id = auth.uid());


-- ============================================================
-- 13. HELPFUL VIEWS
-- ============================================================

create or replace view published_stories as
select
  s.*,
  a.name as author_name,
  a.slug as author_slug,
  a.avatar_url as author_avatar,
  c.slug as category_slug,
  c.name as category_name,
  c.color as category_color
from stories s
join authors a on a.id = s.author_id
join categories c on c.id = s.category_id
where s.status = 'published'
  and s.published_at <= now();


create or replace view published_blog_posts as
select
  bp.*,
  a.name as author_name,
  a.slug as author_slug,
  a.avatar_url as author_avatar,
  c.slug as category_slug,
  c.name as category_name
from blog_posts bp
join authors a on a.id = bp.author_id
left join categories c on c.id = bp.category_id
where bp.status = 'published'
  and bp.published_at <= now();


create or replace view story_comment_counts as
select
  story_id,
  count(*) filter (where status = 'approved') as approved_count,
  count(*) filter (where status = 'pending')  as pending_count,
  max(created_at) filter (where status = 'approved') as latest_approved_at
from comments
where story_id is not null
group by story_id;


-- ============================================================
-- END OF SCHEMA
-- ============================================================
