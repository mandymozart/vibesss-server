"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_config = require("dotenv/config");
var import_core2 = require("@keystone-6/core");

// schema.ts
var import_core = require("@keystone-6/core");
var import_access = require("@keystone-6/core/access");
var import_fields = require("@keystone-6/core/fields");
var lists = {
  User: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      name: (0, import_fields.text)({ validation: { isRequired: true } }),
      email: (0, import_fields.text)({
        validation: { isRequired: true },
        isIndexed: "unique"
      }),
      password: (0, import_fields.password)({ validation: { isRequired: true } }),
      sessions: (0, import_fields.relationship)({ ref: "Session.author", many: true }),
      presets: (0, import_fields.relationship)({ ref: "Preset.author", many: true }),
      createdAt: (0, import_fields.timestamp)({
        defaultValue: { kind: "now" }
      })
    }
  }),
  Preset: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      title: (0, import_fields.text)({ validation: { isRequired: true } }),
      slug: (0, import_fields.text)({ validation: { isRequired: true }, isIndexed: "unique" }),
      preset_json: (0, import_fields.json)({
        defaultValue: null,
        db: { map: "preset_json" }
      }),
      sessions: (0, import_fields.relationship)({ ref: "Session.presets", many: true }),
      groups: (0, import_fields.relationship)({ ref: "Group.presets", many: true }),
      contents: (0, import_fields.relationship)({ ref: "Content.presets", many: true, ui: {
        displayMode: "select",
        labelField: "note"
      } }),
      author: (0, import_fields.relationship)({
        ref: "User.presets",
        ui: {
          displayMode: "cards",
          cardFields: ["name", "email"],
          inlineEdit: { fields: ["name", "email"] },
          linkToItem: true,
          inlineConnect: true
        },
        many: false
      }),
      tags: (0, import_fields.relationship)({
        ref: "Tag.presets",
        many: true,
        ui: {
          displayMode: "cards",
          cardFields: ["name"],
          inlineEdit: { fields: ["name"] },
          linkToItem: true,
          inlineConnect: true,
          inlineCreate: { fields: ["name"] }
        }
      })
    }
  }),
  Content: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      note: (0, import_fields.integer)({
        defaultValue: 0,
        isOrderable: true,
        validation: {
          isRequired: true,
          min: 1,
          max: 127
        }
      }),
      presets: (0, import_fields.relationship)({
        ref: "Preset.contents",
        many: true,
        ui: {
          displayMode: "select",
          labelField: "title"
        }
      }),
      media: (0, import_fields.relationship)({
        ref: "Media.content",
        ui: {
          displayMode: "cards",
          labelField: "text",
          cardFields: ["type", "text", "file", "image", "url"],
          inlineEdit: { fields: ["type", "text", "file", "image", "url"] },
          linkToItem: true,
          inlineConnect: true
        },
        many: false
      })
    }
  }),
  Group: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      name: (0, import_fields.text)({ validation: { isRequired: true } }),
      channel: (0, import_fields.integer)({
        defaultValue: 0,
        isOrderable: true,
        validation: {
          isRequired: true,
          min: 1,
          max: 16
        }
      }),
      presets: (0, import_fields.relationship)({
        ref: "Preset.groups",
        many: true,
        ui: {
          displayMode: "select",
          labelField: "title"
        }
      })
    }
  }),
  Media: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      content: (0, import_fields.relationship)({
        ref: "Content.media",
        many: true,
        ui: {
          displayMode: "select",
          labelField: "note"
        }
      }),
      text: (0, import_fields.text)({ defaultValue: "" }),
      file: (0, import_fields.file)({ storage: "my_files" }),
      image: (0, import_fields.image)({ storage: "my_images" }),
      url: (0, import_fields.text)({ defaultValue: "" }),
      type: (0, import_fields.select)({
        type: "enum",
        options: [
          { label: "Onomatopoeia", value: "onomatopoeia" },
          { label: "Image", value: "image" },
          { label: "Audio", value: "audio" },
          { label: "Video", value: "video" },
          { label: "Score", value: "score" },
          { label: "SVG", value: "svg" },
          { label: "Text", value: "text" }
        ],
        defaultValue: "onomatopoeia",
        db: { map: "media_type" },
        validation: { isRequired: true },
        isIndexed: "unique",
        ui: { displayMode: "select" }
      })
    },
    graphql: {
      plural: "Medias"
    }
  }),
  Session: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      title: (0, import_fields.text)({ validation: { isRequired: true } }),
      slug: (0, import_fields.text)({ validation: { isRequired: true }, isIndexed: "unique" }),
      session_json: (0, import_fields.json)({
        defaultValue: null,
        db: { map: "session_json" }
      }),
      presets: (0, import_fields.relationship)({ ref: "Preset.sessions", many: true }),
      author: (0, import_fields.relationship)({
        ref: "User.sessions",
        ui: {
          displayMode: "cards",
          cardFields: ["name", "email"],
          inlineEdit: { fields: ["name", "email"] },
          linkToItem: true,
          inlineConnect: true
        },
        many: false
      }),
      tags: (0, import_fields.relationship)({
        ref: "Tag.sessions",
        many: true,
        ui: {
          displayMode: "cards",
          cardFields: ["name"],
          inlineEdit: { fields: ["name"] },
          linkToItem: true,
          inlineConnect: true,
          inlineCreate: { fields: ["name"] }
        }
      })
    }
  }),
  Tag: (0, import_core.list)({
    access: import_access.allowAll,
    ui: {
      isHidden: true
    },
    fields: {
      name: (0, import_fields.text)(),
      presets: (0, import_fields.relationship)({ ref: "Preset.tags", many: true }),
      sessions: (0, import_fields.relationship)({ ref: "Session.tags", many: true })
    }
  })
};

// auth.ts
var import_crypto = require("crypto");
var import_auth = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");
var sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret && process.env.NODE_ENV !== "production") {
  sessionSecret = (0, import_crypto.randomBytes)(32).toString("hex");
}
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "email",
  // this is a GraphQL query fragment for fetching what data will be attached to a context.session
  //   this can be helpful for when you are writing your access control functions
  //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
  sessionData: "name createdAt",
  secretField: "password",
  // WARNING: remove initFirstItem functionality in production
  //   see https://keystonejs.com/docs/config/auth#init-first-item for more
  initFirstItem: {
    // if there are no items in the database, by configuring this field
    //   you are asking the Keystone AdminUI to create a new user
    //   providing inputs for these fields
    fields: ["name", "email", "password"]
    // it uses context.sudo() to do this, which bypasses any access control you might have
    //   you shouldn't use this in production
  }
});
var sessionMaxAge = 60 * 60 * 24 * 30;
var session = (0, import_session.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: sessionSecret
});

// keystone.ts
var {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  S3_BUCKET_NAME: bucketName,
  S3_REGION: region,
  S3_ACCESS_KEY_ID: accessKeyId,
  S3_SECRET_ACCESS_KEY: secretAccessKey
} = process.env;
var keystone_default = withAuth(
  (0, import_core2.config)({
    db: {
      provider: "mysql",
      url: `mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
      // url: 'file:./keystone.db',
    },
    lists,
    session,
    storage: {
      my_images: {
        kind: "s3",
        type: "image",
        bucketName,
        region,
        accessKeyId,
        secretAccessKey,
        signed: { expiry: 5e3 }
      },
      my_files: {
        kind: "s3",
        type: "file",
        bucketName,
        region,
        accessKeyId,
        secretAccessKey,
        signed: { expiry: 5e3 }
      }
    }
  })
);
//# sourceMappingURL=config.js.map
