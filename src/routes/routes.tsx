import React from "react";
import CartPage from "../pages/cart/CartPage";
import LandingPage from "../pages/landing/LandingPage";
import Profile from "../pages/profile/Profile";
import Wishlist from "../pages/profile/Wishlist";
import { IRoutes } from "../types";
import ProductDetailsPage from "../pages/listing/ProductDetailsPage";
import ProductListing from "../pages/listing/ProductListing";
import LogInSignUpPage from "../pages/login/LogInSignUpPage";

export const routes: IRoutes = {
  landing: {
    path: "/",
    name: "landing",
    element: <LandingPage />,
    children: []
  },
  products: {
    path: "/products",
    name: "products-listing",
    element: <ProductListing />,
    children: [
      {
        path: ":id",
        name: "product-details",
        element: <ProductDetailsPage />,
      }
    ]
  },
  cart: {
    path: "/cart",
    name: "cart",
    element: <CartPage />,
    children: []
  },
  profile: {
    path: "/profile",
    name: "profile",
    element: <Profile />,
    children: [
      {
        name: "wishlist",
        path: "wishlist",
        element: <Wishlist />
      },
      {
        name: "orders",
        path: "orders",
        element: <CartPage />
      }
    ]
  },
  login: {
    path: "/login",
    name: "login",
    element: <LogInSignUpPage />,
    children: []
  }
};