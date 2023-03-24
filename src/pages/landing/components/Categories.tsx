import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { createSearchParams, useNavigate } from "react-router-dom";
import { routes } from "../../../routes/routes";
import { IState } from "../../../types";
import styles from "../styles.module.css";

const Categories: React.FC<IProps> = () => {
  const { products } = useSelector((state: IState) => state.products);
  const navigate = useNavigate();

  const categories = useMemo(() => products.reduce((prevValue: ICategory[], currentValue) => {
    if (prevValue.some((category) => category.name === currentValue.category)) {
      return prevValue.map((item) => item.name === currentValue.category ? {...item, count: item.count+1} : item);
    }

    return [...prevValue, { name: currentValue.category, image: currentValue.thumbnail, count: 1 }]; 
  }, []), [products]);

  const onCategoryClick = (category: ICategory) => {
    navigate({
      pathname: routes.products.path,
      search: `?${createSearchParams({ category: category.name })}`,
    });
  };

  return (
    <>
      <h2 className={styles.categoryLabel}>Categories</h2>
      <div className={styles.categoryCardContainer}>
        {categories.map((category) => (
          <div
            className={styles.categoryCardWrapper}
            key={category.name}
            onClick={() => onCategoryClick(category)}
          >
            <img src={category.image} />
            <div>
              <h3>{category.name?.replace(/-/g, " ")}</h3>
              <div className={styles.categoryCount}>{category.count} Items</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Categories;

export interface IProps {}

interface ICategory {
  name: string;
  image: string;
  count: number;
}