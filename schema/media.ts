import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import {
  text,
  relationship,
  file,
  select,
  image,
} from '@keystone-6/core/fields';

export const Media = list({
  access: allowAll,
  fields: {
    content: relationship({
      ref: 'Content.media', many: true,
      ui: {
        displayMode: 'select',
        labelField: 'note',
      },
    }),
    text: text({ defaultValue: '' }),
    file: file({ storage: 'my_files' }),
    image: image({ storage: 'my_images' }),
    url: text({ defaultValue: '' }),
    type: select({
      type: 'enum',
      options: [
        { label: 'Onomatopoeia', value: 'onomatopoeia' },
        { label: 'Image', value: 'image' },
        { label: 'Audio', value: 'audio' },
        { label: 'Video', value: 'video' },
        { label: 'Score', value: 'score' },
        { label: 'SVG', value: 'svg' },
        { label: 'Text', value: 'text' },
      ],
      defaultValue: 'onomatopoeia',
      db: { map: 'media_type' },
      validation: { isRequired: true, },
      isIndexed: 'unique',
      ui: { displayMode: 'select' },
    })
  },

  graphql: {
    plural: 'Medias'
  },
});
