import { readdirSync } from 'fs';
import { bundleMDX } from 'mdx-bundler';
import rehypeSlug from 'rehype-slug';
import path from 'path';

const projectsFolderPath = '/content/Projects';

// get the projects filename names.
export const GetProjectList = () => {
  const _dirname = path.resolve();
  console.log(_dirname);
  const ProjectsFileNames = readdirSync(_dirname + projectsFolderPath);
  return ProjectsFileNames;
};

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
