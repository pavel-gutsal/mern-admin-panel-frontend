import React from 'react';
import classNames from 'classnames';
import '../SignUpForm/SignUpForm.scss';

type Props = {
  emailError: string | null;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

export const EmailField: React.FC<Props> = (
  {
    emailError,
    email,
    setEmail,
  },
) => {
  return (
    <label
      className="SignUpForm__label"
      htmlFor="email"
    >
      <h2 className="SignUpForm__labelText">
        Email
      </h2>
      <div className="SignUpForm__input-wrapper">
        <input
          id="email"
          type="email"
          className={classNames('SignUpForm__input', { error: emailError })}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          required
        />
        <img
          src="./assets/error.svg"
          alt="error"
          className={classNames('SignUpForm__svg', { hidden: !emailError })}
        />
      </div>
      {
        emailError && (
          <h3 className="SignUpForm__error">
            {emailError}
          </h3>
        )
      }
    </label>
  );
};
