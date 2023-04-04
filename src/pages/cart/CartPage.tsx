import React, { useMemo, useState } from "react";
import { FaMinus, FaPlus, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { checkoutOrder } from "../../apis/users";
import { emptyCart, orderDelivered } from "../../assets";
import CardWithHeader from "../../components/CardWithHeader";
import ErrorPage from "../../components/ErrorPage";
import LoadingComponent from "../../components/LoadingComponent";
import { formatCurrency } from "../../helpers";
import { routes } from "../../routes/routes";
import { IAddress, IProduct, IState, LocalData, NotificationTypes, Types } from "../../types";
import styles from "./styles.module.css";

const CartPage: React.FC<IProps> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { cartItems, currentUser } = useSelector((state: IState) => state.users);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [checkOut, setCheckOut] = useState<boolean>(false);

  const onRemoveFromCart = async (item: typeof cartItems[0]) => {
    setLoading(true);
    try {
      dispatch({
        type: Types.REMOVE_FROM_CART,
        payload: { product: item?.item, count: item?.count, userId: currentUser?.id }
      });
      dispatch({
        type: Types.SET_NOTIFICATION,
        payload: { type: NotificationTypes.Success, message: "Item removed from Cart!" }
      });
    } catch (error) {
      dispatch({
        type: Types.SET_NOTIFICATION,
        payload: { type: NotificationTypes.Error, message: "Failed to remove item!" }
      });
    }
    setLoading(false);
  };
  const addItemCount = async (item: typeof cartItems[0]) => {
    setLoading(true);
    try {
      dispatch({
        type: Types.ADD_TO_CART,
        payload: { product: item?.item, userId: currentUser?.id }
      });
    } catch (error) {
      dispatch({
        type: Types.SET_NOTIFICATION,
        payload: { type: NotificationTypes.Error, message: "Failed to add item!" }
      });
    }
    setLoading(false);
  };
  const removeItemCount = async (item: typeof cartItems[0]) => {
    setLoading(true);
    try {
      dispatch({
        type: Types.REMOVE_FROM_CART,
        payload: { product: item?.item, userId: currentUser?.id }
      });
    } catch (error) {
      dispatch({
        type: Types.SET_NOTIFICATION,
        payload: { type: NotificationTypes.Error, message: "Failed to add item!" }
      });
    }
    setLoading(false);
  };
  const onCheckoutClick = async () => {
    setLoading(true);
    if (!currentUser) {
      dispatch({
        type: Types.SET_NOTIFICATION,
        payload: { type: NotificationTypes.Info, message: "Please login to checkout!" }
      });
      navigate(routes.login.path, { state: { from: location } });
      return;
    } else if (!currentUser.address) {
      dispatch({
        type: Types.SET_NOTIFICATION,
        payload: { type: NotificationTypes.Info, message: "Please update address to checkout!" }
      });
      setLoading(false);
      return;
    }
    try {
      const response = await checkoutOrder(cartItems, currentUser.id);
      dispatch({
        type: Types.CHECKOUT_CART_ITEMS,
      });
      dispatch({
        type: Types.SET_CURRENT_USER,
        payload: response?.data,
      });
      setCheckOut(true);
    } catch (error) {
      dispatch({
        type: Types.SET_NOTIFICATION,
        payload: { type: NotificationTypes.Error, message: "Failed to checkout!" }
      });
    }
    setLoading(false);
  };

  const totalActualPrice = useMemo(() => getOriginalPrice(cartItems), [cartItems]);
  const totalDiscountPrice = useMemo(() => getDiscountPrice(cartItems), [cartItems]);

  if (checkOut) {
    return (
      <ErrorPage
        image={orderDelivered}
        title="Order Placed!"
        description="Your order is placed. Continue shopping for more offers."
      />
    );
  }

  if (isUserLoggedIn() && !currentUser) {
    return (
      <div>
        <div style={{ margin: "4em" }}>
          <LoadingComponent />
        </div>
      </div>
    );
  }

  if (!cartItems?.length) {
    return (
      <ErrorPage
        image={emptyCart}
        title="Your Cart Is Empty!"
        description="Continue shopping add some items to checkout."
      />
    );
  }


  return (
    <div className={styles.cartWrapper}>
      <CardWithHeader
        title="Review Item and Shipping"
      >
        {cartItems?.map((item) => (
          <div className={styles.categoryCardWrapper} key={item?.item.id}>
            <img src={item?.item?.thumbnail} />
            <div className={styles.cartProductPrice}>
              <h3>{item?.item.title}</h3>
              <div className={styles.cartRightWrapper}>
                <div>
                  <div>
                    <button
                      onClick={() => removeItemCount(item)}
                      disabled={(item?.count === 1) || loading}
                    >
                      <FaMinus />
                    </button>
                    <span>{item?.count}</span>
                    <button
                      onClick={() => addItemCount(item)}
                      disabled={(item?.count === item?.item?.stock) || loading}
                    >
                      <FaPlus />
                    </button>
                  </div>
                  <h4>{formatCurrency(item?.item?.price * item?.count)}</h4>
                </div>
                <FaTimes
                  className={loading ? styles.disabledCartCloseButtonStyles : ""}
                  onClick={loading ? undefined : () => onRemoveFromCart(item)}
                />
              </div>
            </div>
          </div>
        ))}
      </CardWithHeader>
      <div>
        <CardWithHeader
          title="Payment Summary"
        >
          <div className={styles.cartPaymentSummaryItem}>
            <span>Price ({cartItems?.length})</span>
            <span>{formatCurrency(totalActualPrice)}</span>
          </div>
          <div className={styles.cartPaymentSummaryItem}>
            <span>Discount</span>
            <span className={styles.discountItem}>-{formatCurrency(totalDiscountPrice)}</span>
          </div>
          <div className={styles.cartPaymentSummaryItem}>
            <span>Delivery Charges</span>
            <span className={styles.discountItem}>Free</span>
          </div>
          <div className={styles.cartPaymentSummaryItem}>
            <h3>Total Amount</h3>
            <h3>{formatCurrency(totalActualPrice - totalDiscountPrice)}</h3>
          </div>
          <div className={styles.cartPaymentSummaryItem}>
            <div className={styles.discountItem}>
              You will save {formatCurrency(totalDiscountPrice)} on this order
            </div>
          </div>
        </CardWithHeader>
        {currentUser && currentUser.address && (<CardWithHeader
          title="Shipping"
        >
          <div className={styles.cartPaymentSummaryItem}>Deliver To:</div>
          <div className={styles.addressDataWrapper}>
            {Object.keys(currentUser?.address as IAddress)
              .filter((key) => key !== "_id")
              .map((key) => (currentUser?.address as IAddress)[key as keyof IAddress])
              .join(", ")}
          </div>
        </CardWithHeader>
        )}
        <div className={styles.cartButtonWrapper}>
          <button onClick={onCheckoutClick} disabled={loading}>Proceed To Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

export interface IProps { }

const getOriginalPrice = (cartItems: { item: IProduct; count: number; }[]) => {
  let totalPrice = 0;
  cartItems?.forEach((cartItem) => {
    totalPrice += (
      cartItem?.item?.price / ((100 - cartItem?.item?.discountPercentage) / 100)
    ) * cartItem?.count;
  });

  return totalPrice;
};
const getDiscountPrice = (cartItems: { item: IProduct; count: number; }[]) => {
  let totalDiscount = 0;
  cartItems?.forEach((cartItem) => {
    totalDiscount += (
      (cartItem?.item?.price / (1 - cartItem?.item?.discountPercentage / 100))
      - cartItem?.item?.price
    ) * cartItem?.count;
  });

  return totalDiscount;
};

const isUserLoggedIn = () => !!localStorage.getItem(LocalData.RefreshToken);