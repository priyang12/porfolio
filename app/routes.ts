import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('currently', './routes/currently.tsx'),
  route('about', './routes/about.tsx'),
  route('projects', './routes/projects/projects.tsx'),
  route('projects/:id', './routes/projects/singleproject.tsx'),
  route('blogs', './routes/blogs/blogs.tsx'),
  route('blogs/:title', './routes/blogs/singleBlog.tsx'),
  route('/robots.txt', './resources/robots[.]txt.tsx'),
  route('/sitemap.xml', './resources/sitemap[.]xml.tsx'),
  route('/VideoSitemmap.xml', './resources/VideoSitemmap[.]xml.tsx'),
  route('/imageSitemmap.xml', './resources/imageSitemmap[.]xml.tsx'),
  route('*', './routes/notFound.tsx'),
] satisfies RouteConfig;
