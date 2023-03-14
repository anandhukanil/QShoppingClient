import React, { useMemo } from "react";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IProduct, IState } from "../../types";
import ImageHolder from "./components/ImageHolder";
import DetailsPageComponent from "./DetailsPageComponent";
import styles from "./styles.module.css";
import "./test.css";

const ProductDetailsPage: React.FC<IProps> = () => {
  const { id } = useParams();
  const { products } = useSelector((state: IState) => state.products);

  const product = useMemo(() => products?.find((item) => item.id === Number(id)), [products, id]);

  return (
    // <div className={styles.productContainer}>
    //   <ImageHolder />
    //   <div className="product-details-container">
    //     <div className="product-details">
    //       <h1 className="product-name">{product?.title}</h1>
    //       <div className="product-rating">
    //         <FaStar className="star-icon" />
    //         <FaStar className="star-icon" />
    //         <FaStar className="star-icon" />
    //         <FaStar className="star-icon" />
    //         <FaStar className="star-icon" />
    //         <span className="rating-count">({product?.rating?.count})</span>
    //       </div>
    //       <h2 className="product-price">${product?.price}</h2>
    //       <p className="product-description">
    //         {product?.description}
    //       </p>
    //       <button className="add-to-cart-button">Add to Cart</button>
    //     </div>
    //   </div>
    // </div>
    <DetailsPageComponent product={product as IProduct} />
  );
};

export default ProductDetailsPage;

export interface IProps {}