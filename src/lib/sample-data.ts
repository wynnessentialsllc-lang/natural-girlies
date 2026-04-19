import type { Author, Story, BlogPost, Issue, Category } from './types';
import { CATEGORIES, SIGNATURE_SECTIONS } from './constants';

export const AUTHORS: Author[] = [
  {
    id: '1',
    name: 'Imani Rhodes',
    slug: 'imani-rhodes',
    bio: 'Imani is the founder and editor-in-chief of Natural Girlies Magazine. A hair wellness researcher and cultural storyteller, she has spent a decade writing at the intersection of beauty, data, and Black women\'s identity.',
    avatar: '/authors/imani-rhodes.jpg',
    role: 'Editor-in-Chief',
    socials: { instagram: '@imaniwrites', twitter: '@imaniwrites' },
  },
  {
    id: '2',
    name: 'Zora Mensah',
    slug: 'zora-mensah',
    bio: 'Zora is a cosmetic chemist turned beauty editor. She translates ingredient science into accessible, actionable content for women who want to understand what they\'re actually putting on their skin and hair.',
    avatar: '/authors/zora-mensah.jpg',
    role: 'Senior Beauty Editor',
    socials: { instagram: '@zorabeautylab' },
  },
  {
    id: '3',
    name: 'Nia Okafor',
    slug: 'nia-okafor',
    bio: 'Nia covers fashion and culture through the lens of natural hair. A stylist and writer based in Atlanta, she believes that what you wear and how you wear your hair are two parts of the same story.',
    avatar: '/authors/nia-okafor.jpg',
    role: 'Fashion & Culture Editor',
    socials: { instagram: '@niastylesyou', twitter: '@niaokafor' },
  },
  {
    id: '4',
    name: 'Priya Deveaux',
    slug: 'priya-deveaux',
    bio: 'Priya is a data journalist and wellness writer. She specializes in translating complex health and beauty research into the kind of stories that make you rethink your whole routine.',
    avatar: '/authors/priya-deveaux.jpg',
    role: 'Data + Wellness Correspondent',
    socials: { twitter: '@priyawrites' },
  },
];

const crownCategory = CATEGORIES.find((c) => c.slug === 'crown') as Category;
const skinCategory = CATEGORIES.find((c) => c.slug === 'skin') as Category;
const fashionCategory = CATEGORIES.find((c) => c.slug === 'fashion') as Category;
const beautyCategory = CATEGORIES.find((c) => c.slug === 'beauty') as Category;

export const STORIES: Story[] = [
  {
    id: '1',
    title: 'The Science of Shrinkage: Why Your Hair Does What It Does',
    slug: 'science-of-shrinkage',
    excerpt:
      'Shrinkage is not a problem to solve — it\'s a sign of health. We sat down with a trichologist to break down the curl science that explains exactly why your 12-inch hair appears to be 4 inches, and why that\'s actually a good thing.',
    coverImage: '/images/stories/shrinkage-science.jpg',
    category: crownCategory,
    author: AUTHORS[1],
    tags: [{ id: 't1', name: 'Hair Science', slug: 'hair-science' }],
    publishedAt: '2026-03-15T09:00:00Z',
    readTime: 8,
    featured: true,
    trending: true,
  },
  {
    id: '2',
    title: "Protective Styles That Actually Protect: A Dermatologist's Breakdown",
    slug: 'protective-styles-dermatologist',
    excerpt:
      'Not every protective style is protecting your edges. We asked a dermatologist specializing in textured hair to walk us through exactly what tension does to your follicles — and which styles deserve the "protective" label.',
    coverImage: '/images/stories/protective-styles.jpg',
    category: crownCategory,
    author: AUTHORS[0],
    tags: [{ id: 't2', name: 'Protective Styles', slug: 'protective-styles' }],
    publishedAt: '2026-03-10T09:00:00Z',
    readTime: 11,
    featured: true,
    trending: true,
  },
  {
    id: '3',
    title: 'Hyperpigmentation on Deep Skin Tones: What Actually Works',
    slug: 'hyperpigmentation-deep-skin',
    excerpt:
      'Most hyperpigmentation advice is written for lighter skin. We spoke with three melanin-specializing dermatologists to separate the actives that move the needle from the ones that could make things worse.',
    coverImage: '/images/stories/hyperpigmentation.jpg',
    category: skinCategory,
    author: AUTHORS[1],
    tags: [{ id: 't3', name: 'Skin Science', slug: 'skin-science' }, { id: 't4', name: 'Melanin', slug: 'melanin' }],
    publishedAt: '2026-03-08T09:00:00Z',
    readTime: 13,
    featured: true,
    trending: true,
  },
  {
    id: '4',
    title: 'The Moisturized Wardrobe: Dressing Around Your Wash Day',
    slug: 'moisturized-wardrobe-wash-day',
    excerpt:
      'Your wash day routine and your wardrobe have more in common than you think. Nia Okafor on building a capsule that works with your natural hair — not against it — from freshly moisturized twist-outs to stretched blowouts.',
    coverImage: '/images/stories/wash-day-wardrobe.jpg',
    category: fashionCategory,
    author: AUTHORS[2],
    tags: [{ id: 't5', name: 'Style', slug: 'style' }],
    publishedAt: '2026-03-05T09:00:00Z',
    readTime: 7,
    featured: false,
    trending: true,
  },
  {
    id: '5',
    title: 'Scalp Health is the Foundation: What the Data Says',
    slug: 'scalp-health-data',
    excerpt:
      'If your strands are struggling, your scalp might be the missing variable. We analyzed data from 3,200 Hair Wellness Lab users to identify the scalp patterns most correlated with breakage, dryness, and stunted retention.',
    coverImage: '/images/stories/scalp-health.jpg',
    category: crownCategory,
    author: AUTHORS[3],
    tags: [{ id: 't1', name: 'Hair Science', slug: 'hair-science' }, { id: 't6', name: 'Data', slug: 'data' }],
    publishedAt: '2026-02-28T09:00:00Z',
    readTime: 10,
    featured: false,
    trending: false,
  },
  {
    id: '6',
    title: 'Hormones and Hair Loss: The Conversation No One Is Having',
    slug: 'hormones-hair-loss',
    excerpt:
      'Postpartum shedding, PCOS, perimenopause — hormone-related hair loss affects a significant portion of our community and yet remains underdiagnosed and under-discussed. An endocrinologist explains the connection.',
    coverImage: '/images/stories/hormones-hair-loss.jpg',
    category: crownCategory,
    author: AUTHORS[1],
    tags: [{ id: 't7', name: 'Wellness', slug: 'wellness' }, { id: 't8', name: 'Hormones', slug: 'hormones' }],
    publishedAt: '2026-02-20T09:00:00Z',
    readTime: 14,
    featured: false,
    trending: false,
  },
  {
    id: '7',
    title: 'The History of Locs: From Spiritual Practice to Global Style Statement',
    slug: 'history-of-locs',
    excerpt:
      'Locs predate every trend cycle, every fashion week, and every influencer. A deep dive into the origins, the politics, and the enduring meaning of one of the most powerful natural styles in the world.',
    coverImage: '/images/stories/history-locs.jpg',
    category: crownCategory,
    author: AUTHORS[0],
    tags: [{ id: 't9', name: 'Culture', slug: 'culture' }, { id: 't10', name: 'History', slug: 'history' }],
    publishedAt: '2026-02-14T09:00:00Z',
    readTime: 16,
    featured: false,
    trending: true,
  },
  {
    id: '8',
    title: 'The Minimalist Skin Routine: Less Is Actually More',
    slug: 'minimalist-skin-routine',
    excerpt:
      'Ten products are not a routine — they are anxiety with SPF. Zora Mensah on how to pare back to the five steps that genuinely deliver, and why most of us are over-treating our skin into sensitivity.',
    coverImage: '/images/stories/minimalist-skin.jpg',
    category: beautyCategory,
    author: AUTHORS[1],
    tags: [{ id: 't11', name: 'Skincare', slug: 'skincare' }, { id: 't12', name: 'Minimalism', slug: 'minimalism' }],
    publishedAt: '2026-02-10T09:00:00Z',
    readTime: 9,
    featured: false,
    trending: false,
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'Why We Built the Product Analyzer',
    slug: 'why-we-built-product-analyzer',
    excerpt:
      'The idea came from a reader DM: "I have ten products and none of them are working." Here\'s the full story behind how we built the tool that decodes your ingredient labels.',
    coverImage: '/images/blog/product-analyzer-build.jpg',
    category: crownCategory,
    author: AUTHORS[0],
    tags: [{ id: 'bt1', name: 'Behind the Scenes', slug: 'behind-the-scenes' }, { id: 'bt2', name: 'Launches', slug: 'launches' }],
    publishedAt: '2026-04-01T09:00:00Z',
    readTime: 6,
    featured: true,
  },
  {
    id: 'b2',
    title: 'Spring Issue: Behind the Scenes',
    slug: 'spring-issue-behind-the-scenes',
    excerpt:
      'Four months. Forty contributors. One vision. Here\'s an inside look at how we produced the Spring 2026 issue, from first pitch to final publish.',
    coverImage: '/images/blog/spring-behind-scenes.jpg',
    category: fashionCategory,
    author: AUTHORS[0],
    tags: [{ id: 'bt1', name: 'Behind the Scenes', slug: 'behind-the-scenes' }],
    publishedAt: '2026-03-20T09:00:00Z',
    readTime: 5,
    featured: false,
  },
  {
    id: 'b3',
    title: 'The Girlies Speak: March Community Roundup',
    slug: 'girlies-speak-march-roundup',
    excerpt:
      'Every month, we gather the most powerful submissions from The Girlies Speak series. This is March — raw, real, and full of the kind of wisdom that only comes from lived experience.',
    coverImage: '/images/blog/girlies-speak-march.jpg',
    category: crownCategory,
    author: AUTHORS[2],
    tags: [{ id: 'bt3', name: 'Community', slug: 'community' }],
    publishedAt: '2026-03-31T09:00:00Z',
    readTime: 7,
    featured: false,
  },
  {
    id: 'b4',
    title: 'New Feature: Hair Wellness Lab 2.0',
    slug: 'hair-wellness-lab-2-launch',
    excerpt:
      'We rebuilt the Hair Wellness Lab from the ground up. Here is everything that is new, what we removed, and why this version is the one we\'ve always wanted to ship.',
    coverImage: '/images/blog/hwl-launch.jpg',
    category: crownCategory,
    author: AUTHORS[0],
    tags: [{ id: 'bt2', name: 'Launches', slug: 'launches' }],
    publishedAt: '2026-03-15T09:00:00Z',
    readTime: 4,
    featured: false,
  },
  {
    id: 'b5',
    title: 'Our Ingredient Blacklist: What We Will Never Recommend',
    slug: 'ingredient-blacklist',
    excerpt:
      'Not all ingredients are created equal. After two years of deep dives with cosmetic chemists, here are the formulation choices we refuse to endorse — and why.',
    coverImage: '/images/blog/ingredient-blacklist.jpg',
    category: beautyCategory,
    author: AUTHORS[1],
    tags: [{ id: 'bt4', name: 'Ingredients', slug: 'ingredients' }],
    publishedAt: '2026-03-10T09:00:00Z',
    readTime: 8,
    featured: false,
  },
  {
    id: 'b6',
    title: 'A Letter from Imani: Why This Magazine Exists',
    slug: 'letter-from-imani-why-this-exists',
    excerpt:
      'I started Natural Girlies because I was tired of being told to "manage" my hair. Here is the full story of why this magazine exists and what we are actually building.',
    coverImage: '/images/blog/letter-from-imani.jpg',
    category: crownCategory,
    author: AUTHORS[0],
    tags: [{ id: 'bt5', name: 'Editorial', slug: 'editorial' }],
    publishedAt: '2026-01-01T09:00:00Z',
    readTime: 9,
    featured: false,
  },
];

export const ISSUES: Issue[] = [
  {
    id: 'i1',
    title: 'Spring 2026 | Volume 3',
    slug: 'spring-2026',
    season: 'Spring',
    year: 2026,
    volume: 3,
    coverImage: '/images/issues/spring-2026-cover.jpg',
    editorLetter:
      'This issue is about reclamation. After three years of building this magazine — and watching our community grow into something that genuinely surprised me — I wanted this issue to be about owning the full story of your crown. Not just the aesthetics, but the history, the science, the emotion. The Spring 2026 issue is our most ambitious yet.',
    stories: STORIES.slice(0, 4),
    publishedAt: '2026-03-01T09:00:00Z',
    current: true,
  },
  {
    id: 'i2',
    title: 'Winter 2025 | Volume 2',
    slug: 'winter-2025',
    season: 'Winter',
    year: 2025,
    volume: 2,
    coverImage: '/images/issues/winter-2025-cover.jpg',
    editorLetter:
      'The Winter issue was always going to be about depth. We go deeper on scalp science, deeper on protective styling practices, and deeper into the cultural archive of natural hair.',
    stories: STORIES.slice(2, 6),
    publishedAt: '2025-12-01T09:00:00Z',
    current: false,
  },
  {
    id: 'i3',
    title: 'Fall 2025 | Volume 1, No. 2',
    slug: 'fall-2025',
    season: 'Fall',
    year: 2025,
    volume: 1,
    coverImage: '/images/issues/fall-2025-cover.jpg',
    editorLetter:
      'Transition season has always been ours. When leaves change, so does our hair. The Fall 2025 issue is about embracing change — in your routine, your style, and your perspective on beauty.',
    stories: STORIES.slice(4, 8),
    publishedAt: '2025-09-01T09:00:00Z',
    current: false,
  },
  {
    id: 'i4',
    title: 'Summer 2025 | Volume 1, No. 1',
    slug: 'summer-2025',
    season: 'Summer',
    year: 2025,
    volume: 1,
    coverImage: '/images/issues/summer-2025-cover.jpg',
    editorLetter:
      'The inaugural issue. We wanted to start with a declaration: natural hair is not a trend, a political statement, or an act of defiance. It is simply hair. Beautiful, complex, and worthy of the kind of editorial attention that has always gone elsewhere.',
    stories: STORIES.slice(0, 4),
    publishedAt: '2025-06-01T09:00:00Z',
    current: false,
  },
];

export const SIGNATURE_SECTION_DATA = SIGNATURE_SECTIONS;

export { CATEGORIES as CATEGORY_DATA };
