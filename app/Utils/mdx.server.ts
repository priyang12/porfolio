import { readdirSync } from 'fs';
import { bundleMDX } from 'mdx-bundler';
import rehypeSlug from 'rehype-slug';
import rehypePrism from 'rehype-prism-plus';
import path from 'path';

const projectsFolderPath = '/content/Projects';

// get the projects filename names.
export const GetProjectList = () => {
  const _dirname = path.resolve();
  const ProjectsFileNames = readdirSync(_dirname + projectsFolderPath);
  return ProjectsFileNames;
};

// return individual project mdx parse.
export const GetProject = async <T extends { [key: string]: unknown }>(
  name: string,
) => {
  const _dirname = path.resolve();
  const { frontmatter, code } = await bundleMDX<T>({
    file: _dirname + projectsFolderPath + `/${name}`,
    cwd: process.cwd(),
    mdxOptions(options, frontmatter) {
      options.rehypePlugins = [...(options.rehypePlugins ?? []), rehypeSlug];
      return options;
    },
  });
  return { frontmatter, code };
};

// blogs

const blogsFolderPath = '/content/Blogs';

// return list of blog file name
export const GetAllBlogNames = () => {
  const _dirname = path.resolve();
  const BlogFileNames = readdirSync(_dirname + blogsFolderPath);
  return BlogFileNames;
};

// return individual blog mdx parse.

export const GetBlog = async <T extends { [key: string]: unknown }>(
  name: string,
) => {
  const _dirname = path.resolve();
  const { frontmatter, code } = await bundleMDX<T>({
    file: _dirname + blogsFolderPath + `/${name}`,
    cwd: process.cwd(),
    mdxOptions(options, frontmatter) {
      options.rehypePlugins = [...(options.rehypePlugins ?? []), rehypeSlug];
      options.remarkPlugins = [...(options.remarkPlugins ?? []), rehypePrism];
      return options;
    },
  });
  return { frontmatter, code };
};
