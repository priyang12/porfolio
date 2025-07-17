import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('about', './routes/About.tsx'),
  route('projects', './routes/Projects/Projects.tsx'),
  route('projects/:id', './routes/Projects/SingleProject.tsx'),
] satisfies RouteConfig;
