import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";

const RatingComponent: React.FC<IProps> = ({ rating, count }) => {
  const [starSpans, setStarSpans] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const _starSpans = [];
    for (let v = 1; v <= 5; v++) {
      if (v <= rating) {
        _starSpans.push(
          <span
            key={v}
            className={styles.ratingStar}
          >
            ★
          </span>
        );
      } else {
        _starSpans.push(
          <span
            key={v}
            className={styles.ratingStar}
          >
            ☆
          </span>
        );
      }
    }
    setStarSpans(_starSpans);
  }, [rating]);

  return <div>{starSpans} ({count})</div>;
};

export default RatingComponent;

export interface IProps {
  rating: number;
  count: number;
}