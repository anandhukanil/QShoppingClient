import React from "react";
import { pageNotFound } from "../assets";
import styles from "./styles.module.css";

const ErrorPage: React.FC<IProps> = (props) => {
  return (
    <div
      className={
        !props.disableFullPage
          ? `${styles.errorFullPageWrapper} ${props.removePaddingOnFullPage ? styles.removePadding : ""}`
          : styles.errorPageWrapper
      }
    >
      <img src={props.image||pageNotFound} className={props.imageClassName} />
      <div>
        <h1>{props.title||"Page not Found!"}</h1>
        <p>{props.description||"The page you are looking for cannot be found."}</p>
        {props.Component && <props.Component />}
      </div>
    </div>
  );
};

export default ErrorPage;

export interface IProps {
  disableFullPage?: boolean;
  image?: string;
  title?: string;
  description?: string;
  Component?: React.FC;
  imageClassName?: string;
  removePaddingOnFullPage?: boolean;
}