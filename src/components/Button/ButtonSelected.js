import React, { memo } from "react";

const ButtonSelected = ({ data, selected, onClick }) => {
  return (
    <div className="button-selected">
      {data.map((d, i) => (
        <div className="wrap-button" key={i}>
          <button
            className={`wrap-button ${d.name === selected && "is-active"}`}
            onClick={() => onClick(d.name)}
          >
            {d.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export default memo(ButtonSelected);
