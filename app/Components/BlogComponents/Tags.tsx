import { Tag } from '@priyang/react-component-lib';
import { useSearchParams } from 'react-router';
import TagJson from '../../../content/Tags.json';
import clsx from 'clsx';

function Tags() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';
  const selectedTags = query
    .split(',')
    .map((q) => q.trim().toLowerCase())
    .filter(Boolean); // remove empty strings

  const toggleTag = (tag: string) => {
    const tagSlug = tag.toLowerCase();
    let updatedTags: string[];

    if (selectedTags.includes(tagSlug)) {
      // Remove tag
      updatedTags = selectedTags.filter((t) => t !== tagSlug);
    } else {
      // Add tag
      updatedTags = [...selectedTags, tagSlug];
    }

    const newParams = new URLSearchParams(searchParams);
    if (updatedTags.length > 0) {
      newParams.set('q', updatedTags.join(','));
      newParams.set('page', '1'); // optionally reset page
    } else {
      newParams.delete('q');
    }

    setSearchParams(newParams);
  };

  return (
    <div className="col-5 flex flex-wrap gap-5 md:w-1/2">
      {TagJson.map((item) => (
        <Tag
          key={item.slug || item.name}
          onClick={() => toggleTag(item.name)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') toggleTag(item.name);
          }}
          tabIndex={0}
          color={''}
          className={clsx(
            'focus-visible:ring-accent-500 cursor-pointer focus:outline-none focus-visible:ring-4',
            {
              'border-bg-default outline-accent-500 focus-visible:ring-primary-500 cursor-pointer border-8 outline-4 outline-solid focus:outline-none focus-visible:ring-4':
                selectedTags.includes(item.name.toLowerCase()),
            },
          )}
        >
          {item.name}
        </Tag>
      ))}
    </div>
  );
}

export default Tags;
