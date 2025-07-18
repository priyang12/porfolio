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

// make a time calculation fn
// 275 words per minute reading speed (average)
// Count Words and Images
// Each image is considered worth 4 words, subtracted from total

export default function readTime(content: string) {
  const WPS = 275 / 60;

  let images = 0;
  const regex = /\w/;

  let words = content.split(' ').filter((word) => {
    if (word.includes('<img')) {
      images += 1;
    }
    return regex.test(word);
  }).length;

  const imageAdjust = images * 4;
  let imageSecs = 0;
  let imageFactor = 12;

  while (images) {
    imageSecs += imageFactor;
    if (imageFactor > 3) {
      imageFactor -= 1;
    }
    images -= 1;
  }

  const minutes = Math.ceil(((words - imageAdjust) / WPS + imageSecs) / 60);

  return minutes;
}
