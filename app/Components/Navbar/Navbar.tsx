import { Link } from "react-router";
import { clsx } from "clsx";

function LogoComponent() {
  return (
    <div className="col-span-12 md:col-end-4 md:col-start-2">
      <Link
        to="/"
        className="block w-full text-2xl md:text-3xl text-center md:text-start"
      >
        Priyang Patel
      </Link>
    </div>
  );
}

function Navbar() {
  return (
    <div
      className={clsx(
        `glass-container h=[20vh] py-5 gap-5 grid grid-cols-12 sticky top-0 left-0 z-20 flex-wrap rounded-b-md items-center`
      )}
    >
      <LogoComponent />

      <ul className="col-span-12 md:col-start-7 md:col-end-12 grid grid-rows-subgrid grid-cols-3 items-center">
        <li className="col-span-1 m-auto">
          <Link to="/Projects" className="py-2 px-1 text-xl normal-case">
            Projects
          </Link>
        </li>
        <li className="col-span-1 m-auto">
          <Link to="/Blogs" className="py-2 px-1 text-xl normal-case">
            Blogs
          </Link>
        </li>
        <li className="col-span-1 m-auto">
          <Link to="/AboutMe" className="py-2 px-1 text-xl normal-case">
            About Me
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
