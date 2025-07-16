import type { Route } from './+types/home';
import { Description, Subtitle, Title } from '../../content/Hero.json';
import { Github, Twitter } from '../../content/Socials.json';
import { FiGithub, FiTwitter } from 'react-icons/fi';
import { ButtonGroup, TextLink } from '@priyang/react-component-lib';
import { Link } from 'react-router';

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

const HeroContainer = () => {
  const sd = { ads: 'asdasd' };
  return (
    <section className="col-start-2 col-end-12 flex min-h-[80vh] items-center">
      <div className="mx-auto text-center">
        <header className="font-VT323">
          <h1 className="text-primary text-5xl sm:text-7xl">{Title}</h1>
          <h2 className="text-primary my-4 text-3xl sm:text-5xl">
            {Subtitle} 👋
          </h2>
          <p className="text-primary mt-4 text-xl sm:text-3xl">{Description}</p>
        </header>

        {/* Links */}
        <ButtonGroup className="mt-8 justify-center border-0">
          <Link to={'/Projects'} className="Button Button-info-border">
            <>View Projects</>
          </Link>
          <Link to={'/Blogs'} className="Button Button-info-border">
            Read Blogs
          </Link>
          <Link to={'/About'} className="Button Button-info-border">
            About Me
          </Link>
        </ButtonGroup>
        {/* Socials */}
        <div className="mt-8">
          <h3>Find Me!</h3>
          <div className="font-Roboto flex items-center justify-center gap-4">
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
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <div className="grid h-[80vh] grid-cols-12 gap-5">
      <HeroContainer />
    </div>
  );
}
