import React from 'react';
import classNames from 'classnames';
import '../SignUpForm/SignUpForm.scss';

type Props = {
  passwordError: string | null;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}

export const PasswordField: React.FC<Props> = ({ passwordError, password, setPassword }) => {
  return (
    <label
      className="SignUpForm__label"
      htmlFor="password"
    >
      <h2 className="SignUpForm__labelText">
        Password
      </h2>
      <div className="SignUpForm__input-wrapper">
        <input
          id="password"
          type="password"
          className={classNames('SignUpForm__input', { error: passwordError })}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          required
        />
        <img
          src="./assets/error.svg"
          alt="error"
          className={classNames('SignUpForm__svg', { hidden: !passwordError })}
        />
      </div>
      <h3 className="SignUpForm__error">
        { passwordError }
      </h3>
    </label>
  );
};
