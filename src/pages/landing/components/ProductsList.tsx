import React from "react";
import Card from "../../../components/Card";
import products from "../../../test.json";
import styles from "../styles.module.css";

const ProductsList: React.FC<IProps> = () => {
  // const { products } = useSelector((state: IState) => state.products);

  return (
    <div className={styles.productListWrapper}>
      { products && [ ...products].reverse().map((product) => (
        <Card
          key={product.id}
          description={product.description}
          imageUrl={product.images[0]}
          footer={`$${product.price}`}
          title={product.title}
        />
      ))}
    </div>
  );
};

export default ProductsList;

export interface IProps {}