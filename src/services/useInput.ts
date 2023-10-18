import { useState } from 'react';

interface IUseInput {
  value: string, 
  onChange: (e: React.ChangeEvent) => void;
}

const useInput = (initialValue: string): IUseInput => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e: React.ChangeEvent) => {    
    setValue((e.target as HTMLInputElement).value)
  };

  return {
    value,
    onChange: handleChange
  };
  
};

export default useInput;
