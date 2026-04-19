const issue = {
  name: 'issue',
  title: 'Magazine Issue',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Issue Title',
      type: 'string',
      description: 'E.g., "Spring 2026 | Volume 3"',
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
      name: 'season',
      title: 'Season',
      type: 'string',
      options: {
        list: [
          { title: 'Spring', value: 'Spring' },
          { title: 'Summer', value: 'Summer' },
          { title: 'Fall', value: 'Fall' },
          { title: 'Winter', value: 'Winter' },
        ],
        layout: 'radio',
      },
      validation: (Rule: Record<string, (...args: unknown[]) => unknown>) => Rule.required(),
    },
    {
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (Rule: Record<string, (...args: unknown[]) => unknown>) =>
        Rule.required(),
    },
    {
      name: 'volume',
      title: 'Volume Number',
      type: 'number',
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', title: 'Alt Text', type: 'string' },
      ],
    },
    {
      name: 'editorLetter',
      title: "Editor's Letter",
      type: 'text',
      rows: 8,
      description: 'The editor-in-chief letter for this issue',
    },
    {
      name: 'stories',
      title: 'Stories in This Issue',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'story' }] }],
      description: 'Select the stories that appear in this issue, in order',
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    },
    {
      name: 'current',
      title: 'Is Current Issue',
      type: 'boolean',
      description: 'Mark as the current issue. Only one issue should be current at a time.',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'season',
      media: 'coverImage',
    },
  },
};

export default issue;
