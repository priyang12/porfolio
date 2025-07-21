import React from 'react';
import type { Route } from './+types/currently';
import { GetNowBlog } from '~/Utils/mdx.server';
import { useLoaderData } from 'react-router';
import { getMDXComponent } from 'mdx-bundler/dist/client';
import readTime from '~/Utils/filter';

export const meta = ({}: Route.MetaArgs) => {
  return [
    { title: '/currently' },
    { name: 'description', content: 'what i am up to.' },
  ];
};

export const loader = async ({}: Route.LoaderArgs) => {
  const nowBlog = await GetNowBlog();
  return { nowBlog };
};

function now() {
  const {
    nowBlog: { code },
  } = useLoaderData<typeof loader>();

  const Component = React.useMemo(() => getMDXComponent(code), [code]);
  const totalTime = React.useMemo(() => readTime(code), [code]);

  return (
    <div className="grid min-h-screen grid-cols-12">
      <div className="col-start-3 col-end-9">
        <Component />
      </div>
    </div>
  );
}

export default now;
