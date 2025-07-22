import type { Route } from './+types/home';
import { FiGithub, FiTwitter } from 'react-icons/fi';
import { ButtonGroup, TextLink, Truncate } from '@priyang/react-component-lib';
import { Link } from 'react-router';
import { FaToolbox } from 'react-icons/fa';
import { BiNotepad, BiSearch } from 'react-icons/bi';

import { Description, Subtitle, Title } from '../../content/Hero.json';
import { Github, Twitter } from '../../content/Socials.json';
import {
  project as latestProject,
  blog as latestBlog,
  currently,
} from '../../content/latest.json';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Home/' },
    { name: 'description', content: 'This is my Personal portfolio' },
  ];
}

// wireframe
// +--------------------------------------------------+
// | [Hi, I'm Jane Doe]                               |
// | Full-stack dev passionate about great software   |
// | Social                                           |
// | [twitter]  [Github]                              |
// | [View Projects]  [Read Blogs]  [About Me]        |
// +--------------------------------------------------+

// +-------------------+ +------------------+ +------------------+
// | 🔧 Latest Project | | 📝 Latest Blog   | | 🔍 Currently...  |
// | Project title     | | Blog title       | | Learning X...    |
// | Short desc.       | | Short preview    | | Building Y...    |
// | [View Project >]  | | [Read More >]    | | [More >]         |
// +-------------------+ +------------------+ +------------------+

function HeroContainer() {
  return (
    <section className="col-start-2 col-end-12 flex min-h-[100vh] items-center">
      <div className="mx-auto text-center">
        <header className="font-VT323">
          <h1 className="text-primary text-5xl sm:text-7xl">{Title}</h1>
          <h2 className="text-primary my-4 text-3xl sm:text-5xl">
            {Subtitle} 👋
          </h2>
          <p className="text-primary m-auto mt-4 w-[80%] text-xl sm:text-3xl">
            {Description}
          </p>
        </header>
        {/* Socials */}
        <div className="my-4">
          <div className="font-Roboto flex w-[90%] items-center justify-end gap-4">
            <h3 className="my-4">Find Me!</h3>
            <TextLink href={Github}>
              <div className="flex cursor-pointer items-center gap-2 rounded border px-4 py-2 transition hover:text-white">
                <FiGithub className="text-xl" />
                Github
              </div>
            </TextLink>
            <TextLink href={Twitter}>
              <div className="hover:bg-primary flex cursor-pointer items-center gap-2 rounded border px-4 py-2 transition hover:text-white">
                <FiTwitter className="text-xl" />
                Twitter
              </div>
            </TextLink>
          </div>
        </div>
        {/* Links */}
        <ButtonGroup className="mt-8 hidden justify-center border-0 sm:flex">
          <Link
            to={'/projects'}
            reloadDocument
            className="Button Button-primary w-[26%] bg-[var(--primary-800)]"
          >
            <>View Projects</>
          </Link>
          <Link
            to={'/blogs'}
            reloadDocument
            className="Button Button-primary w-[26%] bg-[var(--primary-800)]"
          >
            Read Blogs
          </Link>
          <Link
            to={'/about'}
            reloadDocument
            className="Button Button-primary w-[26%] bg-[var(--primary-800)]"
          >
            About Me
          </Link>
        </ButtonGroup>
      </div>
    </section>
  );
}

const HighlightsPanel = () => {
  const sections = [
    {
      icon: <FaToolbox />,
      action: 'View Project →',
      ...latestProject,
    },
    {
      icon: <BiNotepad />,
      action: 'Read More →',
      ...latestBlog,
    },
    {
      icon: <BiSearch />,
      action: 'More →',
      ...currently,
    },
  ];

  return (
    <section className="col-start-2 col-end-12 min-h-[100vh] w-full">
      <div className="grid grid-cols-1 gap-6 px-4 py-8 sm:grid-cols-2 lg:translate-y-1/3 lg:grid-cols-3">
        {sections.map((section, i) => (
          <div
            key={i}
            className="bg-bg-surface text-text-primary relative h-full rounded-xl border-2 border-solid border-neutral-200 p-6 shadow-md transition-shadow hover:shadow-lg"
          >
            <img
              src={section.img.src}
              alt={section.img.alt}
              className="w-full sm:h-1/2"
              width="600"
              height="400"
              loading="lazy"
            />
            <div className="mb-2 flex items-center gap-2 py-5 text-xl font-medium">
              <span className="text-2xl">{section.icon}</span>
              {section.title}
            </div>
            <h3 className="mb-1 text-lg font-semibold">{section.heading}</h3>
            <Truncate
              as="p"
              lines={3}
              className="text-text-secondary mb-4 text-sm"
            >
              {section.description}
            </Truncate>
            <a
              href={section.link}
              className="text-text-link absolute right-10 bottom-10 inline-block text-sm font-medium hover:underline"
            >
              {section.action}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <div className="grid grid-cols-12 gap-5">
      <HeroContainer />
      <HighlightsPanel />
    </div>
  );
}
