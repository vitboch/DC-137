import signUp from '../../auth/signUp'
import useInput from '../../hooks/useInput';
import { useState } from 'react';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import initFirebase from '../../services/initFirebase';

import cls from './auth-form.module.css';
import { useNavigate } from 'react-router-dom';
import signIn from '../../auth/signIn';

interface Props {
  signUpFlag?: boolean;
}

export const AuthForm = ({ signUpFlag }: Props) => {
  const email = useInput('', true);
  const name = useInput('', true);
  const password = useInput('', true);
  const passwordAgain = useInput('', true);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const navigate = useNavigate();

  const db = getFirestore(initFirebase);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!signUpFlag) {
      const { result, error } = await signIn(email.value, password.value);
      if (error) {
        return console.log(error);
      };
      if (result) {
        return navigate('/');
      };
    };

    if (password.value === passwordAgain.value) {
      setPasswordMatch(true);
      const { result, error } = await signUp(email.value, password.value);

      if (error) {
        return console.log(error);
      }
      
      if (result) {
        const { user } = result;
        try {
          await setDoc(doc(db, 'users', user.uid), {
            name: name.value,
            email: email.value,
          });
        } catch (e) {
          console.log(e);
        }
        console.log(user);
        navigate('/');
      }
      

    } else {
      setPasswordMatch(false);
    }
  }

  return (
    <div className={cls.form__wrapper}>
      <form className={cls.form}>
        <label htmlFor="emailInput">Email</label>
        <input id="emailInput" type="email" placeholder="user@example.com" className={email.error ? cls.form__input_error : ''} { ...email } />
        {
          signUpFlag && 
          <>
            <label htmlFor="nameInput">Name</label>
            <input id="nameInput" type="text" placeholder="John Doe" { ...name } className={email.error ? cls.form__input_error : ''} />    
          </>  
        }
        
        <label htmlFor="passwordInput">Password</label>
        <input id="passwordInput" type="password" placeholder="********" { ...password } className={email.error ? cls.form__input_error : ''} />        
        {
          signUpFlag && 
          <>
            <label htmlFor="passwordAgainInput">Password again</label>
            <input id="passwordAgainInput" type="password" placeholder="********" { ...passwordAgain } className={email.error ? cls.form__input_error : ''} />
            { !passwordMatch && <span>Password mismatch</span> }
          </>
        }
        <button type="submit" onClick={handleSubmit}>{ signUpFlag ? 'Sign Up' : 'Sign In' }</button>
      </form>
    </div>
  )
};
