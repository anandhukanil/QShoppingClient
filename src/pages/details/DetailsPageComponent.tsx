import React, { useState } from "react";
import { FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import RatingComponent from "../../components/RatingComponent";
import { IProduct, IState, Types } from "../../types";
import ImageHolder from "./components/ImageHolder";
import styles from "./styles.module.css";

const DetailsPageComponent: React.FC<IProps> = ({ product }) => {
  const [itemCount, setItemCount] = useState<number>(1);
  const { wishListItems } = useSelector((state: IState) => state.users);
  const dispatch = useDispatch();

  const wishListed = wishListItems.some((item) => item.id === product.id);

  const onWhishListClick = () => {
    if (wishListed) {
      dispatch({ type: Types.REMOVE_FROM_WISHLIST, payload: product });
    } else {
      dispatch({ type: Types.ADD_TO_WISHLIST, payload: product });
    }
  };

  const onAddToCartClick = () => {
    dispatch({ type: Types.ADD_TO_CART, payload: product });
  };

  const onRemoveFromCartClick = () => {
    dispatch({ type: Types.REMOVE_FROM_CART, payload: product });
  };

  return (
    <div className={styles.productCardWrapper}>
      <div className={styles.productContainer}>
        <ImageHolder images={[product?.image, ...imageUrls]}/>
        <div className={styles.productContent}>
          <h2 className={styles.productTitle}>{product?.title}</h2>
          <a href="#" className={styles.productCategory}>{product?.category}</a>
          <div className={styles.productDetail}>
            <p>{product?.description}</p>
            {/* <ul>
              <li>Color: <span>Black</span></li>
              <li>Available: <span>in stock</span></li>
              <li>Category: <span>Shoes</span></li>
              <li>Shipping Area: <span>All over the world</span></li>
              <li>Shipping Fee: <span>Free</span></li>
            </ul> */}
          </div>
          <div className={styles.productRating}>
            <RatingComponent count={product?.rating?.count} rating={product?.rating?.rate} />
          </div>
          <div className={styles.productPrice}>
            <h3>$ {product?.price.toFixed(2)}</h3>
          </div>
          <div className={styles.purchaseInfo}>
            <div>
              <button onClick={() => setItemCount((prev) => prev-1)} disabled={itemCount === 1}>
                <FaMinus />
              </button>
              <span>{itemCount}</span>
              <button onClick={() => setItemCount((prev) => prev+1)}>
                <FaPlus />
              </button>
            </div>
            <p>Only few items left. Don&apos;t miss it!</p><br />
            <button className={styles.primaryButton}>Buy Now</button>
            <button onClick={onAddToCartClick}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPageComponent;

export interface IProps {
  product: IProduct;
}

const imageUrls = [
  "https://via.placeholder.com/500x500?text=Image+1",
  "https://via.placeholder.com/500x500?text=Image+2",
  "https://via.placeholder.com/500x500?text=Image+3",
  "https://via.placeholder.com/500x500?text=Image+4",
];
