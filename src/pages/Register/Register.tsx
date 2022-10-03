import React, { useState } from 'react';
import classNames from 'classnames';
import { SignUpForm } from '../../components/SignUpForm/SignUpForm';
import { SignInForm } from '../../components/SignInForm/SignInForm';
import './Register.scss';

export const Register = () => {
  const [signUpOpen, setSignUpOpen] = useState(true);

  console.log(signUpOpen);
  return (
    <div className="Register">
      <div className="Register__wrapper">
        <div className="Register__left">
          <div className="Register__title-wrapper">
            <h3 className="Register__title--smaller">
              Discover the&apos;s top
            </h3>
            <h2 className="Register__title">
              Designers & Creatives
            </h2>
          </div>
        </div>
        <div className="Register__right">
          <div className="Register__header">
            <button
              className={classNames('Register__btn', { active: signUpOpen })}
              type="button"
              onClick={() => {
                setSignUpOpen(true);
              }}
            >
              Sign Up
            </button>
            <button
              className={classNames('Register__btn', { active: !signUpOpen })}
              type="button"
              onClick={() => {
                setSignUpOpen(false);
              }}
            >
              Sign In
            </button>
          </div>
          <div className="Register__main">
            {
              signUpOpen
                ? (<SignUpForm />)
                : (<SignInForm />)
            }
          </div>
        </div>
      </div>
    </div>
  );
};
