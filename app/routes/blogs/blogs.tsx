import { useLoaderData, type MetaArgs } from 'react-router';
import { GetAllBlogNames, GetBlog } from '~/Utils/mdx.server';
import type { Route } from './+types/blogs';
import BlogCard from '~/Components/BlogComponents/BlogCard';
import Filtering from '~/Components/BlogComponents/Filtering';
import { useState } from 'react';
import { filterBlogs } from '~/Utils/filter.client';

export type blogPage = {
  code: string;
  frontmatter: {
    archived?: boolean;
    draft?: boolean;
    title: string;
    description?: string;
    meta?: {
      keywords?: Array<string>;
      [key: string]: unknown;
    };
    categories?: Array<string>;
    date?: string;
    ImageURL: string;
    socialImageTitle?: string;
    socialImagePreTitle?: string;
  };
};
export const meta = ({ data }: MetaArgs<typeof loader>) => {
  return [
    { title: '/Blogs : ' + data?.Blogs.length },
    { name: 'description', content: data?.Blogs.length },
  ];
};

export const loader = async ({}: Route.LoaderArgs) => {
  const blogsFileNames = GetAllBlogNames();
  const Blogs = [];
  for (let blog of blogsFileNames) {
    const { frontmatter } = await GetBlog<blogPage['frontmatter']>(blog);
    Blogs.push(frontmatter);
  }
  return { Blogs };
};
// module-level cache (persists across navigation)
let cachedBlogs: { Blogs: blogPage['frontmatter'][] } | null = null;

export async function clientLoader({
  serverLoader,
  request,
  params,
}: Route.ClientLoaderArgs) {
  if (!cachedBlogs) {
    // call the server loader
    // @ts-ignore
    cachedBlogs = await serverLoader();
  }

  const url = new URL(request.url);
  const query = url.searchParams.get('q');

  if (query) {
    const filteredBlogs = filterBlogs(query, cachedBlogs.Blogs);
    return { Blogs: filteredBlogs };
  }

  return cachedBlogs;
}

// +--------------------------------------------------+
// | 🔍 [ Search posts...                   ]         |
// +--------------------------------------------------+
// | 🏷 Tags: [JS] [React] [CSS] [All]                |
// +--------------------------------------------------+
// +-----------------------------+
// | 🖼 Cover Image (optional)   |
// | Blog Title                 |
// | Short preview (2 lines)    |
// | Tags: [JS] [WebDev]        |
// | Date • [Read More >]       |
// +-----------------------------+
// (repeat for visible posts on this page...)
// +-----------------------------+
// | ◀ 1  2  3  ▶                |
// +-----------------------------+

function blogs() {
  const { Blogs } = useLoaderData<typeof loader>();

  return (
    <div className="grid min-h-screen grid-cols-1 p-5 sm:grid-cols-8 sm:p-0 lg:grid-cols-12">
      <main className="col-1 my-5 flex flex-col gap-5 sm:col-start-2 sm:col-end-8 lg:col-end-11">
        <h1 className="font-VT323 mb-5 text-4xl">My Blogs</h1>
        <Filtering />
        {[...Blogs, ...Blogs, ...Blogs].map((item, index) => (
          <BlogCard key={index} blogData={item} />
        ))}
      </main>
    </div>
  );
}

export default blogs;
