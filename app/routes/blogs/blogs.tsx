import { useLoaderData, type MetaArgs } from 'react-router';
import { GetAllBlogNames, GetBlog } from '~/Utils/mdx.server';
import BlogCard from '~/Components/BlogComponents/BlogCard';
import Filtering from '~/Components/BlogComponents/Filtering';
import { Pagination, perPage } from '~/Components/BlogComponents/Pagination';
import { filterBlogs } from '~/Utils/filter.client';

import type { Route } from './+types/blogs';

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
// fix meta data passing.
export const meta = ({ data }: MetaArgs<typeof clientLoader>) => {
  return [
    {
      title: '/Blogs',
    },
    { name: 'description', content: data?.totalBlogs },
  ];
};

export const loader = async ({}: Route.LoaderArgs) => {
  const blogsFileNames = GetAllBlogNames();
  const Blogs = [];
  for (let blog of blogsFileNames) {
    const { frontmatter } = await GetBlog<blogPage['frontmatter']>(blog);
    Blogs.push(frontmatter);
  }
  return { Blogs, totalBlogs: Blogs.length };
};
// module-level cache (persists across navigation)
// need to turn into singleton cache.
let cachedBlogs: { Blogs: blogPage['frontmatter'][] } | null = null;

export async function clientLoader({
  serverLoader,
  request,
}: Route.ClientLoaderArgs) {
  if (!cachedBlogs) {
    // call the server loader
    cachedBlogs = await serverLoader();
  }

  let blogs: blogPage['frontmatter'][] = cachedBlogs.Blogs;
  const url = new URL(request.url);
  const query = url.searchParams.get('q');
  const page = url.searchParams.get('page');

  if (query) {
    blogs = filterBlogs(query, cachedBlogs.Blogs);
  }

  const filterBlogsLength = blogs.length;

  if (page) {
    // blogs
    blogs = blogs.slice((Number(page) - 1) * perPage, Number(page) * perPage);
  } else {
    blogs = blogs.slice(0, perPage);
  }

  return {
    page: page,
    query: query,
    Blogs: blogs,
    paginationLength: Math.ceil(filterBlogsLength / perPage),
    totalBlogs: cachedBlogs.Blogs,
  };
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
  const {
    Blogs: blogsData,
    paginationLength,
    page,
  } = useLoaderData<typeof clientLoader>();

  return (
    <div className="grid min-h-screen grid-cols-1 p-5 sm:grid-cols-8 sm:p-0 lg:grid-cols-12">
      <main className="col-1 my-5 flex flex-col gap-5 sm:col-start-2 sm:col-end-8 lg:col-end-11">
        <h1 className="font-VT323 mb-5 text-4xl">My Blogs</h1>
        <Filtering />
        {blogsData.map((item, index) => (
          <BlogCard key={index} blogData={item} />
        ))}
        <Pagination totalPages={paginationLength} />
      </main>
    </div>
  );
}

export default blogs;
