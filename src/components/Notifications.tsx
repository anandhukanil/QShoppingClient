import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import colors from "../const/colors";
import icons from "../const/icons";
import { IState, Types } from "../types";
import styles from "./styles.module.css";

const Notifications: React.FC<IProps> = () => {
  const dispatch = useDispatch();
  const { type, message } = useSelector((state: IState) => state.notification);

  useEffect(() => {
    let timer: NodeJS.Timer;
    if (message) {
      timer = setTimeout(() => {
        handleClose();
      }, 5000);
    }
    return () => { if (timer) clearTimeout(timer); };
  }, [message]);

  const handleClose = () => {
    dispatch({ type: Types.CLEAR_NOTIFICATION });
  };

  const Icon = icons[type];

  return (
    <div
      className={styles.toast + (message ? ` ${styles.toastActive}` : "")}
      id="toast"
    >
      {message && <Icon style={{ color: colors[type] }} />}
      <p className={styles.toastText}>{message}</p>
      <FaTimes id="close" onClick={handleClose} />
    </div>
  );
};

export default Notifications;

export interface IProps {}