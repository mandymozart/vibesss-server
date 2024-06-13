import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';

import {
    text,
    relationship,
    password,
    timestamp
} from '@keystone-6/core/fields';

export const User = list({
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
})

