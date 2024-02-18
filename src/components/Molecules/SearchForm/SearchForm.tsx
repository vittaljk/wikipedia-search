import * as Atoms from '@/components/Atoms';
import React from 'react';

interface SearchFormProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

const SearchForm: React.FC<SearchFormProps> = ({
  value,
  onChange,
  onSubmit,
}) => (
  <div className="grid grid-cols-[1fr_auto] md:grid-cols-[1fr_auto_1fr]">
    <Atoms.InputBox value={value} onChange={onChange} />
    <Atoms.Button onClick={onSubmit}>Search</Atoms.Button>
  </div>
);

export default SearchForm;
