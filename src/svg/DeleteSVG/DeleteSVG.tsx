import React from 'react';
import './DeleteSVG.scss';

export const DeleteSVG = () => {
  return (
    <div className="DeleteSVG">
      <svg fill="rgb(60, 60, 60)" xmlns="http://www.w3.org/2000/svg" height="24" width="24">
        <path d="m9.4 16.5 2.6-2.6 2.6 2.6 1.4-1.4-2.6-2.6L16 9.9l-1.4-1.4-2.6 2.6-2.6-2.6L8 9.9l2.6 2.6L8 15.1ZM7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21ZM17 6H7v13h10ZM7 6v13Z" />
      </svg>
    </div>
  );
};