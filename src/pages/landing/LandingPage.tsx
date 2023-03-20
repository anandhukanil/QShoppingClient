import React, { useEffect, useMemo } from "react";
import HorizontalProductListing from "./components/HorizontalProductListing";
import SuggestedProducts from "./components/SuggestedProducts";
import Banner from "../../components/Banner";
import Categories from "./components/Categories";
import { IState, Types } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import CarouselComponent from "../../components/CarouselComponent";
import { banners } from "../../assets";
import AdWrapperComponent from "./components/AdHolderComponent";

const LandingPage: React.FC<IProps> = () => {
  const { products } = useSelector((state: IState) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: Types.GET_ALL_PRODUCTS });
  }, []);

  const recentProducts = useMemo(() => products && [...products].reverse().slice(0, 5), [products]);
  const popularProducts = useMemo(() => products && [...products].sort((a, b) => a.rating - b.rating)
    .slice(0, 5),[products]);

  return (
    <div>
      <CarouselComponent images={banners} />
      <SuggestedProducts />
      <Categories />
      <Banner />
      <h2 style={labelStyles}>Most Popular Products</h2>
      <HorizontalProductListing products={popularProducts}/>
      <AdWrapperComponent />
      <h2 style={labelStyles}>Recently Viewed</h2>
      <HorizontalProductListing products={recentProducts}/>
    </div>
  );
};

export default LandingPage;

export interface IProps {}

const labelStyles: React.CSSProperties = {
  margin: "50px 0 0px 20px",
};