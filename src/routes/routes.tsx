import React, { lazy } from "react";
import { IRoutes } from "../types";
const CartPage = lazy(() => import("../pages/cart/CartPage"));
const LandingPage = lazy(() => import("../pages/landing/LandingPage"));
const Profile = lazy(() => import("../pages/profile/Profile"));
const Wishlist = lazy(() => import("../pages/profile/Wishlist"));
const ProductDetailsPage = lazy(() => import("../pages/listing/ProductDetailsPage"));
const ProductListing = lazy(() => import("../pages/listing/ProductListing"));
const LogInSignUpPage = lazy(() => import("../pages/login/LogInSignUpPage"));
const Orders = lazy(() => import("../pages/profile/Orders"));

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
    protected: true,
    children: [
      {
        name: "wishlist",
        path: "wishlist",
        element: <Wishlist />
      },
      {
        name: "orders",
        path: "orders",
        element: <Orders />
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