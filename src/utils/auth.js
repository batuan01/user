import Cookies from "js-cookie";
import SERVICES from "../assets";
import Notification from "../components/atoms/Notification";

/* <CUSTOMER> */
export const LoginCustomer = async (payload) => {
  try {
    const { data, status } = await SERVICES.loginCustomer(payload);
    if (status === 200) {
      Cookies.set("token", data.data.access_token);
      const id_customer = btoa(data.data.customer.customer_id); // Sử dụng hàm btoa() để mã hóa Base64
      Cookies.set("id_customer", id_customer);
      Notification.success("Success !");
    } else {
      logError(data);
    }
  } catch (error) {
    Notification.error("Username or password is incorrect!");
  }
};

export const SignupCustomer = async (payload) => {
  try {
    const { data, status } = await SERVICES.signupCustomer(payload);
    if (status === 201) {
      Cookies.set("token", data.data.access_token);
      const id_customer = btoa(data.data.customer.customer_id); // Sử dụng hàm btoa() để mã hóa Base64
      Cookies.set("id_customer", id_customer);
      Notification.success("Success !");
    } else {
      logError(data);
    }
  } catch (error) {
    Notification.error("Account already exists!!");
  }
};

export const SignupGoogle = async (payload) => {
  try {
    const { data, status } = await SERVICES.signupGoogle(payload);
    if (status === 200) {
      console.log(data);
      // Cookies.set("token", data.data.access_token);
      const id_customer = btoa(data.data.customer_id); // Sử dụng hàm btoa() để mã hóa Base64
      Cookies.set("id_customer", id_customer);
      Notification.success("Success !");
    } else {
      logError(data);
    }
  } catch (error) {
    Notification.error("Account already exists!!");
  }
};

export const GetCustomerDetail = async (payload) => {
  try {
    const { data, status } = await SERVICES.getCustomerDetail(payload);
    if (status === 200) {
      return data;
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};
export const UpdateCustomer = async (payload) => {
  try {
    const { data, status } = await SERVICES.updateCustomer(payload);
    if (status === 200) {
      return data;
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

/* <PRODUCTS> */
export const ListProducts = async (payload) => {
  try {
    const { data, status } = await SERVICES.getProducts(payload);
    if (status === 200) {
      return data;
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

export const ListProductsByCategory = async (payload) => {
  try {
    const { data, status } = await SERVICES.getProductByCategory(
      payload.params
    );
    if (status === 200) {
      return data;
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

export const GetProductDetail = async (payload) => {
  try {
    const { data, status } = await SERVICES.getProductDetail(payload);
    if (status === 200) {
      return data;
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

export const GetProductRelated = async (payload) => {
  try {
    const { data, status } = await SERVICES.getProductRelated(payload);
    if (status === 200) {
      return data;
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

export const GetProductSearch = async (payload) => {
  try {
    const { data, status } = await SERVICES.getProductSearch(payload);
    if (status === 200) {
      return data;
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

export const GetProductLatests = async (payload) => {
  try {
    const { data, status } = await SERVICES.getProductLatest(payload);
    if (status === 200) {
      return data;
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

export const GetProductRandoms = async (payload) => {
  try {
    const { data, status } = await SERVICES.getProductRandom(payload);
    if (status === 200) {
      return data;
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

/* <CART> */
export const BuyProduct = async (payload) => {
  try {
    const { data, status } = await SERVICES.buyProduct(payload);
    if (status === 200) {
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

export const ListCarts = async (payload) => {
  try {
    const { data, status } = await SERVICES.getCarts(payload);
    if (status === 200) {
      return data;
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

export const DeleteProductCart = async (payload) => {
  try {
    const { data, status } = await SERVICES.deleteProductCart(payload);
    if (status === 200) {
      return data.data;
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

export const DeleteAllProductCart = async (payload) => {
  try {
    const { data, status } = await SERVICES.deleteAllProductCart(payload);
    if (status === 200) {
      return data.data;
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

export const UpdateProductCart = async (payload) => {
  try {
    const { data, status } = await SERVICES.updateProductCart(payload);
    if (status === 200) {
      return data.data;
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

/* <CATEGORY> */
export const ListCategories = async () => {
  try {
    const { data, status } = await SERVICES.getCategories();
    if (status === 200) {
      return data;
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

/* <PROVINCE> */
export const ListProvinces = async () => {
  try {
    const { data, status } = await SERVICES.getProvinces();
    if (status === 200) {
      return data;
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

export const ListDistricts = async (payload) => {
  try {
    const { data, status } = await SERVICES.getDistricts(payload);
    if (status === 200) {
      return data;
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

export const ListWards = async (payload) => {
  try {
    const { data, status } = await SERVICES.getWards(payload);
    if (status === 200) {
      return data;
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

/* <ORDER> */
export const OrderProduct = async (payload) => {
  try {
    const { data, status } = await SERVICES.postOrderProduct(payload);
    if (status === 200) {
      return data;
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};
export const GetOrderProduct = async (payload) => {
  try {
    const { data, status } = await SERVICES.getOrderProduct(payload);
    if (status === 200) {
      return data;
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};
export const PutOrderProduct = async (payload) => {
  try {
    const { data, status } = await SERVICES.updateOrderProduct(payload);
    if (status === 200) {
      return data;
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

/* <GALLERY> */
export const GetGalleries = async (payload) => {
  try {
    const { data, status } = await SERVICES.getGalleries(payload);
    if (status === 200) {
      return data;
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

/* <NEWS> */
export const GetAllNews = async (payload) => {
  try {
    const { data, status } = await SERVICES.getAllNews(payload);
    if (status === 200) {
      return data;
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

export const GetNewsDetail = async (payload) => {
  try {
    const { data, status } = await SERVICES.getNewsDetail(payload);
    if (status === 200) {
      return data;
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

/* <COUPON> */
export const GetAllCoupon = async (payload) => {
  try {
    const { data, status } = await SERVICES.getAllCoupon(payload);
    if (status === 200) {
      return data;
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

export const GetCouponBycode = async (payload) => {
  try {
    const { data, status } = await SERVICES.getCouponBycode(payload);
    if (status === 200) {
      return data;
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

export const PostVNPay = async (payload) => {
  try {
    const { data, status } = await SERVICES.postVNPay(payload);
    if (status === 200) {
      return data;
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

/* <SLIDER> */
export const GetSliders = async (payload) => {
  try {
    const { data, status } = await SERVICES.getSliders(payload);
    if (status === 200) {
      return data;
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};