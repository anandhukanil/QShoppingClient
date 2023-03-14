import React from "react";
import products from "../../../test.json";
import styles from "../styles.module.css";

const Categories: React.FC<IProps> = () => {
  const categories = products.reduce((prevValue: ICategory[], currentValue) => {
    if (prevValue.some((category) => category.id === currentValue.category.id)) {
      return prevValue.map((item) => item.id === currentValue.category.id ? {...item, count: item.count+1} : item);
    }

    return [...prevValue, { ...currentValue.category, count: 1 }]; 
  }, []);

  return (
    <>
      <h2 className={styles.categoryLabel}>Categories</h2>
      <div className={styles.categoryCardContainer}>
        {categories.map((category) => (
          <div className={styles.categoryCardWrapper} key={category.id}>
            <img src={category.image} />
            <div>
              <h3>{category.name}</h3>
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
  id: number;
  name: string;
  image: string;
  creationAt: string;
  updatedAt: string;
  count: number;
}