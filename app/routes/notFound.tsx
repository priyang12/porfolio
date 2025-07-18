import { Link, useRouteError } from 'react-router';

const NotFoundSvg = (props: React.ComponentPropsWithoutRef<'svg'>) => (
  <svg fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      id="signature"
      className="sign-animate"
      vectorEffect="non-scaling-stroke"
      d="M-2 73c5-15.4 12-31.7 22-44.4-4 14.6-5 29.4-1 44.2 9-15 14-31.7 24-46.1M59 45.6c-8 .2-14 6.7-17 13.1-3 6.5-1 21 9 17.1 8-3.7 17-24 8-29.3-9 3.5 1 17.2 10 10.1M71 40.8c6 1.1 12-.4 19 .2m-4-10.4c-6 13.7-17 26.2-18 41.6 0 1.3 1 2.5 2 3.2 7 3.9 14-5.4 16-11.1M125.4 27.9c8.3 1.5 16.9-4.6 25.1 0M133.2 30c-11.5 13.3-18.7 30.6-24.1 47.2 2-12 10.5-22.4 23.2-23.6M160 45.6c-8 .2-14 6.7-17 13.1-3 6.5-1 21 9 17.1 8-3.7 17-24 8-29.3-9 3.5 1 17.2 10 10.1M180 46.8c-29 41.1 7 34.8 17-1.7-3 6.3-8 11.8-10 18.6 0 3.3-4 12.7 2 12.5 5-.5 11-4.7 14-9.8M219 45.8c-7 8.7-12 19.1-14 30.1 2-6.3 5-12.1 10-17 1-1.9 18-18.6 18-11.2-2 7.2-7 13.6-9 21.2 0 1.7-1 3.6 0 5.3 5 8.4 14-3 16-9.2M262 53.2c0-2.7 0-9.8-5-8.5-7 2.8-13 9.4-15 17.1-1 4.1-4 14.2 3 13.1 15-6.4 23-36.5 31-50.1-6 14.8-16 28.9-19 44.8-2 14.3 15 0 17-6.1"
      stroke="white"
      strokeWidth="5"
      strokeLinecap="round"
    />
  </svg>
);

function NotFound(_: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div className="bg-primary-500 text-bg-contrast m-5 mx-auto flex max-w-3xl flex-col items-center justify-center gap-6 px-6 py-12 text-center shadow-xl sm:rounded-3xl md:px-12 lg:px-24">
      <p className="text-2xl font-semibold tracking-tight sm:text-3xl">
        Oh no! You found a page that's missing stuff.
      </p>

      <div className="">
        <NotFoundSvg />
      </div>

      <Link to="/FunZone">
        <button className="bg-bg-contrast text-primary-500 mt-4 rounded-xl px-6 py-3 text-lg font-semibold shadow-md transition duration-200 hover:bg-white">
          Want to Play Some Games?
        </button>
      </Link>
    </div>
  );
}

export default NotFound;
