import React from "react";
import styles from "./styles.module.css";
import {banner1} from "../assets";

const Banner: React.FC<IProps> = () => {
  return (
    <div className={styles.bannerWrapper}>
      <div>
        <h1>Grab Upto 50% Discount<br/>On Selected Headphones</h1>
        <button>Shop Now</button>
      </div>
      <img src={banner1} />
    </div>
  );
};

export default Banner;

export interface IProps {}