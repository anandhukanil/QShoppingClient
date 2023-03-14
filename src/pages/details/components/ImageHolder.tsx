import React, { useCallback, useState } from "react";
import "./test.css";
import styles from "../styles.module.css";

const ImageHolder: React.FC<IProps> = (props) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const onThumbnailClick = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  return (
    <div className={styles.productImages}>
      <div className={styles.imgDisplay}>
        <div className={styles.imgShowcase}>
          <img src={props.images[selectedIndex]} />
        </div>
      </div>
      <div className={styles.imgSelect}>
        {props.images.map((src, index) => (
          <div className={styles.imgItem} key={src}>
            <img src={src} onClick={() => onThumbnailClick(index)} />
          </div>
        ))}
      </div>
      {/* <div className="product-imgs">
        <div className= "img-display">
          <div className= "img-showcase">
            <img src = "https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_1.jpg" alt = "shoe image"/>
            <img src = "https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_2.jpg" alt = "shoe image"/>
            <img src = "https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_3.jpg" alt = "shoe image"/>
            <img src = "https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_4.jpg" alt = "shoe image"/>
          </div>
        </div>
        <div className= "img-select">
          <div className= "img-item">
            <a href = "#" data-id = "1">
              <img src = "https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_1.jpg" alt = "shoe image"/>
            </a>
          </div>
          <div className= "img-item">
            <a href = "#" data-id = "2">
              <img src = "https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_2.jpg" alt = "shoe image"/>
            </a>
          </div>
          <div className= "img-item">
            <a href = "#" data-id = "3">
              <img src = "https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_3.jpg" alt = "shoe image"/>
            </a>
          </div>
          <div className= "img-item">
            <a href = "#" data-id = "4">
              <img src = "https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_4.jpg" alt = "shoe image"/>
            </a>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default ImageHolder;

export interface IProps {
  images: string[];
}