import ReactMarkdown from 'react-markdown';
import { Divider } from '@priyang/react-component-lib';
import Sign from '~/Components/Sign/Sign';
import aboutJson from '../../content/About.json';
import { Github } from '../../content/Socials.json';

import type { MetaArgs } from 'react-router';

export const meta = ({}: MetaArgs) => {
  return [
    {
      title: '/About Me',
    },
    {
      name: 'description',
      content:
        'Information about my career and job. i also provides contact information',
    },
  ];
};

// wireframe
// -----------------------------------------------------
// | Navbar                                            |
// -----------------------------------------------------

// |      |               About Me Page                |      |
// | Img  |--------------------------------------------| Text |
// |      |                                            |      |
// |      | [👤 Name]                                   |      |
// |      | Self-taught frontend developer...          |      |
// |      |                                            |      |
// |      | 🔹 Background                              |      |
// |      | - React, JS, CSS, React Native             |      |
// |      | - Books: You Don’t Know JS, React Patterns |      |
// |      |                                            |      |
// |      | 🔹 Academic                                 |      |
// |      | - [Education if any, or skip]              |      |
// |      |                                            |      |
// |      | 🔹 Personal                                 |      |
// |      | - Interests, hobbies, side projects        |      |
// |      |                                            |      |
// |      | 🔹 Currently looking for                   |      |
// |      | - Freelance / Full-time / Collab           |      |
// -----------------------------------------------------
//
// |-----------------------------------------------------------|
// | 💬 Open to freelance and full-time opportunities in        |
// |     frontend or React development.                        |
// |                                                           |
// | [Email Me]  [Resume]  [GitHub]                          |
// |-----------------------------------------------------------|

const AboutMe = () => {
  return (
    <section className="my-10 grid min-h-screen grid-cols-12" id="About">
      <main className="col-span-12 p-2 md:col-start-2 md:col-end-12 lg:col-start-4 lg:col-end-11">
        <h1 className="text-primary mb-10 text-center text-3xl font-bold">
          About Me
        </h1>
        <ol className="space-y-8">
          <li>
            <p className="text-muted-foreground mt-2 text-xl">
              {aboutJson.start}
            </p>
          </li>

          <li>
            <h2 className="text-secondary text-lg font-semibold">
              {'BACKGROUND'}
            </h2>
            <div className="mt-2 space-y-2">
              <p className="text-muted-foreground text-xl">
                {aboutJson.background.tech}
              </p>
              <ReactMarkdown>{aboutJson.background.book}</ReactMarkdown>
            </div>
          </li>

          <li>
            <h2 className="text-secondary text-lg font-semibold">
              {'ACADEMIC'}
            </h2>
            <p className="text-muted-foreground mt-2 text-xl">
              {aboutJson.academic}
            </p>
          </li>

          <li>
            <h2 className="text-secondary text-lg font-semibold">
              {'PERSONAL'}
            </h2>
            <p className="text-muted-foreground mt-2 text-xl">
              {aboutJson.personal}
            </p>
          </li>

          <li>
            <h2 className="text-secondary text-lg font-semibold">
              {'LOOKING'}
            </h2>
            <p className="text-muted-foreground mt-2 text-xl">
              {aboutJson.looking}
            </p>
          </li>
        </ol>
      </main>
      <Divider className="border-accent-500 col-span-12 border-t-4 border-solid" />
      <div className="col-span-12 min-h-[20vh] w-full p-2 py-8 md:col-start-2 md:col-end-12">
        {/* Heading */}
        <div className="mb-6">
          <h1 className="text-primary text-4xl font-bold">Reach Out</h1>
          <p className="text-muted-foreground mt-2 text-lg">
            I’m open to opportunities and collaborations — feel free to connect.
          </p>
        </div>

        {/* Contact Buttons */}
        <nav aria-label="Contact options" className="flex flex-wrap gap-4">
          <a
            href="mailto:you@example.com"
            className="bg-primary hover:bg-primary/90 inline-block rounded-lg px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          >
            Email Me
          </a>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="border-primary text-primary hover:bg-primary focus-visible:ring-primary inline-block rounded-lg border px-4 py-2 text-sm font-medium hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          >
            Resume
          </a>
          <a
            href={Github}
            target="_blank"
            rel="noopener noreferrer"
            className="border-muted text-muted-foreground hover:text-primary focus-visible:ring-primary inline-block rounded-lg border px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          >
            GitHub
          </a>
        </nav>
        <div className="mt-8 ml-auto hidden w-[20%] md:block">
          <Sign />
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
