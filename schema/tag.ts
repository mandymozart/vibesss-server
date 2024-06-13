import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import {
  text,
  relationship,
} from '@keystone-6/core/fields';

export const Tag = list({
  access: allowAll,
  ui: {
    isHidden: true,
  },
  fields: {
    name: text(),
    presets: relationship({ ref: 'Preset.tags', many: true }),
    sessions: relationship({ ref: 'Session.tags', many: true }),
  },
})
