export interface Author {
  id: string;
  name: string;
  slug: string;
  bio: string;
  avatar: string;
  role: string;
  socials?: {
    instagram?: string;
    twitter?: string;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription?: string;
  color: string;
  accentColor: string;
  icon: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface Story {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body?: string;
  coverImage: string;
  category: Category;
  author: Author;
  tags: Tag[];
  publishedAt: string;
  updatedAt?: string;
  readTime: number;
  featured: boolean;
  trending?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body?: string;
  coverImage: string;
  category: Category;
  author: Author;
  tags: Tag[];
  publishedAt: string;
  updatedAt?: string;
  readTime: number;
  featured: boolean;
}

export interface Issue {
  id: string;
  title: string;
  slug: string;
  season: string;
  year: number;
  volume: number;
  coverImage: string;
  editorLetter: string;
  stories: Story[];
  publishedAt: string;
  current: boolean;
}

export interface SignatureSection {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  href: string;
}

export interface SiteSettings {
  title: string;
  tagline: string;
  description: string;
  url: string;
  logo: string;
  socialImage: string;
  socials: {
    instagram?: string;
    twitter?: string;
    tiktok?: string;
    pinterest?: string;
    youtube?: string;
  };
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export type CategorySlug = 'crown' | 'skin' | 'fashion' | 'beauty';
