import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import {
  text,
  relationship,
  json,
} from '@keystone-6/core/fields';

export const Session = list({
  access: allowAll,
  fields: {
    title: text({ validation: { isRequired: true } }),
    slug: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
    session_json: json({
      defaultValue: null,
      db: { map: 'session_json' },
    }),
    presets: relationship({ ref: 'Preset.sessions', many: true }),
    author: relationship({
      ref: 'User.sessions',
      ui: {
        displayMode: 'cards',
        cardFields: ['name', 'email'],
        inlineEdit: { fields: ['name', 'email'] },
        linkToItem: true,
        inlineConnect: true,
      },
      many: false,
    }),
    tags: relationship({
      ref: 'Tag.sessions',
      many: true,
      ui: {
        displayMode: 'cards',
        cardFields: ['name'],
        inlineEdit: { fields: ['name'] },
        linkToItem: true,
        inlineConnect: true,
        inlineCreate: { fields: ['name'] },
      },
    }),
  },
})
