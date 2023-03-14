import React from "react";
import ProductDetailsPage from "../pages/details/ProductDetailsPage";
import ProductsList from "../pages/landing/components/ProductsList";
import LandingPage from "../pages/landing/LandingPage";
import { IRoutes } from "../types";

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
    element: <ProductsList />,
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
    element: <LandingPage />,
    children: []
  },
  profile: {
    path: "/profile",
    name: "profile",
    element: <LandingPage />,
    children: []
  },
  login: {
    path: "/login",
    name: "login",
    element: <LandingPage />,
    children: [
      {
        path: "signup",
        name: "sign-up",
        element: <LandingPage />,
      }
    ]
  }
};