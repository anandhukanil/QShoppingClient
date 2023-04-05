import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCreditCard, FaMinus, FaPlus, FaShippingFast, FaShoppingBag } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import RatingComponent from "../../../components/RatingComponent";
import { IProduct, IState, NotificationTypes, Types } from "../../../types";
import ImageHolder from "./ImageHolder";
import styles from "../styles.module.css";
import { formatCurrency, getActualPrice } from "../../../helpers";
import { routes } from "../../../routes/routes";
import LoadingComponent from "../../../components/LoadingComponent";
import { wishlistItem } from "../../../apis/users";

const DetailsPageComponent: React.FC<IProps> = ({ product }) => {
  const [loading, setLoading] = useState<boolean>();
  const [itemCount, setItemCount] = useState<number>(1);
  const { users: {currentUser, cartItems}, products: {dataLoading} } = useSelector((state: IState) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const wishListed = currentUser?.wishlistItems?.some((item) => item.id === product?.id);

  const onWishlistClick = async () => {
    if (!currentUser) {
      dispatch({
        type: Types.SET_NOTIFICATION,
        payload: { type: NotificationTypes.Info, message: "Please login to wishlist!" }
      });
      return;
    }
    setLoading(true);
    try {
      const response = await wishlistItem(product, currentUser?.id as string, (wishListed ? "remove" : "add"));
      dispatch({
        type: Types.SET_CURRENT_USER,
        payload: response?.data,
      });
      dispatch({
        type: Types.SET_NOTIFICATION,
        payload: { type: NotificationTypes.Success, message: "Item added to Wishlist!" }
      });
    } catch (error) {
      dispatch({
        type: Types.SET_NOTIFICATION,
        payload: { type: NotificationTypes.Error, message: "Failed to add to Wishlist!" }
      });
    }
    setLoading(false);
  };

  const onAddToCartClick = () => {
    dispatch({ type: Types.ADD_TO_CART, payload: {
      product, count: itemCount, userId: currentUser?.id
    }});
    dispatch({
      type: Types.SET_NOTIFICATION,
      payload: { type: NotificationTypes.Success, message: "Item added to Cart!" }
    });
  };

  const onBuyNowClick = () => {
    const itemAdded = cartItems?.some((cart) => (cart?.item?.id === product?.id)
      && (cart?.count >= itemCount));

    if(!itemAdded) {
      dispatch({ type: Types.ADD_TO_CART, payload: {
        product, count: itemCount, userId: currentUser?.id
      }});
    }

    navigate(routes.cart.path);
  };

  const outOfStock = useMemo(() => product?.stock < 1, [product]);


  if (dataLoading) {
    return (
      <div className={styles.productDetailsPageLoadingWrapper}>
        <LoadingComponent />
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "white" }}>
      <div className={styles.productCardWrapper}>
        <div className={styles.productContainer}>
          <ImageHolder
            images={product?.images}
            onWishlistClick={onWishlistClick}
            wishListed={wishListed}
            loading={loading}
          />
          <div className={styles.productContent}>
            <h2 className={styles.productTitle}>{product?.title}</h2>
            <a href="#" className={styles.productCategory}>{product?.category}</a>
            <div className={styles.productDetail}>
              <p>{product?.description}</p>
            </div>
            <div className={styles.productRating}>
              <RatingComponent count={product?.stock*11} rating={product?.rating} />
            </div>
            <div className={styles.productPrice}>
              <h3>{formatCurrency(product?.price)}</h3>
              <span className={styles.oldPrice}>
                {getActualPrice(product?.price, product?.discountPercentage)}
              </span>
              <span>{product?.discountPercentage}% off</span>
            </div>
            <div className={styles.purchaseInfo}>
              {(product?.stock >= 1) && (<div>
                <button onClick={() => setItemCount((prev) => prev-1)} disabled={itemCount === 1}>
                  <FaMinus />
                </button>
                <span>{itemCount}</span>
                <button onClick={() => setItemCount((prev) => prev+1)}disabled={itemCount === product?.stock}>
                  <FaPlus />
                </button>
              </div>)}
              {(product?.stock < 100) && (
                outOfStock
                  ? (
                    <p className={styles.outOfStockLabelStyles}>Out of Stock</p>
                  )
                  : (
                    <>
                      <p>Only <span>{product?.stock}</span> items left!<br/>Don&apos;t miss it.</p>
                    </>
                  )
              )
              }
              <br />
              {!outOfStock && (
                <>
                  <button onClick={onBuyNowClick} className={styles.primaryButton}>Buy Now</button>
                  <button onClick={onAddToCartClick}>Add to Cart</button>
                </>
              )}
            </div>
            <div className={styles.productOfferWrapper}>
              <div className={styles.productOffer}>
                <div>
                  <FaShippingFast />
                  <h4>Free Shipping</h4>
                </div>
                <p>Enjoy free shipping for orders above $100.</p>
              </div>
              <div className={styles.productOffer}>
                <div>
                  <FaShoppingBag />
                  <h4>Return Policy</h4>
                </div>
                <p>Free return upto 7 days for all products.</p>
              </div>
              <div className={styles.productOffer}>
                <div>
                  <FaCreditCard />
                  <h4>Card Offer</h4>
                </div>
                <p>Upto 15% off on selected debit cards.</p>
              </div>
            </div>
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