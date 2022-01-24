import {
  addProductError,
  addProductStart,
  addProductSuccess,
  deleteProductError,
  deleteProductStart,
  deleteProductSuccess,
  getProductError,
  getProductStart,
  getProductSuccess,
  updateProductError,
  updateProductStart,
  updateProductSuccess,
} from "../productRedux";
import { publicRequest, userRequest } from "../../utilities/request";

export const getProducts = async (dispacth) => {
  dispacth(getProductStart());
  try {
    const res = await publicRequest.get("/product/all");
    dispacth(getProductSuccess(res.data));
  } catch (e) {
    dispacth(getProductError());
  }
};

export const deleteProducts = async (id, dispacth) => {
  dispacth(deleteProductStart());
  try {
    // const res = await userRequest.delete(`/product/${id}`);
    dispacth(deleteProductSuccess(id));
  } catch (e) {
    dispacth(deleteProductError());
  }
};

export const updateProducts = async (id, product, dispacth) => {
  dispacth(updateProductStart());
  try {
    // const res = await userRequest.put(`/product/${id}`);
    dispacth(updateProductSuccess(id, product));
  } catch (e) {
    dispacth(updateProductError());
  }
};

export const addProducts = async (product, dispacth, token) => {
  dispacth(addProductStart());
  try {
    const res = await userRequest(token).post(`/product`, product);
    dispacth(addProductSuccess(res.data));
  } catch (e) {
    dispacth(addProductError());
  }
};
