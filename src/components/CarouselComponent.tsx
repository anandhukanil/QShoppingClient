import React, { useState } from "react";
import "./carouselComponentStyles.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const CarouselComponent: React.FC<IProps> = ({images}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const handlePrevClick = () => {
    setCurrentImageIndex(currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1);
  };
  
  const handleNextClick = () => {
    setCurrentImageIndex(currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1);
  };
  
  return (
    <div className="carousel">
      <div className="carousel-slide" style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}>
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Image ${index}`} className="carousel-image" />
        ))}
      </div>
      <div className="carousel-pagination">
        {images.map((_, index) => (
          <button key={index} className={`carousel-pagination-button ${currentImageIndex === index ? "active" : ""}`} onClick={() => setCurrentImageIndex(index)} />
        ))}
      </div>
      <button className="carousel-toggle-button prev" onClick={handlePrevClick}><FaArrowLeft /></button>
      <button className="carousel-toggle-button next" onClick={handleNextClick}><FaArrowRight /></button>
    </div>
  );
};

export default CarouselComponent;

export interface IProps {
  images: string[];
}