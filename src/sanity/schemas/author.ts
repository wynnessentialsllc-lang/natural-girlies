const author = {
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
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
      name: 'role',
      title: 'Role / Title',
      type: 'string',
      description: 'E.g., Editor-in-Chief, Senior Beauty Editor',
    },
    {
      name: 'bio',
      title: 'Biography',
      type: 'text',
      rows: 5,
      description: 'Full bio displayed on author pages and contributor sections',
    },
    {
      name: 'avatar',
      title: 'Avatar Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', title: 'Alt Text', type: 'string' },
      ],
    },
    {
      name: 'socials',
      title: 'Social Links',
      type: 'object',
      fields: [
        { name: 'instagram', title: 'Instagram Handle', type: 'string' },
        { name: 'twitter', title: 'Twitter/X Handle', type: 'string' },
      ],
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'role', media: 'avatar' },
  },
};

export default author;
