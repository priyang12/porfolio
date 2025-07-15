import type { Route } from "./+types/home";
import { Description, Subtitle, Title } from "../../content/Hero.json";
import { Github, Twitter } from "../../content/Socials.json";
import { FiGithub, FiTwitter } from "react-icons/fi";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home/" },
    { name: "description", content: "This is my Personal portfolio" },
  ];
}

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

        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center font-Roboto">
          <a href={Github}>
            <button className="flex items-center cursor-pointer gap-2 px-4 py-2 border rounded hover:bg-primary hover:text-white transition">
              <FiGithub className="text-xl" />
              Github
            </button>
          </a>
          <a href={Twitter}>
            <button className="flex items-center cursor-pointer gap-2 px-4 py-2 border rounded hover:bg-primary hover:text-white transition">
              <FiTwitter className="text-xl" />
              Twitter
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <div className="h-[80vh] gap-5 grid grid-cols-12">
      {/* this will moved to about me page. */}
      <HeroContainer />
    </div>
  );
}
