import React from "react";
import styles from "./styles.module.css";

const Card: React.FC<IProps> = (props) => {
  return (
    <div className={styles.cardWrapper}>
      <img src={props.imageUrl} />
      <div className={styles.cardBody}>
        <h2>{props.title}</h2>
        <p>{props.description}</p>
        <h5>{props.footer}</h5>
      </div>
    </div>
  );
};

export default Card;

export interface IProps {
    imageUrl: string;
    title: string;
    description: string;
    footer: string;
}