import { Link, useNavigate } from 'react-router';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import { Truncate } from '@priyang/react-component-lib';
import type { projectProps } from '~/routes/projects/projects';

const ProjectCard = ({
  Project,
  Filename,
}: {
  Project: projectProps;
  Filename: string;
}) => {
  const navigate = useNavigate();
  const { Title, Description, TechName, ProjectLink, GithubLink, Image } =
    Project;

  return (
    <>
      <article
        className="glass-container gap-xl col-span-12 flex flex-col p-5 md:flex-row"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter') navigate(`/projects/${Filename}`);
        }}
      >
        <div className="card border-secondary bg-base-100 lg:card-side border-2 border-solid shadow-xl md:order-2">
          <Link to={`/projects/${Filename}`} className="h-full">
            <figure className="full w-full align-top">
              <img
                src={Image}
                alt={Title + ' Image'}
                className="h-full w-full rounded-md p-5"
              />
            </figure>
          </Link>
          <div className="card-body w-full">
            <div className="flex items-center justify-between">
              <h1 className="text-primary text-2xl">{Title}</h1>
            </div>
            <Truncate lines={3}>{Description}</Truncate>
            <div className="my-2 flex gap-5">
              <a
                href={ProjectLink}
                target="_blank"
                aria-label={`${Title} Project Link`}
                className="Button bg-primary-800 hover:text-white"
                rel="noreferrer"
              >
                <FiExternalLink />
              </a>
              <a
                href={GithubLink}
                target="_blank"
                aria-label={`${Title} Github Link`}
                className="Button bg-primary-300 hover:text-white"
                rel="noreferrer"
              >
                <FiGithub />
              </a>
              <Link
                className="Button ml-sm truncate bg-gray-500"
                to={`/projects/${Filename}`}
              >
                Learn more about
              </Link>
            </div>
          </div>
        </div>
        <div className="rounded-xl pt-4 pl-5 text-center text-2xl sm:pt-0 md:order-1 md:rotate-180 md:text-4xl md:[writing-mode:vertical-lr]">
          <span className="">{TechName}</span>
        </div>
      </article>
    </>
  );
};

export default ProjectCard;
