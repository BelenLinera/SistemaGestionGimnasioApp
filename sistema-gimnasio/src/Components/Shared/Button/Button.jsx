import React from 'react';

import './Button.css';

export function Button({ action, text, img, classNameButton, icon }) {
  return (
    <div>
      {img ? (
        <img
          className="icon"
          src={img}
          alt={text}
          onClick={action ? action : undefined}
        />
      ) : (
        <button
          className={`button ${[classNameButton]} `}
          onClick={action ? action : undefined}
        >
          {text}
          {icon}
        </button>
      )}
    </div>
  );
}

