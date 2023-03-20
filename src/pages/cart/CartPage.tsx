import React, { useMemo, useState } from "react";
import { FaMinus, FaPlus, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { emptyCart, orderDelivered } from "../../assets";
import CardWithHeader from "../../components/CardWithHeader";
import ErrorPage from "../../components/ErrorPage";
import { formatCurrency } from "../../helpers.ts";
import { IProduct, IState, NotificationTypes, Types } from "../../types";
import styles from "./styles.module.css";

const CartPage: React.FC<IProps> = () => {
  const { cartItems } = useSelector((state: IState) => state.users);
  const dispatch = useDispatch();
  const [checkOut, setCheckOut] = useState<boolean>(false);

  const onRemoveFromCart = (item: typeof cartItems[0]) => {
    dispatch({
      type: Types.REMOVE_FROM_CART,
      payload: { product: item?.item, count: item?.count }
    });
    dispatch({
      type: Types.SET_NOTIFICATION,
      payload: { type: NotificationTypes.Success, message: "Item removed from Cart!" }
    });
  };
  const addItemCount = (item: typeof cartItems[0]) => {
    dispatch({
      type: Types.ADD_TO_CART,
      payload: { product: item?.item }
    });
  };
  const removeItemCount = (item: typeof cartItems[0]) => {
    dispatch({
      type: Types.REMOVE_FROM_CART,
      payload: { product: item?.item }
    });
  };
  const onCheckoutClick = () => {
    dispatch({
      type: Types.CHECKOUT_CART_ITEMS,
    });
    setCheckOut(true);
  };

  const totalActualPrice = useMemo(() => getOriginalPrice(cartItems),[cartItems]);
  const totalDiscountPrice = useMemo(() => getDiscountPrice(cartItems),[cartItems]);

  if (checkOut) {
    return (
      <ErrorPage
        image={orderDelivered}
        title="Order Placed!"
        description="Your order is placed. Continue shopping for more offers."
      />
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
            <img src={item?.item.thumbnail} />
            <div className={styles.cartProductPrice}>
              <h3>{item?.item.title}</h3>
              <div className={styles.cartRightWrapper}>
                <div>
                  <div>
                    <button onClick={() => removeItemCount(item)} disabled={item?.count === 1}>
                      <FaMinus />
                    </button>
                    <span>{item?.count}</span>
                    <button onClick={() => addItemCount(item)} disabled={item?.count === item?.item?.stock}>
                      <FaPlus />
                    </button>
                  </div>
                  <h4>{formatCurrency(item?.item.price * item?.count)}</h4>
                </div>
                <FaTimes onClick={() => onRemoveFromCart(item)} />
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
        <div className={styles.cartButtonWrapper}>
          <button onClick={onCheckoutClick}>Proceed To Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

export interface IProps {}

const getOriginalPrice = (cartItems: {item: IProduct; count: number;}[]) => {
  let totalPrice = 0;
  cartItems?.forEach((cartItem) => {
    totalPrice += (
      cartItem?.item.price / ((100 - cartItem?.item.discountPercentage) / 100)
    ) * cartItem?.count;
  });

  return totalPrice;
};
const getDiscountPrice = (cartItems: {item: IProduct; count: number;}[]) => {
  let totalDiscount = 0;
  cartItems?.forEach((cartItem) => {
    totalDiscount += (
      (cartItem?.item.price / (1-cartItem?.item.discountPercentage / 100))
      - cartItem?.item.price
    ) * cartItem?.count;
  });

  return totalDiscount;
};