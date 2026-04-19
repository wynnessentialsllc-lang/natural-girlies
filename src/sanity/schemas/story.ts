const story = {
  name: 'story',
  title: 'Story',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Full editorial headline',
      validation: (Rule: Record<string, (...args: unknown[]) => unknown>) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule: Record<string, (...args: unknown[]) => unknown>) => Rule.required(),
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Short description for cards, social sharing, and SEO',
      validation: (Rule: Record<string, (...args: unknown[]) => unknown>) =>
        Rule.required(),
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', title: 'Alt Text', type: 'string' },
            { name: 'caption', title: 'Caption', type: 'string' },
          ],
        },
      ],
      description: 'Full story body in Portable Text format',
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', title: 'Alt Text', type: 'string', validation: (Rule: Record<string, (...args: unknown[]) => unknown>) => Rule.required() },
      ],
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule: Record<string, (...args: unknown[]) => unknown>) => Rule.required(),
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: (Rule: Record<string, (...args: unknown[]) => unknown>) => Rule.required(),
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }],
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule: Record<string, (...args: unknown[]) => unknown>) => Rule.required(),
    },
    {
      name: 'updatedAt',
      title: 'Last Updated',
      type: 'datetime',
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Pin this story to featured sections on the homepage',
      initialValue: false,
    },
    {
      name: 'trending',
      title: 'Trending',
      type: 'boolean',
      description: 'Mark as trending for the "Most Read" section',
      initialValue: false,
    },
    {
      name: 'signatureSection',
      title: 'Signature Section',
      type: 'reference',
      to: [{ type: 'signatureSection' }],
      description: 'Optional: associate with a recurring signature series',
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        { name: 'metaTitle', title: 'Meta Title', type: 'string' },
        { name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 2 },
        { name: 'ogImage', title: 'OG Image', type: 'image', options: { hotspot: true } },
      ],
    },
  ],
  orderings: [
    { title: 'Published (Newest)', name: 'publishedDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
    { title: 'Published (Oldest)', name: 'publishedAsc', by: [{ field: 'publishedAt', direction: 'asc' }] },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category.name',
      media: 'coverImage',
    },
  },
};

export default story;
