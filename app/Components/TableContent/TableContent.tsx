import type React from 'react';
import { useHeadings } from './useHeadings';
import clsx from 'clsx';

function TableContent({
  className,
  children,
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
      <h1 className="text-accent-600 text-2xl">Sections</h1>
      {headings.length > 0 &&
        headings.map((heading) => (
          <li
            className="text-primary-300 md:my-1 md:text-xl"
            key={heading.id}
            style={{
              marginLeft: `${heading.level - 2}em`,
            }}
          >
            <a href={`#${heading.id}`}>{heading.text}</a>
          </li>
        ))}
      {children}
    </ul>
  );
}

export default TableContent;
