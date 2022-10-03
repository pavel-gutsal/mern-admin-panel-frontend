/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext } from 'react';
import { useDeleteUser } from '../../hooks/useDeleteUser';
import { AuthContext } from '../../context/authContext';
import { Action } from '../../types/Action';
import './DeleteModalWindow.scss';

type Props = {
  deleteWindowOpen: string;
  setDeleteWindowOpen: React.Dispatch<React.SetStateAction<string | null>>;
  dispatch: React.Dispatch<Action>;
}

export const DeleteModalWindow: React.FC<Props> = ({
  deleteWindowOpen,
  dispatch,
  setDeleteWindowOpen,
}) => {
  const { deleteUser, error } = useDeleteUser();
  const { user, setUser } = useContext(AuthContext);

  const closeModalWindow = () => {
    setDeleteWindowOpen(null);
  };

  const deleteHandler = async () => {
    await deleteUser(deleteWindowOpen);

    if (!error) {
      // eslint-disable-next-line object-curly-newline
      dispatch({ type: 'DELETE',
        payload: {
          id: deleteWindowOpen,
        },
      });
    }

    if (user && deleteWindowOpen === user._id) {
      setUser(null);
    }

    closeModalWindow();
  };

  return (
    <div className="DeleteModalWindow">
      <div
        className="DeleteModalWindow__bgShades"
        onClick={() => {
          closeModalWindow();
        }}
      />
      <div className="DeleteModalWindow__wrapper">
        <div className="DeleteModalWindow__header">
          <button
            type="button"
            className="DeleteModalWindow__close"
            onClick={() => {
              closeModalWindow();
            }}
          >
            <img
              src="./assets/close.svg"
              alt="close"
              className="DeleteModalWindow__img"
            />
          </button>
        </div>
        <div className="DeleteModalWindow__content">
          <p className="DeleteModalWindow__paragraph">
            Do you want to delete this user ?
          </p>
          <div className="DeleteModalWindow__btns">
            <button
              type="button"
              className="DeleteModalWindow__btn"
              onClick={() => {
                deleteHandler();
              }}
            >
              Yes
            </button>
            <button
              type="button"
              className="DeleteModalWindow__btn"
              onClick={() => {
                closeModalWindow();
              }}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
