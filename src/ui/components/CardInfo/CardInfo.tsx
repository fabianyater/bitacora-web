import React from "react";
import styles from "./styles.module.css";

export type CardInfoProps = {
  icon?: React.ReactNode;
  title: string;
  children: React.ReactNode;
};

const CardInfo: React.FC<CardInfoProps> = ({ icon, title, children }) => {
  return (
    <article className={styles.cardInfo}>
      <header>
        <div className={styles.icon}>{icon}</div>
        <h2>{title}</h2>
      </header>
      <div className={styles.content}>{children}</div>
    </article>
  );
};

export default CardInfo;
