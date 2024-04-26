import axios from "axios";
// import _ from "lodash";

const mainRequestConfig = {
  // Mock baseURL is from a local Postman Mock Server
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
};

const mainAxiosInstance = axios.create(mainRequestConfig);

mainAxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return error.response;
  }
);

const mainRequest = (
  url,
  payload,
  method,
  headers = { "X-Requested-With": "XMLHttpRequest" }
) => {
  const data = payload;
  let params;
  if (method === "get") {
    params = payload;
  }
  return mainAxiosInstance(url, { data, params, method, headers });
};

const SERVICES = {
  /* <CUSTOMERS> */
  loginCustomer: (payload) => mainRequest(`/customer/login/`, payload, "post"),
  signupCustomer: (payload) => mainRequest(`/customer/`, payload, "post"),
  signupGoogle: (payload) => mainRequest(`/customer/google/`, payload, "post"),
  getCustomerDetail: (payload) =>
    mainRequest(`/customer/detail/${payload.customer_id}/`, payload, "get"),
  updateCustomer: (payload) =>
    mainRequest(`/customer/${payload.customer_id}/`, payload, "put"),

  /* <PRODUCTS> */
  getProducts: (payload) => mainRequest(`/allproducts/`, payload, "get"),
  // allProducts: (payload) => mainRequest(`/products/pagination/`, payload, "get"),
  getProductByCategory: (payload) =>
    mainRequest(`/products/${payload.id}/`, null, "get"),
  getProductDetail: (payload) =>
    mainRequest(`/products/detail/${payload.product_id}/`, null, "get"),
  getProductRelated: (payload) =>
    mainRequest(
      `/products/related/${payload.category_id}/${payload.product_id}/`,
      null,
      "get"
    ),
  getProductSearch: (payload) =>
    mainRequest(`/products/search/`, payload, "get"),
  getProductLatest: (payload) =>
    mainRequest(`/products/latest/`, payload, "get"),
  getProductRandom: (payload) =>
    mainRequest(`/products/random/`, payload, "get"),

  /* <CARTS> */
  buyProduct: (payload) => mainRequest(`/carts/`, payload, "post"),
  getCarts: (payload) => mainRequest(`/cart/${payload.id}/`, null, "get"),
  deleteProductCart: (payload) =>
    mainRequest(
      `/cart/customer/${payload.IDCustomer}/product/${payload.IDProduct}/`,
      payload,
      "delete"
    ),
  updateProductCart: (payload) =>
    mainRequest(`/cart/customer/${payload.customer_id}/`, payload, "put"),
  deleteAllProductCart: (payload) =>
    mainRequest(`/cart/customer/${payload.customer_id}/`, payload, "delete"),

  /* <CATEGORIES> */
  getCategories: (payload) => mainRequest(`/category/`, payload, "get"),

  /* <ADDRESS> */
  getProvinces: (payload) => mainRequest(`/get-provinces/`, payload, "get"),
  getDistricts: (payload) =>
    mainRequest(`/get-districts/${payload.province_id}/`, payload, "get"),
  getWards: (payload) =>
    mainRequest(`/get-wards/${payload.district_id}/`, payload, "get"),

  /* <ORDER> */
  postOrderProduct: (payload) => mainRequest(`/order/`, payload, "post"),
  getOrderProduct: (payload) =>
    mainRequest(`/order/${payload.customer_id}/`, payload, "get"),
  updateOrderProduct: (payload) =>
    mainRequest(`/order/${payload.order_id}/`, payload, "put"),

  /* <GALLERY> */
  getGalleries: (payload) =>
    mainRequest(`/galleries/${payload.product_id}/`, payload, "get"),

  /* <NEWS> */
  getAllNews: (payload) => mainRequest(`/allNews/`, payload, "get"),
  getNewsDetail: (payload) =>
    mainRequest(`/news/${payload.news_id}/`, payload, "get"),

  /* <COUPON> */
  getAllCoupon: (payload) => mainRequest(`/allCoupon/`, payload, "get"),

  postVNPay: (payload) => mainRequest(`/vnpay-payment/`, payload, "post"),
  getCouponBycode: (payload) => mainRequest(`/couponByCode/`, payload, "get"),

  /* <SLIDER> */
  getSliders: (payload) => mainRequest(`/sliders/`, payload, "get"),
};

export default SERVICES;
