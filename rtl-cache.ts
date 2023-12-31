// rtl-cache.ts
import rtlPlugin from 'stylis-plugin-rtl';
import { createEmotionCache } from '@mantine/core';

export const rtlCache = createEmotionCache({
  key: 'mantine',
  prepend: true,
  stylisPlugins: [rtlPlugin],
});