import React, { useRef, useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { createSearchParams, useNavigate } from "react-router-dom";
import { routes } from "../routes/routes";
import styles from "./styles.module.css";

const Search: React.FC<IProps> = () => {
  const [active, setActive] = useState<boolean>(false);
  const ref = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const onClick = () => {
    if (ref?.current) {
      ref.current.value = ""; 
    }
    setActive((prevState) => !prevState);
    ref?.current?.focus();
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      navigate({
        pathname: routes.products.path,
        search: `?${createSearchParams({ search: ref.current?.value as string })}`,
      });
    }
  };

  return (
    <div
      className={styles.searchWrapper + (active ? ` ${styles.searchActive}` : "")}
    >
      <input
        type="text"
        ref={ref}
        onKeyDown={onKeyDown}
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