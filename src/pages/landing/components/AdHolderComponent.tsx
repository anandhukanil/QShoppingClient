import React from "react";
import Advertisement from "../../../components/Advertisement";
import styles from "../styles.module.css";

const AdWrapperComponent: React.FC<IProps> = () => {
  return (
    <div className={styles.adContainer}>
      <Advertisement />
      <Advertisement />
    </div>
  );
};

export default AdWrapperComponent;

export interface IProps {}