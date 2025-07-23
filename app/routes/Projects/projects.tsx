import type { Route } from './+types/projects';
import { useLoaderData, type MetaArgs } from 'react-router';
import { Button } from '@priyang/react-component-lib';
import ProjectCard from '~/Components/ProductComponents/ProductCard';
import { GetProject, GetProjectList } from '~/Utils/mdx.server';
import Filter from '~/Components/ProductComponents/Filter';
import { memo, useCallback, useState } from 'react';

export const meta = ({ data }: MetaArgs<typeof loader>) => {
  return [
    { title: '/Projects : ' + data?.Projects.length },
    { name: 'description', content: data?.Projects.length },
  ];
};

export type projectProps = {
  Title: string;
  Description: string;
  TechName: string;
  GithubLink: string;
  ProjectLink: string;
  Image: string;
  Date: string;
};

export async function loader({}: Route.LoaderArgs) {
  const projectList = GetProjectList();
  const Projects = [];
  // later maybe turn each project card it's own loader.
  for (let filename of projectList) {
    const { frontmatter } = await GetProject<projectProps>(filename);
    Projects.push({
      Data: frontmatter as projectProps,
      filename: filename.split('.')[0],
    });
  }
  return { Projects };
}

export type sortState = 'ascending' | 'descending' | 'none';
const useProjectsData = () => {
  const { Projects } = useLoaderData<typeof loader>();
  const [projects, setProjects] = useState(
    [...Projects].sort((a, b) => {
      // descending by default
      const aDate = new Date(a.Data.Date).getTime();
      const bDate = new Date(b.Data.Date).getTime();
      return bDate - aDate;
    }),
  );

  const filterList = useCallback(
    (name: string) => {
      if (!name) setProjects(Projects);
      setProjects((state) =>
        state.filter(
          (item) =>
            item.Data.Title.toLowerCase().includes(name.toLowerCase()) ||
            item.Data.Description.toLowerCase().includes(name.toLowerCase()),
        ),
      );
    },
    [setProjects],
  );

  const sortProjects = useCallback(
    (action: sortState) => {
      if (action === 'none') {
        // Reset to original order
        // need to add filtering later since filer state will be lost
        setProjects(Projects);
        return;
      }

      // sort based on Time
      const sorted = [...Projects].sort((a, b) => {
        const aDate = new Date(a.Data.Date).getTime();
        const bDate = new Date(b.Data.Date).getTime();

        return action === 'ascending' ? aDate - bDate : bDate - aDate;
      });

      setProjects(sorted);
    },
    [setProjects, Projects],
  );

  return { projects, filterList, sortProjects };
};

const MemoProjectCard = memo(ProjectCard);
const MemoFilter = memo(Filter);

const Projects = () => {
  const { projects, filterList, sortProjects } = useProjectsData();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="grid min-h-screen grid-cols-1 p-5 sm:grid-cols-8 sm:p-0 lg:grid-cols-12">
      <main className="col-1 my-5 sm:col-start-2 sm:col-end-11">
        <h1 className="font-VT323 mb-5 text-4xl">My Projects</h1>
        <MemoFilter filterList={filterList} sortProjects={sortProjects} />
        <div className="flex flex-col gap-5">
          {projects.map((item) => (
            <MemoProjectCard
              key={item.filename}
              Filename={item.filename}
              Project={item.Data}
            />
          ))}
        </div>
      </main>
      <div
        className="top-0 left-0 col-1 m-auto h-fit sm:mt-5 md:sticky md:col-12"
        tabIndex={0}
      >
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
