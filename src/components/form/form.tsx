import { FC, useEffect } from 'react';
import { IFormProps } from '../../types/types';
import { useInput } from '../../hooks';
import cls from './form.module.css';
import { useState } from 'react';

const Form: FC<IFormProps> = ({ signUp, handleClick, errMessage }) => {
  const email = useInput('', {
    required: true,
    regex:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    errMessage: 'Email must be valid'
  });
  const password = useInput('', {
    required: true,
    regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
    errMessage: 'Minimum six characters, at least one letter and one number'
  });
  const passwordAgain = useInput('', {
    required: true,
    regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
    errMessage: 'Minimum six characters, at least one letter and one number'
  });
  const name = useInput('', {
    required: true,
    regex: /^(?=.*[a-zA-Z]).{1,30}$/,
    errMessage:
      'Minimum one character, at least one letter and shorter than 30 symbols'
  });

  const [areErrors, setAreErrors] = useState(false);

  useEffect(() => {
    signUp &&
      setAreErrors(
        [
          email.error,
          name.error,
          password.error,
          passwordAgain.value !== password.value
        ].some((e) => !!e === true)
      );
  }, [email, name, password, passwordAgain, signUp]);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (signUp) {
      handleClick(email.value, password.value, name.value);
      return;
    }
    handleClick(email.value, password.value);
  };

  return (
    <div className={cls.form__wrapper}>
      <form className={cls.form}>
        <div className={cls['form__label-wrapper']}>
          <label className={cls.form__label} htmlFor="emailInput">
            Email
          </label>
          {signUp && email.error && (
            <div className={cls.form__error}>{email.error}</div>
          )}
        </div>
        <div className={cls.form__field}>
          <input
            id="emailInput"
            className={cls.form__input}
            type="email"
            placeholder="user@example.com"
            {...email}
          />
          {signUp && email.value && (
            <span
              className={`${cls['form__error-indicator']} ${
                email.error ? cls['form__error-indicator_on'] : ''
              }`}
            ></span>
          )}
        </div>

        {signUp && (
          <>
            <div className={cls['form__label-wrapper']}>
              <label className={cls.form__label} htmlFor="nameInput">
                Name
              </label>
              {name.error && (
                <div className={cls.form__error}>{name.error}</div>
              )}
            </div>
            <div className={cls.form__field}>
              <input
                id="nameInput"
                className={cls.form__input}
                type="text"
                placeholder="John Doe"
                {...name}
              />
              {name.value && (
                <span
                  className={`${cls['form__error-indicator']} ${
                    name.error ? cls['form__error-indicator_on'] : ''
                  }`}
                ></span>
              )}
            </div>
          </>
        )}
        <div className={cls['form__label-wrapper']}>
          <label className={cls.form__label} htmlFor="passwordInput">
            Password
          </label>
          {signUp && password.error && (
            <div className={cls.form__error}>{password.error}</div>
          )}
        </div>
        <div className={cls.form__field}>
          <input
            id="passwordInput"
            className={cls.form__input}
            type="password"
            placeholder="********"
            {...password}
          />
          {signUp && password.value && (
            <span
              className={`${cls['form__error-indicator']} ${
                password.error ? cls['form__error-indicator_on'] : ''
              }`}
            ></span>
          )}
        </div>
        {signUp && (
          <>
            <div className={cls['form__label-wrapper']}>
              <label className={cls.form__label} htmlFor="passwordAgainInput">
                Password again
              </label>
              {passwordAgain.value &&
                password.value !== passwordAgain.value && (
                  <div className={cls.form__error}>{'Password mismatch'}</div>
                )}
            </div>
            <div className={cls.form__field}>
              <input
                id="passwordAgainInput"
                className={cls.form__input}
                type="password"
                placeholder="********"
                {...passwordAgain}
              />
              {passwordAgain.value && (
                <span
                  className={`${cls['form__error-indicator']} ${
                    password.value !== passwordAgain.value
                      ? cls['form__error-indicator_on']
                      : ''
                  }`}
                ></span>
              )}
            </div>
          </>
        )}

        <button
          className={cls.form__button}
          type="submit"
          onClick={handleSubmit}
          disabled={areErrors}
        >
          {signUp ? 'Sign Up' : 'Login'}
        </button>
        {errMessage && (
          <div className={cls['form__error-message']}>{errMessage}</div>
        )}
      </form>
    </div>
  );
};

export default Form;
