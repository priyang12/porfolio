import { Link } from 'react-router';

function playground() {
  return (
    <div className="grid min-h-screen grid-cols-8">
      <div className="glass-container col-start-2 col-end-8 m-5 mt-5 w-full p-5">
        <h1 className="text-3xl">playground</h1>
        <ul className="my-5">
          <li>
            <Link to="snakeBite" className="text-primary-400 text-xl">
              Snake Bite
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default playground;
