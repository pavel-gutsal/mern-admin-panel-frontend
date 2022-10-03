import React from 'react';
import { User } from '../../types/User';
import { UserRow } from '../UserRow/UserRow';
import { Action } from '../../types/Action';
import './OtherUserList.scss';
import '../../pages/DashBoard/DashBoard.scss';

type Props = {
  otherUserList: User[];
  setDeleteWindowOpen: React.Dispatch<React.SetStateAction<string | null>>;
  dispatch: React.Dispatch<Action>;
}

export const OtherUserList: React.FC<Props> = ({
  otherUserList,
  setDeleteWindowOpen,
  dispatch,
}) => {
  return (
    <div className="OtherUserList">
      <div className="DashBoard__tableUsers">
        <h3 className="DashBoard__text--otherUsers">
          Other users
        </h3>
      </div>
      <div className="OtherUserList__container">
        {
          otherUserList.map((el) => (
            <UserRow
              person={el}
              key={el.email}
              setDeleteWindowOpen={setDeleteWindowOpen}
              dispatch={dispatch}
            />
          ))
        }
      </div>
      <div className="DashBoard__tableFooter">
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
    </div>
  );
};
