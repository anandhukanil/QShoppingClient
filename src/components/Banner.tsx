import React from "react";
import styles from "./styles.module.css";
import {banner1} from "../assets";
import { createSearchParams, useNavigate } from "react-router-dom";
import { routes } from "../routes/routes";

const Banner: React.FC<IProps> = () => {
  const navigate = useNavigate();

  const onButtonClick = () => {
    navigate({
      pathname: routes.products.path,
      search: `?${createSearchParams({ category: "headphones" })}`,
    });
  };

  return (
    <div className={styles.bannerWrapper}>
      <div>
        <h1>Grab Upto 50% Discount<br/>On Selected Headphones</h1>
        <button onClick={onButtonClick}>Shop Now</button>
      </div>
      <img src={banner1} />
    </div>
  );
};

export default Banner;

export interface IProps {}