import * as React from 'react';

/**
 * This is from my lib need to fix exporting. delete later
 * A custom hook that defers a state update by a specified delay.
 *
 * @param originalState - The value that will be updated after the delay.
 * @param delay - Delay in milliseconds before the update happens (default: 0).
 * @param initialValue - Initial value to show before the deferred update.
 *
 *
 * @returns The deferred value that updates after the delay.
 *
 * @example
 * ```tsx
 * const deferredValue = useDeferredValue({
 *   originalState: inputValue,
 *   delay: 1000,
 *   initialValue: ''
 * });
 * ```
 */

export const useDeferredValue = <T>({
  originalState,
  delay = 0,
  initialValue,
  cb,
}: {
  originalState: T;
  delay?: number;
  initialValue: T;
  cb?: (para: T) => void;
}) => {
  const [state, setState] = React.useState(initialValue);
  React.useEffect(() => {
    let id: ReturnType<typeof setTimeout>;
    id = setTimeout(() => {
      if (cb) cb(originalState);
      setState(originalState);
    }, delay);
    return () => {
      if (id) clearTimeout(id);
    };
  }, [originalState, delay]);
  return state;
};
