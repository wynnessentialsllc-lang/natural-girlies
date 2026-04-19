import type { NavItem, Category, SignatureSection } from './types';

export const SITE_CONFIG = {
  name: 'Natural Girlies Magazine',
  tagline: 'Where Every Crown Tells a Story',
  description:
    "The first editorial platform where natural beauty meets data, wellness, and cultural storytelling \u2014 designed for women who don't just want to look good, but understand their crown.",
  url: 'https://naturalgirlies.com',
  socialImage: '/og-image.jpg',
  twitterHandle: '@naturalgirlies',
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Magazine', href: '/magazine' },
  { label: 'Stories', href: '/stories' },
  { label: 'Blog', href: '/blog' },
  {
    label: 'Crown',
    href: '/categories/crown',
  },
  { label: 'Categories', href: '/categories' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const CATEGORIES: Category[] = [
  {
    id: 'crown',
    name: 'Crown',
    slug: 'crown',
    description: 'Hair wellness, protective styles, scalp health, and ingredient deep dives.',
    longDescription:
      "Your hair is your crown \u2014 and it deserves to be understood, not just styled. The Crown pillar is where we dig deep into hair wellness science, explore protective styles across every texture, decode ingredients, and honor the ritual of caring for natural hair. Whether you're deep in your loc journey, navigating a big chop, or refining a wash day that actually works for you \u2014 this is your home.",
    color: '#E8956A',
    accentColor: '#F5A882',
    icon: '👑',
  },
  {
    id: 'skin',
    name: 'Skin',
    slug: 'skin',
    description: 'Melanin science, hyperpigmentation, hormones and skin health.',
    longDescription:
      'Melanin-rich skin is not a complication — it is a masterpiece. The Skin pillar explores the science of deeper complexions: how hormones shape our skin at every decade, why hyperpigmentation behaves differently on deeper tones, and which actives are actually worth your money. Evidence-based, culturally grounded, and never preachy.',
    color: '#E8A0B5',
    accentColor: '#F2C4CE',
    icon: '✨',
  },
  {
    id: 'fashion',
    name: 'Fashion',
    slug: 'fashion',
    description: 'Effortless elevated real-life style and natural hair outfit pairings.',
    longDescription:
      'Fashion here is not about chasing trends — it is about building a wardrobe that moves with your real life. The Fashion pillar celebrates effortless elevation: what to wear when your twist-out is finally popping, how to dress for every season of your natural hair journey, and styling that feels aspirational without being unattainable.',
    color: '#D4C1EC',
    accentColor: '#D4C1EC',
    icon: '🌿',
  },
  {
    id: 'beauty',
    name: 'Beauty',
    slug: 'beauty',
    description: 'Intentional beauty, minimalist routines, and anti-overconsumption.',
    longDescription:
      'Beauty is about intentionality — not accumulation. The Beauty pillar is where we curate with purpose: minimalist routines that actually deliver, honest product reviews, and a firm stance against overconsumption culture. We believe the most sophisticated beauty routine is one you can sustain, afford, and feel genuinely good about.',
    color: '#F2C4CE',
    accentColor: '#E8A0B5',
    icon: '💄',
  },
];

export const SIGNATURE_SECTIONS: SignatureSection[] = [
  {
    id: 'crown-report',
    name: 'The Crown Report',
    slug: 'crown-report',
    description:
      'Data-driven storytelling pulling real insights from the Hair Wellness Lab. Where numbers meet narrative.',
    icon: '📊',
    color: '#E8956A',
    href: '/stories/crown-report',
  },
  {
    id: 'whats-in-your-cabinet',
    name: "What's In Your Cabinet",
    slug: 'whats-in-your-cabinet',
    description:
      'Real routines from real women. No sponsorships, no filters — just honest shelf tours and what actually works.',
    icon: '🪞',
    color: '#F5A882',
    href: '/stories/whats-in-your-cabinet',
  },
  {
    id: 'girlies-speak',
    name: 'The Girlies Speak',
    slug: 'girlies-speak',
    description:
      'Community voices, unfiltered quotes, and mini interviews with the women who inspire this magazine.',
    icon: '🗣️',
    color: '#F2C4CE',
    href: '/stories/girlies-speak',
  },
  {
    id: 'beauty-but-smarter',
    name: 'Beauty, But Smarter',
    slug: 'beauty-but-smarter',
    description:
      'Ingredient breakdowns, myth-busting, and the science behind what you put on your skin and hair.',
    icon: '🔬',
    color: '#D4C1EC',
    href: '/stories/beauty-but-smarter',
  },
  {
    id: 'crown-and-culture',
    name: 'Crown & Culture',
    slug: 'crown-and-culture',
    description:
      'The history, politics, and generational legacy of natural styles — because our hair has always been a statement.',
    icon: '🌍',
    color: '#E8A0B5',
    href: '/stories/crown-and-culture',
  },
];

export const LEGAL_LINKS: NavItem[] = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Use', href: '/terms' },
  { label: 'Accessibility Statement', href: '/accessibility' },
  { label: 'Comment Policy', href: '/comment-policy' },
];

export const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://instagram.com/naturalgirlies', icon: 'instagram' },
  { label: 'TikTok', href: 'https://tiktok.com/@naturalgirlies', icon: 'tiktok' },
  { label: 'Pinterest', href: 'https://pinterest.com/naturalgirlies', icon: 'pinterest' },
  { label: 'Twitter / X', href: 'https://twitter.com/naturalgirlies', icon: 'twitter' },
];

export const ECOSYSTEM_TOOLS = [
  {
    name: 'Hair Wellness Lab',
    description: 'Get a data-driven analysis of your hair health — porosity, density, moisture balance, and more.',
    href: '/tools/hair-wellness-lab',
    icon: '🧪',
    cta: 'Analyze My Hair',
  },
  {
    name: 'Product Analyzer',
    description: 'Decode any product label. We break down ingredients, flag concerns, and rate for your hair type.',
    href: '/tools/product-analyzer',
    icon: '🔍',
    cta: 'Analyze a Product',
  },
  {
    name: 'Crown Analysis',
    description: 'A personalized report on your natural hair pattern, growth cycles, and optimal care strategy.',
    href: '/tools/crown-analysis',
    icon: '👑',
    cta: 'Get My Crown Report',
  },
];

export const CATEGORY_COLOR_MAP: Record<string, string> = {
  crown: '#E8956A',
  skin: '#E8A0B5',
  fashion: '#D4C1EC',
  beauty: '#F2C4CE',
};
