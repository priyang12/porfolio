import { DomainName } from '~/Utils/DomainName';

export const loader = async () => {
  // need to generate this on build time.
  const content = `
  <urlset
        xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
              http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  <url>
    <loc>${DomainName}/</loc>
    <lastmod>2023-01-29T13:29:52+00:00</lastmod>
    <priority>1.00</priority>
  </url>
  <url>
    <loc>${DomainName}/Projects</loc>
    <lastmod>2023-01-29T13:29:52+00:00</lastmod>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>${DomainName}/Blogs</loc>
    <lastmod>2023-01-29T13:29:52+00:00</lastmod>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>${DomainName}/FunZone</loc>
    <lastmod>2023-01-29T13:29:52+00:00</lastmod>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>${DomainName}/AboutMe</loc>
    <lastmod>2023-01-29T13:29:52+00:00</lastmod>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>${DomainName}/projects</loc>
    <lastmod>2023-01-29T13:29:52+00:00</lastmod>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>${DomainName}/Projects/DevDairy</loc>
    <lastmod>2023-01-29T13:29:52+00:00</lastmod>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>${DomainName}/Projects/Ecommerce</loc>
    <lastmod>2023-01-29T13:29:52+00:00</lastmod>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>${DomainName}/Projects/ReactLib</loc>
    <lastmod>2023-01-29T13:29:52+00:00</lastmod>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>${DomainName}/projects/DevDairy</loc>
    <lastmod>2023-01-29T13:29:52+00:00</lastmod>
    <priority>0.64</priority>
  </url>
  <url>
    <loc>${DomainName}/projects/Ecommerce</loc>
    <lastmod>2023-01-29T13:29:52+00:00</lastmod>
    <priority>0.64</priority>
  </url>
  <url>
    <loc>${DomainName}/projects/ReactLib</loc>
    <lastmod>2023-01-29T13:29:52+00:00</lastmod>
    <priority>0.64</priority>
  </url>
  <url>
    <loc>${DomainName}/Blogs/Background-and-gradient-blog</loc>
    <lastmod>2023-01-29T13:29:52+00:00</lastmod>
    <priority>0.64</priority>
  </url>
  <url>
    <loc>${DomainName}/Blogs/Background</loc>
    <lastmod>2023-01-29T13:29:52+00:00</lastmod>
    <priority>0.64</priority>
  </url>
  </urlset>
    `;

  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'xml-version': '1.0',
      encoding: 'UTF-8',
    },
  });
};
