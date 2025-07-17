import type { Route } from './+types/home';
import { Description, Subtitle, Title } from '../../content/Hero.json';
import { Github, Twitter } from '../../content/Socials.json';
import { FiGithub, FiTwitter } from 'react-icons/fi';
import { ButtonGroup, TextLink } from '@priyang/react-component-lib';
import { Link } from 'react-router';
import { FaToolbox } from 'react-icons/fa';
import { BiNotepad, BiSearch } from 'react-icons/bi';

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
            className="Button Button-primary w-[26%] bg-[var(--primary-800)]"
          >
            <>View Projects</>
          </Link>
          <Link
            to={'/blogs'}
            className="Button Button-primary w-[26%] bg-[var(--primary-800)]"
          >
            Read Blogs
          </Link>
          <Link
            to={'/about'}
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
      img: {
        src: 'https://picsum.photos/600/400?image=1080',
        alt: 'Project code screenshot',
      },
      title: 'Latest Project',
      heading: 'Design System Builder',
      description:
        'A Figma-like tool to visually build your own Tailwind design system. ',
      action: 'View Project →',
      link: '/projects/latest',
    },
    {
      icon: <BiNotepad />,
      img: {
        src: 'https://picsum.photos/600/400?image=1081',
        alt: 'Blog workspace',
      },
      title: 'Latest Blog',
      heading: 'How I Migrated to Vite',
      description:
        'A breakdown of switching from CRA to Vite for blazing-fast dev experience. A breakdown of switching from CRA to Vite for blazing-fast dev experience.',
      action: 'Read More →',
      link: '/blog/latest',
    },
    {
      icon: <BiSearch />,
      img: {
        src: 'https://picsum.photos/600/400?image=1082',
        alt: 'Learning Image',
      },
      title: 'Currently...',
      heading: 'Exploring Astro',
      description:
        'Learning how Astro combines performance and developer experience.',
      action: 'More →',
      link: '/now',
    },
  ];

  return (
    <section className="col-start-2 col-end-12 min-h-[100vh] w-full">
      <div className="grid gap-6 px-4 py-8 sm:translate-y-1/3 md:grid-cols-3">
        {sections.map((section, i) => (
          <div
            key={i}
            className="bg-bg-surface text-text-primary relative h-full rounded-xl border border-neutral-800 p-6 shadow-md transition-shadow hover:shadow-lg"
          >
            <img src={section.img.src} alt={section.img.alt} />
            <div className="mb-2 flex items-center gap-2 text-xl font-medium">
              <span className="text-2xl">{section.icon}</span>
              {section.title}
            </div>
            <h3 className="mb-1 text-lg font-semibold">{section.heading}</h3>
            <p className="text-text-secondary mb-4 text-sm">
              {section.description}
            </p>
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
