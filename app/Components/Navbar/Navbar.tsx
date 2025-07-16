import { Link, useLocation } from 'react-router';
import { clsx } from 'clsx';

function LogoComponent() {
  return (
    <div className="col-span-12 md:col-start-2 md:col-end-4">
      <Link
        to="/"
        className="block w-full text-center text-2xl md:text-start md:text-3xl"
      >
        Priyang Patel
      </Link>
    </div>
  );
}

function Navbar() {
  const { pathname } = useLocation();
  return (
    <div
      className={clsx(
        `glass-container h=[20vh] left-0 z-20 grid w-full grid-cols-12 flex-wrap items-center gap-5 rounded-b-md py-5 sm:sticky sm:top-0`,
        {
          'absolute bottom-0 sm:hidden': pathname === '/',
        },
      )}
    >
      {pathname === '/' ? null : <LogoComponent />}

      <ul className="col-span-12 grid grid-cols-3 grid-rows-subgrid items-center md:col-start-7 md:col-end-12">
        <li className="col-span-1 m-auto">
          <Link to="/Projects" className="px-1 py-2 text-xl normal-case">
            Projects
          </Link>
        </li>
        <li className="col-span-1 m-auto">
          <Link to="/Blogs" className="px-1 py-2 text-xl normal-case">
            Blogs
          </Link>
        </li>
        <li className="col-span-1 m-auto">
          <Link to="/AboutMe" className="px-1 py-2 text-xl normal-case">
            About Me
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
