import React, { useEffect, useState } from "react";
import { getProduct } from "../apis/products";
import { warning } from "../assets";
import { IProduct } from "../types";
import ErrorPage from "./ErrorPage";
import LoadingComponent from "./LoadingComponent";
import styles from "./styles.module.css";

const Advertisement: React.FC<IProps> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<IProduct>();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await getProduct(Math.floor((Math.random() * 20) + 1));
        setProduct(data?.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className={styles.adWrapper}>
        <LoadingComponent />
      </div>
    );
  }

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
            <img src={product.images[0]} />
          </>
        )
        : (
          <ErrorPage
            disableFullPage
            title="Something went wrong"
            image={warning}
            description="Failed to load data! Please reload the browser."
          />
        )
      }
    </div>
  );
};

export default Advertisement;

export interface IProps {
}