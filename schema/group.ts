import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import {
  text,
  relationship,
  integer
} from '@keystone-6/core/fields';

export const Group = list({
  access: allowAll,
  fields: {
    name: text({ validation: { isRequired: true } }),
    channel: integer({
      defaultValue: 0,
      isOrderable: true,
      validation: {
        isRequired: true,
        min: 1,
        max: 16
      },
    }),
    presets: relationship({
      ref: 'Preset.groups', many: true, ui: {
        displayMode: 'select',
        labelField: 'title',
      },
    }),
  }
});
