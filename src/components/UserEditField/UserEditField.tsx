import React from 'react';
import classNames from 'classnames';
import { EditErrorModalWindow } from '../EditErrorModalWindow/EditErrorModalWindow';

type Props = {
  editPerson: boolean;
  field: string;
  fieldEdit: string;
  setFieldEdit: React.Dispatch<React.SetStateAction<string>>;
  error: string | null;
}

export const UserEditField: React.FC<Props> = ({
  editPerson,
  field,
  fieldEdit,
  setFieldEdit,
  error,
}) => {
  return (
    <div className={classNames('DashBoard__cell', { editPerson })}>
      {
        !editPerson
          ? (<p className="DashBoard__text--blackish">{field}</p>)
          : (
            <>
              <input
                type="text"
                className="DashBoard__input"
                onChange={(e) => {
                  setFieldEdit(e.target.value);
                }}
                value={fieldEdit}
              />
              {
                error && (
                  <EditErrorModalWindow error={error} />
                )
              }
            </>
          )
      }
    </div>
  );
};
