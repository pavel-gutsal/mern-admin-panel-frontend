/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { usePatchUser } from '../../hooks/usePatchUser';
import { UserEditField } from '../UserEditField/UserEditField';
import { EditSVG } from '../../svg/EditSVG/EditSVG';
import { DeleteSVG } from '../../svg/DeleteSVG/DeleteSVG';
import { CorrectSVG } from '../../svg/CorrectSVG/CorrectSVG';
import { User } from '../../types/User';
import { EditedUser } from '../../types/EditedUser';
import { Action } from '../../types/Action';
import './UserRow.scss';

type Props = {
  person: User;
  setDeleteWindowOpen: React.Dispatch<React.SetStateAction<string | null>>;
  dispatch: React.Dispatch<Action>;
}

export const UserRow: React.FC<Props> = ({
  person,
  setDeleteWindowOpen,
  dispatch,
}) => {
  const [editPerson, setEditPerson] = useState(false);
  const [emailEdit, setEmailEdit] = useState(person.email);
  const [nameEdit, setNameEdit] = useState(person.name);
  const [ageEdit, setAgeEdit] = useState(person.age);
  const [passwordEdit, setPasswordEdit] = useState(person.password);
  const { patchUser, error, updatedUser } = usePatchUser();

  const [nameError, setNameError] = useState<null | string>(null);
  const [ageError, setAgeError] = useState<null | string>(null);
  const [emailError, setEmailError] = useState<null | string>(null);
  const [passwordError, setPasswordError] = useState<null | string>(null);

  const deleteHandler = () => {
    setDeleteWindowOpen(person._id);
  };

  const editHandler = async () => {
    setEmailError(null);
    setPasswordError(null);
    setNameError(null);
    setAgeError(null);

    if (
      emailEdit === person.email
      && nameEdit === person.name
      && ageEdit === person.age
      && passwordEdit === person.password
    ) {
      setEditPerson(false);
      // eslint-disable-next-line no-useless-return
      return;
    }

    if (emailEdit.trim() === '') {
      setEmailError('email is empty');
      return;
    }

    // eslint-disable-next-line no-useless-escape
    if (/\ /.test(emailEdit)) {
      setEmailError('email contains white spaced');
      return;
    }

    if (nameEdit.trim() === '') {
      setNameError('name is empty');
      return;
    }

    if (passwordEdit.trim() === '') {
      setPasswordError('password is empty');
      return;
    }

    // eslint-disable-next-line no-useless-escape
    if (/\ /.test(passwordEdit)) {
      setPasswordError('password contains white spaced');
      return;
    }

    const editedUser: EditedUser = {
      update: {
        email: emailEdit,
        name: nameEdit,
        age: Number(ageEdit),
        password: passwordEdit,
      },
      id: person._id,
    };

    await patchUser(editedUser);
  };

  useEffect(() => {
    if (!error) {
      if (updatedUser) {
        dispatch({ type: 'UPDATE', payload: { updatedUser } });
      }

      setEditPerson(false);
    }
  }, [updatedUser]);

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
        case 'password is too short':
        case 'password is too long':
          setPasswordError(error.error);
          break;
        default:
          break;
      }
    }
  }, [error]);

  return (
    <div className="UserRow">
      <div className="DashBoard__tableBody">
        <UserEditField
          editPerson={editPerson}
          field={person.email}
          fieldEdit={emailEdit}
          setFieldEdit={setEmailEdit}
          error={emailError}
        />
        <UserEditField
          editPerson={editPerson}
          field={person.name}
          fieldEdit={nameEdit}
          setFieldEdit={setNameEdit}
          error={nameError}
        />
        <UserEditField
          editPerson={editPerson}
          field={person.age}
          fieldEdit={ageEdit}
          setFieldEdit={setAgeEdit}
          error={ageError}
        />
        <UserEditField
          editPerson={editPerson}
          field={person.password}
          fieldEdit={passwordEdit}
          setFieldEdit={setPasswordEdit}
          error={passwordError}
        />
        <button
          type="button"
          className="DashBoard__btn"
          onClick={() => {
            if (!editPerson) {
              setEditPerson(true);
            }

            if (editPerson) {
              editHandler();
            }
          }}
        >
          { editPerson ? (<CorrectSVG />) : (<EditSVG />) }
        </button>
        <button
          type="button"
          className="DashBoard__btn"
          onClick={() => {
            deleteHandler();
          }}
        >
          <DeleteSVG />
        </button>
      </div>
    </div>
  );
};
