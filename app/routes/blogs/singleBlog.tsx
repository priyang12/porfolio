import React from 'react';
import clsx from 'clsx';
import { redirect, useLoaderData, type MetaArgs } from 'react-router';
import { GetBlog } from '~/Utils/mdx.server';
import { getMDXComponent } from 'mdx-bundler/dist/client';
import readTime from '~/Utils/filter';

import type { Route } from './+types/singleBlog';
import type { blogPage } from './blogs';
import type { MDXComponents } from 'mdx/types';
import TableContent from '~/Components/TableContent/TableContent';

export const meta = ({ data }: MetaArgs<typeof loader>) => {
  // @ts-ignore
  const { frontmatter } = data;

  return [
    { title: '/' + frontmatter.title },
    { name: 'description', content: frontmatter.Description },
  ];
};

export const loader = async ({ params }: Route.LoaderArgs) => {
  const { title } = params;
  if (!title) return redirect('/blogs');
  try {
    const { frontmatter, code } = await GetBlog<blogPage['frontmatter']>(
      `${title}`,
    );

    return { frontmatter, code };
  } catch (error) {
    return redirect('/blogs');
  }
};

export const mdxComponents: MDXComponents = {
  h1: (props) => (
    <h1
      className="mt-10 mb-6 text-4xl font-bold tracking-tight text-gray-900 dark:text-white"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="mt-10 mb-5 text-3xl font-semibold tracking-tight text-gray-800 dark:text-gray-200"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mt-8 mb-4 text-2xl font-semibold text-gray-800 dark:text-gray-300"
      {...props}
    />
  ),
  p: (props) => (
    <p
      className="my-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300"
      {...props}
    />
  ),
  a: (props) => (
    <a
      className="text-blue-600 underline-offset-2 hover:underline dark:text-blue-400"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  ul: (props) => <ul className="my-4 list-inside list-disc pl-4" {...props} />,
  ol: (props) => (
    <ol className="my-4 list-inside list-decimal pl-4" {...props} />
  ),
  li: (props) => <li className="mb-1" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="my-6 border-l-4 border-gray-400 pl-4 text-gray-600 italic dark:border-gray-600 dark:text-gray-400"
      {...props}
    />
  ),
  code: ({ className, ...props }) => (
    <code
      className={clsx(
        'rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm dark:bg-gray-800',
        className,
      )}
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="my-6 overflow-x-auto rounded-lg bg-gray-800 p-4 text-sm text-gray-100"
      {...props}
    />
  ),
  img: (props) => (
    <img
      className="my-6 rounded-lg shadow-md"
      loading="lazy"
      alt={props.alt || ''}
      {...props}
    />
  ),
  hr: () => <hr className="my-8 border-gray-300 dark:border-gray-700" />,
};

function singleBlog() {
  const { frontmatter, code } = useLoaderData<typeof loader>();
  const Component = React.useMemo(() => getMDXComponent(code), [code]);
  const totalTime = React.useMemo(() => readTime(code), [code]);

  return (
    <div
      className="grid min-h-screen grid-cols-4 p-5 md:grid-cols-12"
      id="Blog"
    >
      <figure className="col-start-3 col-end-8">
        <img
          src={frontmatter.ImageURL}
          loading="lazy"
          alt="Album"
          className="rounded-xl"
        />
      </figure>
      <div className="col-start-8 col-end-11 ml-5 flex h-full flex-col">
        <h1 className="text-primary text-6xl font-bold">{frontmatter.title}</h1>
        <h2 className="mt-10 text-2xl">
          Total <br /> Read Time :
          <span className="text-primary-200 font-bold">{totalTime} Mins</span>
        </h2>
      </div>
      <TableContent className="col-span-12 p-5 sm:col-span-2 sm:col-start-11 sm:row-start-2" />
      <article className="col-start-3 col-end-11 mt-5">
        <Component components={mdxComponents} />
      </article>
    </div>
  );
}

export default singleBlog;
