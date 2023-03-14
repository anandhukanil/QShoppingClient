import React from "react";
import { useSelector } from "react-redux";
import LoadingComponent from "../../../components/LoadingComponent";
import ProductCard from "../../../components/ProductCard";
import { IState } from "../../../types";
import styles from "../styles.module.css";

const SuggestedProducts: React.FC<IProps> = () => {
  const { products } = useSelector((state: IState) => state.products);

  return (
    <div>
      <h2 className={styles.suggestionLabelText}>Suggested For You!</h2>
      {products?.length ? (
        <div className={styles.productCardWrapper}>
          {products.slice(0,10).map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      ) : (
        <div style={{ margin: "4em" }}>
          <LoadingComponent />
        </div>
      )
      }
    </div>
  );
};

export default SuggestedProducts;

export interface IProps {}