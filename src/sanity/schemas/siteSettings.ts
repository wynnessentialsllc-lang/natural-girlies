const siteSettings = {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      name: 'title',
      title: 'Site Title',
      type: 'string',
      description: 'The main site title (e.g., Natural Girlies Magazine)',
    },
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'The hero tagline (e.g., "Where Every Crown Tells a Story")',
    },
    {
      name: 'description',
      title: 'Site Description',
      type: 'text',
      rows: 3,
      description: 'Used as the default meta description',
    },
    {
      name: 'url',
      title: 'Site URL',
      type: 'url',
      description: 'Production URL (e.g., https://naturalgirlies.com)',
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'socialImage',
      title: 'Default OG Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Default image used for social sharing when no specific image is set',
    },
    {
      name: 'socials',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        { name: 'instagram', title: 'Instagram URL', type: 'url' },
        { name: 'twitter', title: 'Twitter/X URL', type: 'url' },
        { name: 'tiktok', title: 'TikTok URL', type: 'url' },
        { name: 'pinterest', title: 'Pinterest URL', type: 'url' },
        { name: 'youtube', title: 'YouTube URL', type: 'url' },
      ],
    },
    {
      name: 'newsletterHeadline',
      title: 'Newsletter Headline',
      type: 'string',
      description: 'Headline for newsletter CTAs throughout the site',
    },
    {
      name: 'newsletterSubtext',
      title: 'Newsletter Subtext',
      type: 'text',
      rows: 2,
    },
  ],
  preview: {
    select: { title: 'title' },
  },
};

export default siteSettings;
