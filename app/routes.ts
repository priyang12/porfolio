import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('about', './routes/about.tsx'),
  route('projects', './routes/projects/projects.tsx'),
  route('projects/:id', './routes/projects/singleproject.tsx'),
  route('blogs', './routes/blogs/blogs.tsx'),
  route('blogs/:title', './routes/blogs/singleBlog.tsx'),
] satisfies RouteConfig;
