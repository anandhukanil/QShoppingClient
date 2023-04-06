import React from "react";
import { useSelector } from "react-redux";
import { emptyCart } from "../../assets";
import CardWithHeader from "../../components/CardWithHeader";
import ErrorPage from "../../components/ErrorPage";
import LoadingComponent from "../../components/LoadingComponent";
import { formatCurrency } from "../../helpers";
import { IProduct, IState } from "../../types";
import styles from "../cart/styles.module.css";


const Orders: React.FC<IProps> = () => {
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

  if (!currentUser.orders?.length) {
    return (
      <ErrorPage
        image={emptyCart}
        title="No Orders found!"
        description="Continue shopping add purchase some items."
      />
    );
  }

  return (
    <div className={styles.fullWidthContents}>
      <h2>Orders</h2>
      {currentUser?.orders && [...currentUser.orders]
        .sort((a, b) => (+new Date(b.ordered) - +new Date(a.ordered)))
        .map((order) => (
          <CardWithHeader
            titleComponent={getTitleComponent(order.ordered, order._id)}
            key={order.ordered}
          >
            {order.items?.map((item) => (
              <div className={styles.categoryCardWrapper} key={item?.item.id}>
                <img src={item?.item.thumbnail} />
                <div className={styles.cartProductPrice}>
                  <h3>{item?.item.title}</h3>
                  <div className={styles.cartRightWrapper}>
                    <div>
                      <div>
                        {item.count} item(s)
                      </div>
                      <h4>{formatCurrency(item?.item.price * item?.count)}</h4>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className={styles.cartPaymentSummaryItem}>
              <h3>Total Amount</h3>
              <h3>{formatCurrency(getTotalPrice(order.items))}</h3>
            </div>
          </CardWithHeader>
        ))}
    </div>
  );
};

export default Orders;

export interface IProps {}

const getTotalPrice = (data: {item: IProduct, count: number}[]) => {
  let totalPrice = 0;
  data?.forEach((items) => {
    totalPrice += (items?.item.price) * items?.count;
  });

  return totalPrice;
};

// eslint-disable-next-line react/display-name
const getTitleComponent = (ordered: string, id: string): React.FC => (() => (
  <div className={styles.ordersTitleWrapper}>
    <h3>Order Id: <span>{id}</span></h3>
    <h3>Date: {new Date(ordered).toLocaleDateString()}</h3>
  </div>
));