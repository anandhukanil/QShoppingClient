import axios from "axios";
import React, { useEffect, useState } from "react";
import { IProduct } from "../types";
import LoadingComponent from "./LoadingComponent";
import styles from "./styles.module.css";

const Advertisement: React.FC<IProps> = () => {
  const [product, setProduct] = useState<IProduct>();

  useEffect(() => {
    (async () => {
      const data = await axios.get(`/products/${Math.floor((Math.random() * 20) + 1)}`);
      setProduct(data?.data);
    })();
  }, []);

  return (
    <div className={styles.adWrapper}>
      {product
        ? (
          <>
            <div className={styles.adTextWrapper}>
              <h2 className={styles.adTextDiscount}>New Arrival!</h2>
              <div className={styles.adTextTitle}>{product.title}</div>
              <p className={styles.adTextDescription}>{product.description}</p>
              <button>Buy Now!</button>
            </div>
            <img src={product.image} />
          </>
        )
        : <LoadingComponent />
      }
    </div>
  );
};

export default Advertisement;

export interface IProps {
}