import React from 'react';
import classNames from 'classnames';
import '../SignUpForm/SignUpForm.scss';

type Props = {
  ageError: string | null;
  age: string;
  setAge: React.Dispatch<React.SetStateAction<string>>;
}

export const AgeField: React.FC<Props> = (
  {
    ageError,
    age,
    setAge,
  },
) => {
  return (
    <label
      className="SignUpForm__label"
      htmlFor="age"
    >
      <h2 className="SignUpForm__labelText">
        Age
      </h2>
      <div className="SignUpForm__input-wrapper">
        <input
          id="age"
          type="number"
          className={classNames('SignUpForm__input', { error: ageError })}
          onChange={(e) => {
            setAge(e.target.value);
          }}
          value={age}
          required
        />
        <img
          src="./assets/error.svg"
          alt="error"
          className={classNames('SignUpForm__svg', { hidden: !ageError })}
        />
      </div>
      {
        ageError && (
          <h3 className="SignUpForm__error">
            {ageError}
          </h3>
        )
      }
    </label>
  );
};
