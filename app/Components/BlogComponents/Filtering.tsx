import { useState } from 'react';
import { FormControl, Input, Label } from '@priyang/react-component-lib';
import { useSearchParams } from 'react-router';
import { useDeferredValue } from './useDeferredValue';

function Filtering() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') ?? '');

  // need to fix the import in lib
  const Search = useDeferredValue({
    initialValue: searchParams.get('q'),
    originalState: query,
    delay: 500,
    cb: (deferredQuery) => {
      if (deferredQuery) {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('q', query);
        newParams.set('page', newParams.get('page') ?? '1');
        setSearchParams(newParams);
      } else {
        setSearchParams('');
      }
    },
  });

  return (
    <div>
      <FormControl required={false}>
        <Label htmlFor="Search">Search Blog : {Search}</Label>
        <Input
          id="Search"
          InputSize="large"
          placeholder="Look up by Title or Tags"
          value={query}
          onChange={(e) => setQuery(`${e.target.value}`)}
        />
      </FormControl>
    </div>
  );
}

export default Filtering;
