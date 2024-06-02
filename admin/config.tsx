// admin/config.tsx
import { jsx } from '@keystone-ui/core';

function CustomLogo () {
    return <h3 css={{
        background: 'papayawhip'
    }}>VIBESSS</h3>
}

export const components = {
    Logo: CustomLogo
}