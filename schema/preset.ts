import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import {
  text,
  relationship,
  json,
} from '@keystone-6/core/fields';

export const Preset = list({
  access: allowAll,
  fields: {
    title: text({ validation: { isRequired: true } }),
    slug: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
    preset_json: json({
      defaultValue: null,
      db: { map: 'preset_json' },
    }),
    sessions: relationship({ ref: 'Session.presets', many: true }),
    groups: relationship({ ref: 'Group.presets', many: true, }),
    contents: relationship({
      ref: 'Content.presets', many: true, ui: {
        displayMode: 'select',
        labelField: 'note',
      },
    }),
    author: relationship({
      ref: 'User.presets',
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
      ref: 'Tag.presets',
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