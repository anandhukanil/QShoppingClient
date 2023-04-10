import React, { useRef, useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { createSearchParams, useNavigate } from "react-router-dom";
import { routes } from "../routes/routes";
import { NotificationTypes, Types } from "../types";
import styles from "./styles.module.css";

const Search: React.FC<IProps> = () => {
  const [active, setActive] = useState<boolean>(false);
  const ref = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClick = () => {
    if (ref?.current) {
      ref.current.value = ""; 
    }
    setActive((prevState) => !prevState);
    ref?.current?.focus();
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      if ((ref.current?.value as string)?.length < 3) {
        dispatch({
          type: Types.SET_NOTIFICATION,
          payload: { type: NotificationTypes.Error, message: "Please type at least 3 character!" }
        });
        return;
      }
      navigate({
        pathname: routes.products.path,
        search: `?${createSearchParams({ search: ref.current?.value as string })}`,
      });
    }
  };

  const onBlur = () => {
    if (ref?.current) {
      ref.current.value = ""; 
    }
    setActive(false);
  };

  return (
    <div
      className={styles.searchWrapper + (active ? ` ${styles.searchActive}` : "")}
    >
      <input
        type="text"
        ref={ref}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        className={styles.searchInput}
        placeholder={active? "Search..." : ""}
      />
      <button className={styles.searchButton} onClick={onClick}>
        {active ? <FaTimes /> : <FaSearch />}
      </button>
    </div>
  );
};

export default Search;

export interface IProps {}