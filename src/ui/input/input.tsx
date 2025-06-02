import React, { useState } from "react";
import * as style from "./input.module.css";

type myProp = {
  type: string;
  name: string;
  color?: string;
  onChange?: (e) => void;
  onShowButton?: boolean;
};

export function MyInput(p: myProp) {
  const [showButton, setShowButton] = useState(false);
  const handleShowButton = () => {
    setShowButton(!showButton);
  };
  return (
    <div className={style.mainInput}>
      <input
        className={`${style.input} ${style[p.color]}`}
        type={showButton ? "text" : p.type}
        name={p.name}
        onChange={p.onChange}
      />
      {p.onShowButton ? (
        <button
          type="button"
          onClick={handleShowButton}
          className={style.showButton}
        >
          👀
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
