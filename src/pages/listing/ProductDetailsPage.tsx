import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../../apis/products";
import LoadingComponent from "../../components/LoadingComponent";
import { IProduct } from "../../types";
import DetailsPageComponent from "./components/DetailsPageComponent";
import styles from "./styles.module.css";

const ProductDetailsPage: React.FC<IProps> = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<IProduct>();

  useEffect(() => {
    let flag = true;
    setLoading(true);
    getProduct(Number(id))
      .then((response) => {
        if (flag === true) setProduct(response?.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });

    return () => { flag = false; };
  }, [id]);

  return (
    <>
      {loading
        ? <div className={styles.loadingWrapper}><LoadingComponent /></div>
        : <DetailsPageComponent product={product as IProduct} />}
    </>
  );
};

export default ProductDetailsPage;

export interface IProps {}