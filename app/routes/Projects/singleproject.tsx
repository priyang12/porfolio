import { useMemo } from 'react';
import type { Route } from './+types/singleproject';
import { redirect, useLoaderData, type MetaArgs } from 'react-router';
import { getMDXComponent } from 'mdx-bundler/client';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import { TextLink } from '@priyang/react-component-lib';
import { GetProject } from '~/Utils/mdx.server';
import { tableComponents } from '~/Components/MDXComponents/tableComponent';

export type LoaderData = {
  Title: string;
  Description: string;
  TechName: string;
  Technologies: string[];
  GithubLink: string;
  ProjectLink: string;
  Image: string;
  Video: string;
};

export const meta = ({ data }: MetaArgs<typeof loader>) => {
  // @ts-ignore
  const { frontmatter } = data;

  return [
    { title: '/' + frontmatter.Title },
    { name: 'description', content: frontmatter.Description },
  ];
};

export const loader = async ({ params }: Route.LoaderArgs) => {
  const { id } = params;

  if (!id) return redirect('/projects');
  try {
    const { code, frontmatter } = await GetProject<LoaderData>(`${id}.mdx`);

    return { frontmatter, code };
  } catch (error) {
    return redirect('/projects');
  }
};

const mdxComponents = {
  h1: (props: any) => (
    <h1 className="text-primary-500 text-4xl font-bold" {...props} />
  ),
  h2: (props: any) => (
    <h1 className="text-primary-400 text-3xl font-bold" {...props} />
  ),
  h3: (props: any) => (
    <h1 className="text-primary-300 text-xl font-bold" {...props} />
  ),
  p: (props: any) => (
    <p className="my-4 text-base leading-relaxed text-neutral-300" {...props} />
  ),
  code: (props: any) => (
    <code className="rounded bg-gray-100 px-2 py-1 text-sm" {...props} />
  ),
  a: (props: any) => <a className="text-blue-600 hover:underline" {...props} />,
  ul: (props: any) => (
    <ul className="list-inside space-y-2 text-neutral-100" {...props} />
  ),
  li: (props: any) => (
    <li className="ml-5 text-base leading-relaxed" {...props} />
  ),
  hr: (props: any) => <hr className="my-5" {...props} />,
  strong: (props: any) => <strong className="text-accent-400" {...props} />,
  ...tableComponents,
};

export default function Project() {
  const { frontmatter, code } = useLoaderData<typeof loader>();
  const Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <div
      className="mb-10 grid grid-cols-1 p-5 sm:grid-cols-5 sm:p-0 md:grid-cols-8 lg:grid-cols-12"
      id="Project"
    >
      {/* Title & GitHub Link */}
      <div className="col-start-1 col-end-8 my-5 flex items-center gap-4 sm:col-start-2 sm:items-center sm:justify-between lg:col-end-12">
        <h1 className="text-2xl font-bold sm:text-4xl md:text-6xl">
          {frontmatter.Title}
        </h1>
        <a
          href={frontmatter.GithubLink}
          target="_blank"
          className="Button bg-primary-700 flex h-fit w-fit gap-5"
          rel="noreferrer"
          aria-label="View source code on GitHub"
        >
          <FiGithub size={24} />
          <span className="hidden sm:inline">GitHub</span>
        </a>
      </div>

      {/* Video Preview */}
      <div className="col-start-1 col-end-8 flex items-center gap-4 sm:col-start-2 sm:items-center sm:justify-between lg:col-end-12">
        <video
          className="w-full max-w-5xl rounded-xl shadow-lg"
          poster={frontmatter.Image}
          controls
          preload="none"
        >
          <source src={frontmatter.Video} />
          Your browser does not support the <code>&lt;video&gt;</code> tag.
        </video>
      </div>

      {/* Client Link Section */}
      <div className="col-span-12 my-5 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <h2 className="text-2xl font-semibold">Deployment</h2>
        <TextLink
          href={frontmatter.ProjectLink}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 hover:text-white"
        >
          <span>Link</span>
          <FiExternalLink />
        </TextLink>
      </div>

      {/* MDX Content */}
      <article className="col-start-1 col-end-8 flex items-center gap-4 sm:col-start-2 sm:items-center sm:justify-between lg:col-end-12">
        <div>
          <Component components={mdxComponents} />
        </div>
      </article>
    </div>
  );
}
