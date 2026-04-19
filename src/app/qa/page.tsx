import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { STORIES, BLOG_POSTS, ISSUES, AUTHORS } from "@/lib/sample-data";
import { CATEGORIES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "QA Index — Internal",
  description: "Internal QA index for Natural Girlies Magazine.",
  robots: { index: false, follow: false },
};

type Section = {
  title: string;
  description?: string;
  links: { label: string; href: string }[];
};

export default function QAPage() {
  const sections: Section[] = [
    {
      title: "Core",
      links: [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "Search", href: "/search" },
        { label: "Saved", href: "/saved" },
        { label: "404 (intentional)", href: "/this-page-does-not-exist" },
      ],
    },
    {
      title: "Magazine",
      links: [
        { label: "Magazine index", href: "/magazine" },
        ...ISSUES.map((issue) => ({
          label: issue.title,
          href: `/magazine/${issue.slug}`,
        })),
      ],
    },
    {
      title: "Stories",
      links: [
        { label: "Stories index", href: "/stories" },
        ...STORIES.map((story) => ({
          label: story.title,
          href: `/stories/${story.slug}`,
        })),
      ],
    },
    {
      title: "Blog",
      links: [
        { label: "Blog index", href: "/blog" },
        ...BLOG_POSTS.map((post) => ({
          label: post.title,
          href: `/blog/${post.slug}`,
        })),
      ],
    },
    {
      title: "Categories",
      links: [
        { label: "Categories index", href: "/categories" },
        ...CATEGORIES.map((category) => ({
          label: category.name,
          href: `/categories/${category.slug}`,
        })),
      ],
    },
    {
      title: "Authors",
      links: [
        { label: "Authors index", href: "/authors" },
        ...AUTHORS.map((author) => ({
          label: author.name,
          href: `/authors/${author.slug}`,
        })),
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Use", href: "/terms" },
        { label: "Accessibility Statement", href: "/accessibility" },
        { label: "Comment Policy", href: "/comment-policy" },
      ],
    },
  ];

  const totalLinks = sections.reduce((sum, s) => sum + s.links.length, 0);

  return (
    <div className="bg-cream py-16">
      <Container>
        <div className="mb-12">
          <p className="text-xs uppercase tracking-[0.18em] text-coral">
            Internal · Not Indexed
          </p>
          <h1 className="mt-2 font-serif text-4xl text-espresso sm:text-5xl">
            QA Index
          </h1>
          <p className="mt-3 max-w-2xl text-warmBrown">
            Every route on the site, organized by section. Use this to spot
            check pages during development. Total: {totalLinks} routes.
          </p>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="font-serif text-2xl text-espresso">
                {section.title}
              </h2>
              <ul className="mt-3 space-y-1.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-warmBrown underline decoration-border underline-offset-2 hover:decoration-coral hover:text-espresso"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </Container>
    </div>
  );
}
