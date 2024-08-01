import React, { Children } from "react";
import * as styles from "./button.module.css";

type myProps = {
  children: string;
  color: string;
  onClick?: (e: any) => void;
};

export function MyButton(p: myProps) {
  return (
    <div>
      <button
        onClick={p.onClick}
        className={`${styles.button} ${styles[p.color]}`}
      >
        {p.children}
      </button>
    </div>
  );
}
