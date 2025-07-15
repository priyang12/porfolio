import { Link } from "react-router";
import { clsx } from "clsx";

function LogoComponent() {
  return (
    <Link
      to="/"
      className="btn-ghost btn w-full text-center text-3xl normal-case sm:w-fit"
    >
      Priyang Patel
    </Link>
  );
}

function Navbar() {
  return (
    <div
      className={clsx(
        `glass-container sticky top-0 left-0 flex z-20 flex-wrap rounded-b-md p-5 items-center`
      )}
    >
      <LogoComponent />

      <ul className="flex justify-between m-auto sm:ml-auto sm:mr-0 flex-row p-0">
        <li>
          <Link to="/Projects" className="p-2 text-xl normal-case">
            Projects
          </Link>
        </li>
        <li>
          <Link to="/Blogs" className="p-2 text-xl normal-case">
            Blogs
          </Link>
        </li>
        <li>
          <Link to="/AboutMe" className="p-2 text-xl normal-case">
            About Me
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
