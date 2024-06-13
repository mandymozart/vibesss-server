import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import {
  relationship,
  integer
} from '@keystone-6/core/fields';

export const Content = list({
  access: allowAll,
  fields: {
    note: integer({
      defaultValue: 0,
      isOrderable: true,
      validation: {
        isRequired: true,
        min: 1,
        max: 127
      },
    }),
    presets: relationship({
      ref: 'Preset.contents', many: true, ui: {
        displayMode: 'select',
        labelField: 'title',
      },
    }),
    media: relationship({
      ref: 'Media.content',
      ui: {
        displayMode: 'cards',
        labelField: 'text',
        cardFields: ['type', 'text', 'file', 'image', 'url'],
        inlineEdit: { fields: ['type', 'text', 'file', 'image', 'url'] },
        linkToItem: true,
        inlineConnect: true,
      },

      many: false,
    }),
  }
})
