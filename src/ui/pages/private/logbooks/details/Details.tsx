"use client";
import React from "react";
import styles from "./styles.module.css";

export type DetailsProps = {};

const Details: React.FC<DetailsProps> = () => {
  return <div className={styles.details}>Details works!</div>;
};

export default Details;
