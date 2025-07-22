import { Button, Ring, Tag, Truncate } from '@priyang/react-component-lib';
import { Link, useNavigate } from 'react-router';
import type { blogPage } from '~/routes/blogs/blogs';

// +-----------------------------+
// | 🖼 Cover Image              |
// | Blog Title |
// | Short preview (2 lines) |
// | Tags: [JS] [WebDev] |
// | Date • [Read More >] |
// +-----------------------------+

function BlogCard({ blogData }: { blogData: blogPage['frontmatter'] }) {
  const navigate = useNavigate();

  const goToBlog = (e: React.BaseSyntheticEvent) => {
    if ('key' in e) {
      if (e.key === 'Enter') {
        navigate(`/blogs/${blogData.FileName}`);
      }
    } else {
      navigate(`/blogs/${blogData.FileName}`);
    }
  };

  return (
    <article className="bg-bg-surface blogCard rounded-lg border p-6 shadow-md transition-shadow duration-300 hover:shadow-lg xl:grid">
      {/* Cover image */}
      <img
        src={blogData.ImageURL}
        alt={blogData.title + 'Cover Image'}
        className="image rounded-2xl"
        // this is same ratio as img src of picsum.
        // later switch with lib component on newer version.
        width="600"
        height="400"
        loading="lazy"
      />
      {/* Title */}
      <h1 className="text-primary-300 title mb-2 text-2xl font-semibold">
        {blogData.title}
      </h1>

      {/* Short preview */}
      {blogData.description && (
        <Truncate
          as="p"
          className="preview my-3 text-neutral-300 xl:-mt-22"
          lines={3}
        >
          {blogData.description}
        </Truncate>
      )}

      {/* Tags */}
      <div className="tags flex flex-wrap gap-3">
        {blogData.meta
          ? blogData.meta.keywords?.map((item) => (
              <Tag color={'var(--primary-800)'} className="h-1/2" key={item}>
                {item}
              </Tag>
            ))
          : null}
      </div>

      {/* Date and navigation */}
      <div className="col-span-2 mt-5 flex items-center justify-between">
        {blogData.date && (
          <time className="font-mono text-xl font-light text-neutral-300">
            {new Date(blogData.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </time>
        )}
        <Ring
          // fixed in newer version.
          ringColor="var(--primary-300)"
          className="rounded-xl"
          asChild={true}
        >
          <Button
            role="link"
            onClick={goToBlog}
            onKeyDown={goToBlog}
            className="bg-primary-800"
          >
            Read More
          </Button>
        </Ring>
      </div>
    </article>
  );
}

export default BlogCard;
