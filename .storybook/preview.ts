import type { Preview } from '@storybook/react'
import '../src/styles/globals.css'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date:  /Date$/i,
      },
    },
    backgrounds: {
      default: 'white',
      values: [
        { name: 'white',       value: '#FFFFFF' },
        { name: 'subtle',      value: '#EFF1FF' },
        { name: 'brand',       value: '#1929D6' },
        { name: 'brand-dark',  value: '#040966' },
        { name: 'ink',         value: '#0C0C0E' },
      ],
    },
  },
}

export default preview
