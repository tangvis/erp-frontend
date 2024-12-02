// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import { PurpleTheme } from '@/theme/LightTheme';

const vuetify = createVuetify({
    components,
    directives,
    ssr: true,
    theme: {
        defaultTheme: 'PurpleTheme',
        themes: {
            PurpleTheme
        }
    },
    defaults: {
        VBtn: {},
        VCard: {
            rounded: 'md'
        },
        VTextField: {
            rounded: 'lg'
        },
        VTooltip: {
            // set v-tooltip default location to top
            location: 'top'
        }
    }
})

export default vuetify
