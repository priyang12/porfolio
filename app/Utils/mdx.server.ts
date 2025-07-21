import { readdirSync } from 'fs';
import { bundleMDX } from 'mdx-bundler';
import rehypeSlug from 'rehype-slug';
import remarkPrism from 'remark-prism';
import path from 'path';
import { cache } from './cache.server';

const projectsFolderPath = '/content/Projects';

// get the projects filename names.
export const GetProjectList = () => {
  const cacheKey = 'all-project-names';
  const cached = cache.get<string[]>(cacheKey);
  if (cached) return cached;
  const _dirname = path.resolve();
  const ProjectsFileNames = readdirSync(_dirname + projectsFolderPath);
  cache.set(cacheKey, ProjectsFileNames);
  return ProjectsFileNames;
};

// return individual project mdx parse.
export const GetProject = async <T extends { [key: string]: unknown }>(
  name: string,
) => {
  const cacheKey = `project:${name}`;
  const cached = cache.get<{ frontmatter: T; code: string }>(cacheKey);

  if (cached) {
    return cached;
  }

  const _dirname = path.resolve();
  const { frontmatter, code } = await bundleMDX<T>({
    file: _dirname + projectsFolderPath + `/${name}`,
    cwd: process.cwd(),
    mdxOptions(options, frontmatter) {
      options.rehypePlugins = [...(options.rehypePlugins ?? []), rehypeSlug];
      return options;
    },
  });

  const result = { frontmatter, code };
  cache.set(cacheKey, result);
  return result;
};

// blogs

const blogsFolderPath = '/content/Blogs';

// return list of blog file name
export const GetAllBlogNames = () => {
  const cacheKey = 'all-blog-names';
  const cached = cache.get<string[]>(cacheKey);
  if (cached) return cached;

  const _dirname = path.resolve();
  const BlogFileNames = readdirSync(_dirname + blogsFolderPath);
  cache.set(cacheKey, BlogFileNames);
  return BlogFileNames;
};

// return individual blog mdx parse.
export const GetNowBlog = async <T extends { [key: string]: unknown }>() => {
  const cacheKey = `now`;
  const cached = cache.get<{ frontmatter: T; code: string }>(cacheKey);

  if (cached) {
    return cached;
  }

  const _dirname = path.resolve();
  const { frontmatter, code } = await bundleMDX<T>({
    file: _dirname + '/content/Personal/currently.md',
    cwd: process.cwd(),
    mdxOptions(options, frontmatter) {
      options.rehypePlugins = [...(options.rehypePlugins ?? []), rehypeSlug];
      options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkPrism];
      return options;
    },
  });

  const result = { frontmatter, code };
  cache.set(cacheKey, result);
  return result;
};
export const GetBlog = async <T extends { [key: string]: unknown }>(
  name: string,
) => {
  const cacheKey = `blog:${name}`;
  const cached = cache.get<{ frontmatter: T; code: string }>(cacheKey);

  if (cached) {
    return cached;
  }

  const _dirname = path.resolve();
  const { frontmatter, code } = await bundleMDX<T>({
    file: _dirname + blogsFolderPath + `/${name}`,
    cwd: process.cwd(),
    mdxOptions(options, frontmatter) {
      options.rehypePlugins = [...(options.rehypePlugins ?? []), rehypeSlug];
      options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkPrism];
      return options;
    },
  });

  const result = { frontmatter, code };
  cache.set(cacheKey, result);
  return result;
};
