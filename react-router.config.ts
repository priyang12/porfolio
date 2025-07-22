import type { Config } from '@react-router/dev/config';
import { GetAllBlogNames, GetProjectList } from './app/Utils/mdx.server';

export default {
  ssr: true,
  async prerender({ getStaticPaths }) {
    const blogs = (await GetAllBlogNames()).map((item) => `/${item}`);
    const projects = (await GetProjectList()).map((item) => `/${item}`);
    return [...getStaticPaths(), ...blogs, ...projects];
  },
} satisfies Config;
