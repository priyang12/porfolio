import {
  DescriptionContainer,
  Divider,
  FormControl,
  Input,
  Label,
} from '@priyang/react-component-lib';
import React, { useState } from 'react';
import { FaSort, FaSortNumericDownAlt, FaSortNumericUp } from 'react-icons/fa';
import type { sortState } from '~/routes/projects/projects';

function GetIcon({
  state,
  ...props
}: { state: sortState } & React.ComponentPropsWithoutRef<'svg'>) {
  switch (state) {
    case 'ascending':
      return (
        <FaSortNumericUp
          data-sort="ascending"
          aria-label="Sort ascending"
          className="cursor-pointer"
          color="var(--neutral-200)"
          size={24}
          {...props}
        />
      );
    case 'descending':
      return (
        <FaSortNumericDownAlt
          data-sort="descending"
          aria-label="Sort descending"
          className="cursor-pointer"
          color="var(--neutral-200)"
          size={24}
          {...props}
        />
      );
    case 'none':
    default:
      return (
        <FaSort
          data-sort="none"
          aria-label="No sorting applied"
          className="cursor-pointer"
          color="var(--neutral-200)"
          size={24}
          {...props}
        />
      );
  }
}

function Filter({
  filterList,
  sortProjects,
}: {
  filterList: any;
  sortProjects: any;
}) {
  const [sortSelection, setSortSelection] = useState<sortState>('descending');

  const setSort = (e: React.BaseSyntheticEvent) => {
    const nextSort = e.currentTarget.getAttribute('data-sort') as sortState;
    console.log(nextSort);

    if (e.nativeEvent instanceof MouseEvent) {
      setSortSelection(nextSort);
      sortProjects(nextSort);
    }
    if (e.nativeEvent instanceof KeyboardEvent) {
      // @ts-ignore
      if (e.key === 'Enter') {
        setSortSelection(nextSort);
        sortProjects(nextSort);
      }
    }
  };
  return (
    <div className="my-5 flex flex-wrap gap-2">
      {/* Filter Input */}
      <FormControl
        className="flex flex-1 flex-col gap-2"
        required={false}
        validate={(value) => {
          filterList(value);
          return '';
        }}
      >
        <Label htmlFor="Search Projects">Look up : </Label>
        <Input
          id="Search Projects"
          InputSize="large"
          className="text-3xl"
          placeholder="Title or Description"
        />
      </FormControl>
      {/* Sort */}
      <DescriptionContainer
        className="bg-bg-surface mt-5 gap-5"
        hiddenContainerHeight="50px"
        renderDescription={() => (
          <div className="mt-1 flex flex-col items-center">
            <GetIcon
              state={'ascending'}
              onClick={setSort}
              onKeyDown={setSort}
              tabIndex={0}
            />
            <Divider />
            <GetIcon
              state={'none'}
              onClick={setSort}
              onKeyDown={setSort}
              tabIndex={0}
            />
            <Divider />
            <GetIcon
              state={'descending'}
              onClick={setSort}
              onKeyDown={setSort}
              tabIndex={0}
            />
          </div>
        )}
      >
        {({ onMouseOver }) => (
          <div className="flex items-center justify-center">
            <GetIcon
              tabIndex={0}
              state={sortSelection}
              color="var(--primary-400)"
              onMouseOver={onMouseOver}
            />
          </div>
        )}
      </DescriptionContainer>
    </div>
  );
}

export default Filter;
