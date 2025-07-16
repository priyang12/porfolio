import type { Route } from "./+types/home";
import { Description, Subtitle, Title } from "../../content/Hero.json";
import { Github, Twitter } from "../../content/Socials.json";
import { FiGithub, FiTwitter } from "react-icons/fi";
import { ButtonGroup, TextLink } from "@priyang/react-component-lib";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home/" },
    { name: "description", content: "This is my Personal portfolio" },
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
  return (
    <section className="col-start-2 col-end-12 flex items-center min-h-[80vh]">
      <div className="mx-auto text-center">
        <header className="font-VT323">
          <h1 className="text-5xl sm:text-7xl text-primary">{Title}</h1>
          <h2 className="my-4 text-3xl sm:text-5xl text-primary">
            {Subtitle} 👋
          </h2>
          <p className="mt-4 text-xl sm:text-3xl text-primary">{Description}</p>
        </header>

        {/* Links */}
        <ButtonGroup className="mt-8 justify-center border-0">
          <Link to={"/Projects"} className="Button Button-info-border">
            <>View Projects</>
          </Link>
          <Link to={"/Blogs"} className="Button Button-info-border">
            Read Blogs
          </Link>
          <Link to={"/About"} className="Button Button-info-border">
            About Me
          </Link>
        </ButtonGroup>
        {/* Socials */}
        <div className="mt-8">
          <h3>Find Me!</h3>
          <div className="flex items-center gap-4 justify-center font-Roboto">
            <TextLink href={Github}>
              <div className="flex items-center cursor-pointer gap-2 px-4 py-2 border rounded  hover:text-white transition">
                <FiGithub className="text-xl" />
                Github
              </div>
            </TextLink>
            <TextLink href={Twitter}>
              <div className="flex items-center cursor-pointer gap-2 px-4 py-2 border rounded hover:bg-primary hover:text-white transition">
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
    <div className="h-[80vh] gap-5 grid grid-cols-12">
      <HeroContainer />
    </div>
  );
}
