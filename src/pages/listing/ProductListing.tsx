import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { notFound } from "../../assets";
import ErrorPage from "../../components/ErrorPage";
import LoadingComponent from "../../components/LoadingComponent";
import ProductCard from "../../components/ProductCard";
import { IState, Types } from "../../types";
import styles from "./styles.module.css";

const ProductListing: React.FC<IProps> = () => {
  const [search] = useSearchParams();
  const { products, dataLoading } = useSelector((state: IState) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: Types.GET_ALL_PRODUCTS,
      payload: search.get("search")
    });
  }, [search]);

  return (
    <div className={styles.productListPageWrapper}>
      {!!search.get("search") && <h3>Showing results for &quot;{search.get("search")}&quot;...</h3>}
      {dataLoading
        ? (
          <div className={styles.productListLoadingWrapper}>
            <LoadingComponent />
          </div>
        )
        : (
          products?.length
            ? (
              <div className={styles.productListItemsContainer}>
                {products?.map((item) => (
                  <ProductCard
                    key={item.id}
                    product={item}
                  />
                ))}
              </div>
            )
            : (
              <ErrorPage
                title="No results found!"
                description="No results found for you search. Try another query."
                image={notFound}
                imageClassName={styles.noResultFoundImage}
              />
            )
        )}
    </div>
  );
};

export default ProductListing;

export interface IProps {}