import React from 'react';
import classNames from 'classnames';
import '../SignUpForm/SignUpForm.scss';

type Props = {
  passwordError: string | null;
  repeatePassword: string;
  setRepeatPassword: React.Dispatch<React.SetStateAction<string>>;
}

export const RepeatePasswordField: React.FC<Props> = (
  {
    passwordError,
    repeatePassword,
    setRepeatPassword,
  },
) => {
  return (
    <label
      className="SignUpForm__label"
      htmlFor="passwordRepeated"
    >
      <h2 className="SignUpForm__labelText">
        Repeat password
      </h2>
      <div className="SignUpForm__input-wrapper">
        <input
          id="passwordRepeated"
          type="password"
          className={classNames('SignUpForm__input', { error: passwordError })}
          onChange={(e) => {
            setRepeatPassword(e.target.value);
          }}
          value={repeatePassword}
          required
        />
        <img
          src="./assets/error.svg"
          alt="error"
          className={classNames('SignUpForm__svg', { hidden: !passwordError })}
        />
      </div>
      <h3 className="SignUpForm__error">
        {passwordError}
      </h3>
    </label>
  );
};
