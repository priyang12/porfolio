import type { blogPage } from '~/routes/blogs/blogs';

// Match behavior:
// Title: partial (case-insensitive) match
// Meta keywords: exact match (string array)
// Categories: exact match (string array)

export const filterBlogs = (
  query: string,
  blogs: blogPage['frontmatter'][],
): blogPage['frontmatter'][] => {
  // get names array
  const queries = query
    .split(',')
    .map((q) => q.trim().toLowerCase())
    .filter(Boolean); // remove empty strings

  return blogs.filter((item) => {
    const title = item.title.toLowerCase();
    const keywords = item.meta?.keywords?.map((k) => k.toLowerCase()) ?? [];
    const categories = item.categories?.map((c) => c.toLowerCase()) ?? [];

    return queries.some(
      (q) =>
        title.includes(q) || keywords.includes(q) || categories.includes(q),
    );
  });
};
