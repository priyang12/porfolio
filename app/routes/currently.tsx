import React from 'react';
import type { Route } from './+types/currently';
import { GetNowBlog } from '~/Utils/mdx.server';
import { useLoaderData } from 'react-router';
import { getMDXComponent } from 'mdx-bundler/dist/client';

// export const meta = ({}: Route.MetaArgs) => {
//   return [
//     { title: '/currently' },
//     { name: 'description', content: 'what i am up to.' },
//   ];
// };

export const loader = async ({}: Route.LoaderArgs) => {
  const nowBlog = await GetNowBlog();
  return { nowBlog };
};

export const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-6xl" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="my-5 text-5xl" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-primary-400 my-5 text-4xl" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="py-2 text-lg leading-normal text-neutral-300 sm:px-5"
      {...props}
    />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a {...props} />,
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => <pre {...props} />,
  code: (props: React.HTMLAttributes<HTMLElement>) => <code {...props} />,
  strong: (props: React.HTMLAttributes<HTMLElement>) => <strong {...props} />,
  em: (props: React.HTMLAttributes<HTMLElement>) => <em {...props} />,
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => <hr {...props} />,
};

function now() {
  const {
    nowBlog: { code },
  } = useLoaderData<typeof loader>();
  const Component = React.useMemo(() => getMDXComponent(code), []);

  return (
    <div className="grid min-h-screen grid-cols-1 p-5 sm:p-0 md:grid-cols-8 lg:grid-cols-12">
      <div className="col-start-2 col-end-8 my-5 lg:col-start-3 lg:col-end-10">
        <Component components={mdxComponents} />
      </div>
    </div>
  );
}

export default now;
