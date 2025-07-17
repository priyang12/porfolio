import type { Config } from '@react-router/dev/config';

export default {
  ssr: true,
  prerender: true,
  // add fn for prerendering slug pages.
} satisfies Config;
