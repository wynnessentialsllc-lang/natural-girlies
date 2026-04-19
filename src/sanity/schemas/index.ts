import author from './author';
import blogPost from './blogPost';
import category from './category';
import issue from './issue';
import signatureSection from './signatureSection';
import siteSettings from './siteSettings';
import story from './story';
import tag from './tag';

// Schema registry for Sanity v3
// To use: import { schemaTypes } from '@/sanity/schemas'
// Then pass to defineConfig({ schema: { types: schemaTypes } })
export const schemaTypes = [
  // Content
  story,
  blogPost,
  issue,
  // Supporting documents
  category,
  author,
  tag,
  signatureSection,
  // Settings (singleton)
  siteSettings,
];

export default schemaTypes;
