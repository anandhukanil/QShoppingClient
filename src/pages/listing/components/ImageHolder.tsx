import React, { useCallback, useState } from "react";
import { FaHeart } from "react-icons/fa";
import styles from "../styles.module.css";

const ImageHolder: React.FC<IProps> = (props) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const onThumbnailClick = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  return (
    <div className={styles.productImages}>
      <div className={styles.imgDisplay}>
        {props.onWishlistClick && (<div
          className={props.wishListed ? `${styles.wishList} ${styles.active}` : styles.wishList}
          onClick={props.loading ? undefined : props.onWishlistClick}
        >
          <FaHeart />
        </div>)}
        <div className={styles.imgShowcase}>
          <img src={props.images && props.images[selectedIndex]} />
        </div>
      </div>
      <div className={styles.imgSelect}>
        {props.images?.map((src, index) => (
          <div className={styles.imgItem} key={src}>
            <img src={src} onClick={() => onThumbnailClick(index)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageHolder;

export interface IProps {
  images: string[];
  onWishlistClick?: () => void;
  wishListed?: boolean;
  loading?: boolean;
}