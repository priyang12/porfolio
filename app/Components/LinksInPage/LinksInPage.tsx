import { TextLink } from '@priyang/react-component-lib';
import React, { useEffect, useState } from 'react';

function LinksInPage({
  elementID,
  ...props
}: { elementID: string } & React.ComponentPropsWithoutRef<'section'>) {
  const [links, setLinks] = useState<{ linkText: string; linkHref: string }[]>(
    [],
  );
  useEffect(() => {
    const elements = document.getElementById(elementID)?.querySelectorAll('a');
    const pageLinks: typeof links = [];
    elements?.forEach((item) =>
      pageLinks.push({
        linkText: item.textContent ?? item.href,
        linkHref: item.href,
      }),
    );
    setLinks(pageLinks);
  }, []);
  return (
    <section aria-labelledby="links-heading" {...props}>
      <h2 className="text-primary-500 text-3xl">Links : </h2>
      <ul className="flex flex-wrap gap-5 overflow-x-scroll">
        {links.length > 0
          ? links.map((item) => (
              <li className="my-3 text-xl">
                <TextLink
                  tabIndex={0}
                  key={item.linkHref}
                  href={item.linkHref}
                  className="text-neutral-200"
                >
                  <span className="text-accent-600">[{item.linkText}]</span>
                  &nbsp;:&nbsp;
                  <span>[{item.linkHref}]</span>
                </TextLink>
              </li>
            ))
          : null}
      </ul>
    </section>
  );
}

export default LinksInPage;
