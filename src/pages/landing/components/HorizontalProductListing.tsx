import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { IProduct } from "../../../types";
import LoadingComponent from "../../../components/LoadingComponent";
import ProductCard from "../../../components/ProductCard";


const HorizontalProductListing: React.FC<IProps> = ({products}) => {

  return (
    <div>
      {products?.length
        ? (
          <Carousel
            showDots={false}
            responsive={responsive}
            infinite={false}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
          >
            {products && [...products].reverse().map((product) => (
              <ProductCard product={product}
                key={product.id}
              />
            ))}
          </Carousel>
        )
        : (
          <div style={{ margin: "4em" }}>
            <LoadingComponent />
          </div>
        )
      }
    </div>
  );
};

export default HorizontalProductListing;

export interface IProps {
  products: IProduct[];
}

const responsive = {
  desktop1: {
    breakpoint: { max: 9000, min: 1830 },
    items: 5,
    slidesToSlide: 5 // optional, default to 1.
  },
  desktop2: {
    breakpoint: { max: 1830, min: 1500 },
    items: 4,
    slidesToSlide: 4 // optional, default to 1.
  },
  desktop3: {
    breakpoint: { max: 1500, min: 1024 },
    items: 3,
    slidesToSlide: 3 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};
  