import React from "react";
import * as styles from "./button.module.css";

type myProps = {
  type?: "button" | "submit" | "reset";
  children: string;
  color: string;
  onClick?: (e: any) => void;
};

export function MyButton(p: myProps) {
  return (
    <div>
      <button
        type={p.type}
        onClick={p.onClick}
        className={`${styles.button} ${styles[p.color]}`}
      >
        {p.children}
      </button>
    </div>
  );
}
