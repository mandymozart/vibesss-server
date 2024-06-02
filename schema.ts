// Welcome to your schema
//   Schema driven development is Keystone's modus operandi
//
// This file is where we define the lists, fields and hooks for our data.
// If you want to learn more about how lists are configured, please read
// - https://keystonejs.com/docs/config/lists

import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';

// see https://keystonejs.com/docs/fields/overview for the full list of fields
//   this is a few common fields for an example
import {
  text,
  relationship,
  password,
  timestamp,
  json,
  file,
  select,
  image,
  integer
} from '@keystone-6/core/fields';

// the document field is a more complicated field, so it has it's own package
import { document } from '@keystone-6/fields-document';
// if you want to make your own fields, see https://keystonejs.com/docs/guides/custom-fields

// when using Typescript, you can refine your types to a stricter subset by importing
// the generated types from '.keystone/types'
import type { Lists } from '.keystone/types';

export const lists: Lists = {
  User: list({
    access: allowAll,
    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({
        validation: { isRequired: true },
        isIndexed: 'unique',
      }),
      password: password({ validation: { isRequired: true } }),
      sessions: relationship({ ref: 'Session.author', many: true }),
      presets: relationship({ ref: 'Preset.author', many: true }),
      createdAt: timestamp({
        defaultValue: { kind: 'now' },
      }),
    },
  }),

  Preset: list({
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
      contents: relationship({ ref: 'Content.presets', many: true,        ui: {
        displayMode: 'select',
        labelField: 'note',
      }, }),
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
  }),

  Content: list({
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
  }),

  Group: list({
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
  }),

  Media: list({
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
  }),

  Session: list({
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
  }),

  Tag: list({
    access: allowAll,
    ui: {
      isHidden: true,
    },
    fields: {
      name: text(),
      presets: relationship({ ref: 'Preset.tags', many: true }),
      sessions: relationship({ ref: 'Session.tags', many: true }),
    },
  }),
};
