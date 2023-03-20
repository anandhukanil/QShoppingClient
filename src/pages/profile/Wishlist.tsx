import React from "react";
import { useSelector } from "react-redux";
import { wishlist } from "../../assets";
import ErrorPage from "../../components/ErrorPage";
import ProductCard from "../../components/ProductCard";
import { IState } from "../../types";
import styles from "./styles.module.css";

const Wishlist: React.FC<IProps> = () => {
  const { wishListItems } = useSelector((state: IState) => state.users);

  if (!wishListItems?.length) {
    return (
      <ErrorPage
        image={wishlist}
        imageClassName={styles.wishlistImage}
        title="No Items In Wishlist!"
        description="Continue shopping add some items to wishlist."
      />
    );
  }

  return (
    <div className={styles.wishlistPageWrapper}>
      <h2>Wishlist Items</h2>
      <div className={styles.wishlistItemsContainer}>
        {wishListItems.map((item) => (
          <ProductCard
            key={item.id}
            product={item}
          />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;

export interface IProps {}