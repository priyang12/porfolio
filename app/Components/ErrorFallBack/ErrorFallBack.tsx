import { Button, Truncate } from '@priyang/react-component-lib';
import { isRouteErrorResponse, useFetcher } from 'react-router';
import type { Route } from '../../+types/root';

function ErrorFallBack({ error }: Route.ErrorBoundaryProps) {
  const fetcher = useFetcher();
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main
      className="mx-auto flex min-h-screen w-screen flex-col"
      style={{
        background: `url("https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2574&q=80")
          repeat center/cover`,
      }}
    >
      <div className="glass-container flex flex-col items-center pt-5">
        <h1 className="text-4xl">{message}</h1>
        <Truncate>{details}</Truncate>
        {stack && (
          <pre className="h-1/2 w-3/4 overflow-x-auto p-4">
            <code>{stack}</code>
          </pre>
        )}
        <Button
          variant="info-border"
          className="m-5"
          onClick={() => fetcher.load(window.location.pathname)}
        >
          Reload Page
        </Button>
      </div>
    </main>
  );
}

export default ErrorFallBack;
