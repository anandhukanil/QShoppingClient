import React from "react";
import { useSelector } from "react-redux";
import { wishlist } from "../../assets";
import ErrorPage from "../../components/ErrorPage";
import LoadingComponent from "../../components/LoadingComponent";
import ProductCard from "../../components/ProductCard";
import { IState } from "../../types";
import styles from "./styles.module.css";

const Wishlist: React.FC<IProps> = () => {
  const { currentUser } = useSelector((state: IState) => state.users);

  if (!currentUser) {
    return (
      <div>
        <div style={{ margin: "4em" }}>
          <LoadingComponent />
        </div>
      </div>
    );
  }

  if (!currentUser?.wishlistItems?.length) {
    return (
      <ErrorPage
        image={wishlist}
        imageClassName={styles.wishlistImage}
        title="No Items In Wishlist!"
        description="Continue shopping and add some items to wishlist."
      />
    );
  }

  return (
    <div className={styles.wishlistPageWrapper}>
      <h2>Wishlist Items</h2>
      <div className={styles.wishlistItemsContainer}>
        {currentUser?.wishlistItems?.map((item) => (
          // <div key={item.id}>
          <ProductCard
            key={item.id}
            product={item}
          />
          // </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;

export interface IProps {}