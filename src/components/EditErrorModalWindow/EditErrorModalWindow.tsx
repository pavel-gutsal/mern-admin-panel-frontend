import React from 'react';
import './EditErrorModalWindow.scss';

type Props = {
  error: string;
}

export const EditErrorModalWindow: React.FC<Props> = ({ error }) => {
  return (
    <div className="EditErrorModalWindow">
      <div className="EditErrorModalWindow__wrapper">
        <div className="EditErrorModalWindow__squire" />
        <h3 className="EditErrorModalWindow__errorDescription">
          {error}
        </h3>
      </div>
    </div>
  );
};
