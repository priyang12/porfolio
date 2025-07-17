import { GetProject, GetProjectList } from '~/mdx.server';
import type { Route } from './+types/Projects';
import { useLoaderData } from 'react-router';
import { Button } from '@priyang/react-component-lib';
import ProjectCard from '~/Components/ProductCard/ProductCard';
import type { projectProps } from '~/Components/ProductCard/ProductCard';

export async function loader({ params }: Route.LoaderArgs) {
  const projectList = GetProjectList();
  console.log(projectList);
  const Projects = [];
  // later maybe turn each project card it's own loader.
  for (let filename of projectList) {
    const { frontmatter } = await GetProject(filename);
    Projects.push({
      Data: frontmatter as projectProps,
      filename: filename.split('.')[0],
    });
  }
  return { Projects };
}

const Projects = () => {
  const { Projects } = useLoaderData<typeof loader>();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="grid min-h-screen grid-cols-1 sm:grid-cols-8 lg:grid-cols-12">
      <main className="col-1 my-5 sm:col-start-2 sm:col-end-11">
        <h1 className="mb-5 text-4xl">My Projects</h1>
        <div className="flex flex-col gap-5">
          {Projects.map((item) => (
            <ProjectCard Filename={item.filename} Project={item.Data} />
          ))}
        </div>
      </main>
      <div className="sticky top-0 left-0 col-12 mt-5 h-fit">
        <Button
          variant="info-border"
          className="h-[50px] w-[50px] rounded-full p-1"
          aria-label="Scroll to top"
          onClick={scrollToTop}
        >
          ↑ Top
        </Button>
      </div>
    </div>
  );
};

export default Projects;
