import React from 'react';
import { redirect, useLoaderData, type MetaArgs } from 'react-router';
import type { Route } from './+types/singleBlog';
import { GetBlog } from '~/Utils/mdx.server';
import type { blogPage } from './blogs';
import { getMDXComponent } from 'mdx-bundler/dist/client';
import readTime from '~/Utils/filter.client';

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

function singleBlog() {
  const { frontmatter, code } = useLoaderData<typeof loader>();
  const Component = React.useMemo(() => getMDXComponent(code), [code]);
  const totalTime = React.useMemo(() => readTime(code), [code]);

  return (
    <div className="my-xl md:mx-2xl" id="Blog">
      <figure>
        <img
          src={frontmatter.ImageURL}
          loading="lazy"
          alt="Album"
          className="rounded-xl"
        />
      </figure>
      <div className="my-sm mx-md flex flex-col gap-5">
        <h1 className="text-primary text-6xl font-bold">{frontmatter.title}</h1>
        <h2 className="text-2xl">
          Total Read Time :
          <span className="text-secondary font-bold">{totalTime} Mins</span>
        </h2>
      </div>

      <article className="">
        <Component />
      </article>
    </div>
  );
}

export default singleBlog;
