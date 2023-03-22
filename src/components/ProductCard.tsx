import React, { useMemo } from "react";
import { IProduct, IState, NotificationTypes, Types } from "../types";
import RatingComponent from "./RatingComponent";
import { FaHeart, FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa";
import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { generatePath, Link } from "react-router-dom";

const ProductCard: React.FC<IProps> = ({ product }) => {
  const { wishListItems, cartItems } = useSelector((state: IState) => state.users);
  const dispatch = useDispatch();
  const path = generatePath("/products/:id", {id: String(product.id)});

  const wishListed = wishListItems.some((item) => item.id === product?.id);
  const itemInCartCount = useMemo(() => cartItems
    .find((cartItem) => cartItem.item.id === product?.id)?.count,
  [cartItems]);

  const onWhishListClick = () => {
    if (wishListed) {
      dispatch({ type: Types.REMOVE_FROM_WISHLIST, payload: product });
    } else {
      dispatch({ type: Types.ADD_TO_WISHLIST, payload: product });
      dispatch({
        type: Types.SET_NOTIFICATION,
        payload: { type: NotificationTypes.Success, message: "Item added to Wishlist!" }
      });
    }
  };

  const onAddToCartClick = () => {
    dispatch({ type: Types.ADD_TO_CART, payload: { product } });
  };

  const onRemoveFromCartClick = () => {
    dispatch({ type: Types.REMOVE_FROM_CART, payload: {product} });
  };

  return (
    <div className={styles.productCardWrapper}>
      <div
        className={wishListed ? `${styles.wishList} ${styles.liked}` : styles.wishList}
        onClick={onWhishListClick}
      >
        <FaHeart />
      </div>
      <div className={styles.productThumbnail}>
        <img src={product.thumbnail} alt={product.title} />
      </div>
      <div className={styles.productDetails}>
        <span className={styles.productCategory}>{product.category}</span>
        <h4><Link to={path}>{product.title}</Link></h4>
        <div className={styles.ratingsWrapper}>
          <RatingComponent rating={product.rating} count={product?.stock*11} />
        </div>
        <p>{product.description}</p>
        <div className={styles.productBottomDetails}>
          <div className={styles.productPrice}>${product.price}</div>
          <div className={styles.productLinks}>
            {itemInCartCount
              ? (
                <>
                  <button onClick={onRemoveFromCartClick}>
                    <FaMinus />
                  </button>
                  <span className={styles.productPrice}>{itemInCartCount}</span>
                  <button onClick={onAddToCartClick}>
                    <FaPlus />
                  </button>
                </>
              )
              : (<button className={styles.cartButton} onClick={onAddToCartClick}>
                Add to Cart
                <FaShoppingCart />
              </button>)
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

export interface IProps {
  product: IProduct;
}