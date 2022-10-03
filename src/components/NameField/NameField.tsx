import React from 'react';
import classNames from 'classnames';
import '../SignUpForm/SignUpForm.scss';

type Props = {
  nameError: string | null;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
}

export const NameField: React.FC<Props> = (
  {
    nameError,
    name,
    setName,
  },
) => {
  return (
    <label
      className="SignUpForm__label"
      htmlFor="name"
    >
      <h2 className="SignUpForm__labelText">
        Name
      </h2>
      <div className="SignUpForm__input-wrapper">
        <input
          id="name"
          type="text"
          className={classNames('SignUpForm__input', { error: nameError })}
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
          required
        />
        <img
          src="./assets/error.svg"
          alt="error"
          className={classNames('SignUpForm__svg', { hidden: !nameError })}
        />
      </div>
      {
        nameError && (
          <h3 className="SignUpForm__error">
            {nameError}
          </h3>
        )
      }
    </label>
  );
};
