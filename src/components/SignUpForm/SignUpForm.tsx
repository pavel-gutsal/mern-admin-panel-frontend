/* eslint-disable no-else-return */
import React, { useState, useEffect } from 'react';
import { useSignUpForm } from '../../hooks/useSignUpForm';
import { PasswordField } from '../PasswordField/PasswordField';
import { RepeatePasswordField } from '../RepeatePasswordField/RepeatePasswordField';
import { EmailField } from '../EmailField/EmailField';
import { AgeField } from '../AgeField/AgeField';
import { NameField } from '../NameField/NameField';
import './SignUpForm.scss';

export const SignUpForm = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatePassword, setRepeatPassword] = useState('');
  const [nameError, setNameError] = useState<null | string>(null);
  const [ageError, setAgeError] = useState<null | string>(null);
  const [emailError, setEmailError] = useState<null | string>(null);
  const [passwordError, setPasswordError] = useState<null | string>(null);
  const { SignUp, error } = useSignUpForm();

  const submitHandler = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    setEmailError(null);
    setPasswordError(null);
    setNameError(null);
    setAgeError(null);

    if (password !== repeatePassword) {
      setPasswordError('passwords do not match');
      return;
    } else if (password.length < 6 || password.length > 25) {
      setPasswordError('password should be from 6 to 25 charachters');
      return;
    } else {
      setPasswordError(null);
    }

    // eslint-disable-next-line object-curly-newline
    const newUser = { name: name.trim(), age: Number(age), email: email.trim(), password };
    const result = await SignUp(newUser);
    if (result === 'OK') {
      setName('');
      setAge('');
      setEmail('');
      setPassword('');
      setRepeatPassword('');
    }
  };

  useEffect(() => {
    if (error) {
      switch (error.error) {
        case 'user with such email already exists':
        case 'email is unrealisticly long':
        case 'blank spaces inside email':
          setEmailError(error.error);
          break;
        case 'name should contain only Latin characters':
        case 'name is too short':
        case 'name should contain 25 charactars top':
          setNameError(error.error);
          break;
        case 'incorrect age':
          setAgeError(error.error);
          break;
        default:
          break;
      }
    }
  }, [error]);

  return (
    <form
      onSubmit={(e) => {
        submitHandler(e);
      }}
      className="SignUpForm"
    >
      <NameField
        nameError={nameError}
        name={name}
        setName={setName}
      />
      <AgeField
        ageError={ageError}
        age={age}
        setAge={setAge}
      />
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
      <RepeatePasswordField
        passwordError={passwordError}
        repeatePassword={repeatePassword}
        setRepeatPassword={setRepeatPassword}
      />
      <div className="SignUpForm__btn-wrapper">
        <button
          type="submit"
          className="SignUpForm__btn"
          onClick={(e) => {
            submitHandler(e);
          }}
        >
          Sign Up
        </button>
      </div>
    </form>
  );
};
