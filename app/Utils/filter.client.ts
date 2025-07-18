import type { blogPage } from '~/routes/blogs/blogs';

// Match behavior:
// Title: partial (case-insensitive) match
// Meta keywords: exact match (string array)
// Categories: exact match (string array)

export const filterBlogs = (
  query: string,
  blogs: blogPage['frontmatter'][],
) => {
  const trimmedQuery = query.trim().toLowerCase();

  return blogs.filter((item) => {
    const titleMatch = item.title.toLowerCase().includes(trimmedQuery);

    const keywordMatch = item.meta?.keywords?.some(
      (kw) => kw.toLowerCase() === trimmedQuery,
    );

    const categoryMatch = item.categories?.some(
      (cat) => cat.toLowerCase() === trimmedQuery,
    );

    return titleMatch || keywordMatch || categoryMatch;
  });
};
