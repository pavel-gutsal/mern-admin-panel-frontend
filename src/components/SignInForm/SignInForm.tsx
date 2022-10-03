import React, { useState, useEffect } from 'react';
import { PasswordField } from '../PasswordField/PasswordField';
import { EmailField } from '../EmailField/EmailField';
import { useSignInForm } from '../../hooks/useSignInForm';
import './SignInForm.scss';

export const SignInForm = () => {
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState<null | string>(null);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<null | string>(null);
  const { SignIn, error } = useSignInForm();

  const submitHandler = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    setEmailError(null);
    setPasswordError(null);

    if (email.replaceAll(' ', '') === '') {
      setEmailError('Type your email');
      return;
    }
    if (password.replaceAll(' ', '') === '') {
      setPasswordError('Type your password');
      return;
    }
    const result = await SignIn({ email, password });

    if (result === 'OK') {
      setEmail('');
      setPassword('');
    }
  };

  useEffect(() => {
    if (error) {
      switch (error.error) {
        case 'no user with such email exist':
          setEmailError(error.error);
          break;
        case 'wrong password':
          setPasswordError(error.error);
          break;
        default:
          break;
      }
    }
  }, [error]);

  return (
    <form
      className="SignInForm"
      onSubmit={(e) => {
        submitHandler(e);
      }}
    >
      <EmailField
        emailError={emailError}
        email={email}
        setEmail={setEmail}
      />
      <PasswordField
        passwordError={passwordError}
        password={password}
        setPassword={setPassword}
      />
      <div className="SignUpForm__btn-wrapper">
        <button
          type="submit"
          className="SignUpForm__btn"
          onClick={(e) => {
            submitHandler(e);
          }}
        >
          SignIn
        </button>
      </div>
    </form>
  );
};
