import axios from "axios";

export const getAllProducts = (limit=0) => (
  axios.get("/products", {
    params: { limit }
  })
);

export const getProduct = (productId: number) => (
  axios.get(`/products/${productId}`)
);
