import React, { useState } from 'react';

interface IUseInput {
  value: string;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent) => void;
  error: string | null;
}

const useInput = (initialValue: string, required: boolean): IUseInput => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent) => {
    setValue((e.target as HTMLInputElement).value);
  };

  return {
    value,
    onBlur: (e) => {
      if (!e.target.value && required) setError('Required field');
      else setError(null);
    },
    onChange: handleChange,
    error
  };
};

export default useInput;
