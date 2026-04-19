const category = {
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Display name for the category (e.g., Crown, Skin, Fashion, Beauty)',
      validation: (Rule: Record<string, (...args: unknown[]) => unknown>) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-safe identifier used in routes',
      options: { source: 'name' },
      validation: (Rule: Record<string, (...args: unknown[]) => unknown>) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Short Description',
      type: 'text',
      description: 'Brief one-line description for cards and meta tags',
      rows: 2,
    },
    {
      name: 'longDescription',
      title: 'Long Description',
      type: 'text',
      description: 'Full description for the category landing page',
      rows: 5,
    },
    {
      name: 'color',
      title: 'Accent Color',
      type: 'string',
      description: 'Hex color code used for category accents (e.g., #E8956A)',
    },
    {
      name: 'icon',
      title: 'Icon Emoji',
      type: 'string',
      description: 'Emoji or icon character for visual identification',
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'description' },
  },
};

export default category;
