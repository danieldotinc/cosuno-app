import React from 'react';

type SearchBoxProps = { value: string; onChange: Function };

const SearchBox: React.FC<SearchBoxProps> = ({ value, onChange }) => (
  <input
    type="text"
    name="query"
    className="form-control my-3"
    placeholder="Search..."
    value={value}
    onChange={e => onChange(e.currentTarget.value)}
  />
);

export default SearchBox;
