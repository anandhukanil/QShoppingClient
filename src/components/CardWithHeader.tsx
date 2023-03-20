import React, { PropsWithChildren } from "react";
import styles from "./styles.module.css";

const CardWithHeader: React.FC<PropsWithChildren<IProps>> = (props) => {

  return (
    <div className={styles.cardWithHeaderContainer}>
      {props.title && <div className={styles.cardWithHeaderHeader}>{props.title}</div>}
      <div>
        {props.children}
      </div>
    </div>
  );
};

export default CardWithHeader;

export interface IProps {
  title: string;
}