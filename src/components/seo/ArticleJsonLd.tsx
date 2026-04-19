type ArticleJsonLdProps = {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  url: string;
  publisherName?: string;
  publisherLogo?: string;
};

/**
 * Renders Article schema (JSON-LD) for an article or story page.
 * Drop into the page body — Next.js will hoist it appropriately.
 */
export function ArticleJsonLd({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  authorName,
  url,
  publisherName = "Natural Girlies Magazine",
  publisherLogo,
}: ArticleJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    image: [image],
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: publisherName,
      logo: publisherLogo
        ? {
            "@type": "ImageObject",
            url: publisherLogo,
          }
        : undefined,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
