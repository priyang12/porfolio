import { useState } from 'react';
import { FormControl, Input, Label } from '@priyang/react-component-lib';
import { useSearchParams } from 'react-router';
import { useDeferredValue } from './useDeferredValue';

function Filtering() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q'));

  // need to fix the import in lib
  const Search = useDeferredValue({
    initialValue: searchParams.get('q'),
    originalState: query,
    delay: 500,
    cb: (query) => {
      if (query) {
        const serialize = new URLSearchParams(`q=${query}`);
        setSearchParams(serialize);
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
          onChange={(e) => setQuery(`${e.target.value}`)}
        />
      </FormControl>
    </div>
  );
}

export default Filtering;
