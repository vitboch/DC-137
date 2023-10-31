import { useState } from 'react';
import { IInputValidation, IUseInput } from '../types/types';

const useInput = (
  initialValue: string,
  validation: IInputValidation | null = null
): IUseInput => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent) => {
    const value = (e.target as HTMLInputElement).value;
    setValue(value);
    if (validation && !value.match(validation.regex))
      setError(validation.errMessage);
    else setError(null);
  };

  return {
    value,
    onBlur: (e) => {
      if (!e.target.value && validation?.required) setError('Required field');
    },
    onChange: handleChange,
    error
  };
};

export default useInput;
