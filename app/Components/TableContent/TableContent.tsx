import type React from 'react';
import { useHeadings } from './useHeadings';
import clsx from 'clsx';

function TableContent({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'ul'>) {
  const { headings } = useHeadings();
  return (
    <ul
      className={clsx(
        'glass-container sticky top-0 left-0 h-fit flex-col justify-center',
        className,
      )}
      {...props}
    >
      {headings.length > 0 &&
        headings.map((heading) => (
          <li
            className="md:my-1 md:text-xl"
            key={heading.id}
            style={{
              marginLeft: `${heading.level - 2}em`,
            }}
          >
            <a href={`#${heading.id}`}>{heading.text}</a>
          </li>
        ))}
    </ul>
  );
}

export default TableContent;
