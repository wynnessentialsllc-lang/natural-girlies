const tag = {
  name: 'tag',
  title: 'Tag',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Tag Name',
      type: 'string',
      description: 'Display name (e.g., Hair Science, Protective Styles, Behind the Scenes)',
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
      type: 'string',
      description: 'Optional: brief description for tag pages',
    },
  ],
  preview: {
    select: { title: 'name' },
  },
};

export default tag;
