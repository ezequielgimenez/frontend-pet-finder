import React from "react";
import styles from "./card.module.css";

type myProps = {
  imgSrc?: string;
  id: number;
  title: string;
  description: string;
  color?: string;
  textButton: string;
  sendData?: () => void;
};

export function Card(p: myProps) {
  return (
    <div className={styles.card}>
      <img src={p.imgSrc} alt="" className={styles.cardImage} />
      <div className={styles.cardContent}>
        <h2 className={styles.cardTitle}>{p.title}</h2>
        <p className={styles.cardDescription}>{p.description}</p>
        <button
          className={`${styles.cardButton} ${styles[p.color]}`}
          onClick={p.sendData}
        >
          {p.textButton}
        </button>
      </div>
    </div>
  );
}
