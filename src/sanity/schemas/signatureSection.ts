const signatureSection = {
  name: 'signatureSection',
  title: 'Signature Section',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Section Name',
      type: 'string',
      description: 'E.g., "The Crown Report", "The Girlies Speak"',
      validation: (Rule: Record<string, (...args: unknown[]) => unknown>) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (Rule: Record<string, (...args: unknown[]) => unknown>) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Brief description for cards and hover states',
    },
    {
      name: 'icon',
      title: 'Icon Emoji',
      type: 'string',
    },
    {
      name: 'color',
      title: 'Accent Color',
      type: 'string',
      description: 'Hex color for this signature section',
    },
    {
      name: 'href',
      title: 'Link Path',
      type: 'string',
      description: 'URL path for this section (e.g., /stories/crown-report)',
    },
    {
      name: 'frequency',
      title: 'Publication Frequency',
      type: 'string',
      description: 'E.g., "Monthly", "Quarterly", "Weekly"',
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'description' },
  },
};

export default signatureSection;
