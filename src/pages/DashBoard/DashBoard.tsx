/* eslint-disable no-underscore-dangle */
import React, {
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { AuthContext } from '../../context/authContext';
import { useGetAllUsers } from '../../hooks/useGetAllUsers';
import { UserRow } from '../../components/UserRow/UserRow';
import { OtherUserList } from '../../components/OtherUsersList/OtherUserList';
import { DeleteModalWindow } from '../../components/DeleteModalWindow/DeleteModalWindow';
import { User } from '../../types/User';
import { Action } from '../../types/Action'; // reducer type
import './DashBoard.scss';

// useReducer

type State = {
  list: User[];
}

const initialListState: State = {
  list: [],
};

function listReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'CREATE':
      return { list: action.payload.list };
    case 'DELETE':
      return {
        list: state.list.filter((el) => el._id !== action.payload.id),
      };
    case 'UPDATE':
      return {
        list: state.list.map((el) => {
          if (action.payload.updatedUser._id === el._id) {
            return { ...action.payload.updatedUser };
          }
          return el;
        }),
      };
    default:
      return state;
  }
}
// end of useReducer declaration

export const DashBoard = () => {
  const { user } = useContext(AuthContext);
  const { getAllUsers, allUsers } = useGetAllUsers();
  const [state, dispatch] = useReducer(listReducer, initialListState);
  const [deleteWindowOpen, setDeleteWindowOpen] = useState<null | string>(null);

  useEffect(() => {
    console.log(state);
  }, [state]);

  useEffect(() => {
    if (user) {
      if (user.isAdmin) {
        getAllUsers(user);
      }
    }
  }, [user]);

  useEffect(() => {
    if (allUsers && allUsers.length > 0) {
      // eslint-disable-next-line object-curly-newline
      dispatch({ type: 'CREATE',
        payload: {
          list: allUsers,
        },
      });
    }
  }, [allUsers]);

  return (
    <div className="DashBoard">
      <div className="DashBoard__container">
        <div className="DashBoard__table">
          <div className="DashBoard__tableHeader">
            <div className="DashBoard__cell">
              <h3 className="DashBoard__text">email</h3>
            </div>
            <div className="DashBoard__cell">
              <h3 className="DashBoard__text">name</h3>
            </div>
            <div className="DashBoard__cell">
              <h3 className="DashBoard__text">age</h3>
            </div>
            <div className="DashBoard__cell">
              <h3 className="DashBoard__text">password</h3>
            </div>
            <div className="DashBoard__cell">
              <h3 className="DashBoard__text">edit</h3>
            </div>
            <div className="DashBoard__cell">
              <h3 className="DashBoard__text">delete</h3>
            </div>
          </div>
          {
            user && (
              <UserRow
                person={user}
                setDeleteWindowOpen={setDeleteWindowOpen}
                dispatch={dispatch}
              />
            )
          }
          {
            state.list && state.list.length > 0 && (
              <OtherUserList
                otherUserList={state.list}
                setDeleteWindowOpen={setDeleteWindowOpen}
                dispatch={dispatch}
              />
            )
          }
        </div>
      </div>
      {
        deleteWindowOpen && (
          <DeleteModalWindow
            deleteWindowOpen={deleteWindowOpen}
            setDeleteWindowOpen={setDeleteWindowOpen}
            dispatch={dispatch}
          />
        )
      }
    </div>
  );
};
