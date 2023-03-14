import React from "react";
import styles from "./styles.module.css";

const LoadingComponent: React.FC<IProps> = () => {
  return (
    <div className={styles.loadingWrapper}>
      <div className={styles.loadingBar} />
      <div className={styles.loadingBar} />
      <div className={styles.loadingBar} />
      <div className={styles.loadingBar} />
    </div>
  );
};

export default LoadingComponent;

export interface IProps {}

