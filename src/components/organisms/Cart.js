import { CgClose } from "react-icons/cg";
import { TruncateText } from "../atoms/TruncateText";
import { Button } from "../atoms/Button";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../contexts/ProductContext";
import { InputQuantity } from "../atoms/Input";
import { FormatPrice } from "../atoms/FormatPrice";
import { useForm } from "react-hook-form";

import axios from "axios";
import { Modal } from "../molecules/Modal";
import Cookies from "js-cookie";
import Notification from "../atoms/Notification";
import { CheckoutForm } from "./Checkout";
import { LoadingAllPage } from "../atoms/Loading";
import {
  DeleteAllProductCart,
  DeleteProductCart,
  ListCarts,
  OrderProduct,
  UpdateProductCart,
} from "../../utils/auth";
import { AuthContext } from "../contexts/AuthContext";
import { useRouter } from "next/router";

export const Cart = () => {
  const [isListProduct, setIsListProduct] = useState([]);
  const [productUpdate, setProductUpdate] = useState([]);
  const [quantity, setQuantity] = useState();
  const [isCheckout, setIsCheckout] = useState(false);
  const [loading, setLoading] = useState(true);
  const { setBreadcrumb } = useContext(AuthContext);
  const [isBill, setIsBill] = useState(false);

  const router = useRouter();
  const storedIdCustomer = Cookies.get("id_customer");
  let IdCustomer;
  if (storedIdCustomer) {
    IdCustomer = atob(storedIdCustomer);
  }
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setBreadcrumb("Cart");
  }, []);

  // call api get all cart
  useEffect(() => {
    const fetchCart = async () => {
      const dataCart = await ListCarts({ id: IdCustomer });
      setIsListProduct(dataCart);
      setLoading(false);
    };
    if (IdCustomer) {
      fetchCart();
    }
  }, [IdCustomer]);

  //total product
  const arraySum = isListProduct?.data
    ?.map((item, index) => item.product_quantity)
    .reduce((acc, current) => acc + current, 0);
  //total money
  const total = isListProduct?.data
    ?.map(
      (product) =>
        (product.product_detail.product_price -
          (product.product_detail.product_price *
            product.product_detail.product_sale) /
            100) *
        product.product_quantity
    )
    .reduce((acc, currentValue) => acc + currentValue, 0);
  //change quantity
  const handleQuantityChange = (index, newQuantity) => {
    setQuantity({
      ...quantity,
      [index]: newQuantity,
    });

    const updatedListProduct = [...isListProduct?.data];

    updatedListProduct[index].product_quantity = newQuantity;
    setProductUpdate(updatedListProduct);
  };

  const onSubmit = () => {
    setIsCheckout(true);
  };

  const deleteProduct = async (product_id) => {
    const payload = {
      IDCustomer: IdCustomer,
      IDProduct: product_id,
    };
    await DeleteProductCart(payload);
    router.push("/cart/?delete=" + product_id);
    Notification.success("Delete successfully!");
  };

  const handleQuantity = async () => {
    const payload = {
      customer_id: IdCustomer,
      product_update: productUpdate.map((item) => ({
        product_id: item.product_id,
        product_quantity: item.product_quantity,
      })),
    };
    if (payload.product_update.length > 0) {
      await UpdateProductCart(payload);
    }
    Notification.success("Updated quantity successfully!");
  };

  //set data để giử api
  const [dataSend, setDataSend] = useState();
  const data = {
    customer_id: IdCustomer,
    order_total: total,
    order_status: 1,
    order_detail: isListProduct?.data?.map((item) => ({
      product_id: item.product_detail.product_id,
      product_name: item.product_detail.product_name,
      product_price: item.product_detail.product_price,
      product_sales_quantity: item.product_quantity,
    })),
  };
  useEffect(() => {
    setDataSend(data);
  }, [isListProduct?.data]);

  // lấy ra ngày tháng năm hiện tại
  const currentDate = new Date();

  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1; // Tháng bắt đầu từ 0, cần cộng thêm 1
  const currentYear = currentDate.getFullYear();

  const CompleteOrder = async () => {
    await OrderProduct(dataSend);
    const payload = {
      customer_id: dataSend.customer_id,
    };
    await DeleteAllProductCart(payload);
    router.push("/");
    Notification.success("Order successfully!");
  };

  //lấy ra color mà sản phẩm có
  const getColorName = (colorId) => {
    const color = isListProduct?.colors?.find(
      (item) => item.color_id === colorId
    );
    return color ? color.color_name : "";
  };

  return (
    <>
      {loading ? (
        <LoadingAllPage isOpen={loading} setIsOpen={setLoading} />
      ) : (
        !isBill &&
        !isCheckout &&
        isListProduct?.data?.length > 0 && (
          <form onSubmit={handleSubmit(onSubmit)} className="block">
            <div className="px-[5rem] py-10 grid lg:grid-cols-10">
              <div
                className=" bg-white p-10 lg:col-span-7 shadow-2xl"
                style={{ borderRadius: "20px 0 0 20px" }}
              >
                <div className="flex items-center justify-between pb-10 mb-3 border-b-2">
                  <p className="font-bold text-3xl">Shopping Cart</p>
                  <p>{arraySum} sản phẩm</p>
                </div>
                {isListProduct?.data?.map((item, index) => {
                  // lấy ra quantity với màu đã chọn
                  const quantityColor = item?.product_colors?.find(
                    (item) => item.color_id === item.color_id
                  )?.quantity;
                  
                  return (
                    <div
                      className="flex items-center justify-between gap-5 my-5"
                      key={index}
                    >
                      <img
                        className="w-16 h-16"
                        src={item.product_detail.product_image}
                      />
                      <div className="w-[50%]">
                        <p className="text-black font-semibold">
                          {TruncateText(item.product_detail.product_name, 70)}
                        </p>
                        <p className="text-[#8e8e8e] font-bold text-xs pb-1">
                          {getColorName(item.color_id)}
                        </p>
                      </div>
                      <InputQuantity
                        quantity={item.product_quantity}
                        setQuantity={(newQuantity) =>
                          handleQuantityChange(index, newQuantity)
                        }
                        maxQuantity={quantityColor}
                      />

                      <p>
                        {FormatPrice(
                          item.product_detail.product_price -
                            (item.product_detail.product_price *
                              item.product_detail.product_sale) /
                              100
                        )}
                      </p>
                      <div
                        className="cursor-pointer p-3 rounded-full hover:bg-orange hover:text-white"
                        onClick={() => deleteProduct(item.product_id)}
                      >
                        <CgClose />
                      </div>
                    </div>
                  );
                })}
                <div className="flex justify-end items-end pt-5">
                  <Button
                    title={"UPDATE QUANTITY"}
                    type={"button"}
                    onClick={handleQuantity}
                  />
                </div>
              </div>
              <div
                className=" bg-[#ddd] p-10 lg:col-span-3 shadow-2xl"
                style={{ borderRadius: "0 20px 20px 0" }}
              >
                <div className="pb-10 mb-3 border-b-2">
                  <p className="font-bold text-3xl">Summary</p>
                </div>
                <div className="border-b-2 pb-5 border-[#bdbdbd]">
                  <p className="text-sm font-semibold my-3">GIVE CODE</p>
                  <input type="text" className="w-full p-2" />
                </div>
                <div className="flex justify-between my-3 items-center text-sm font-semibold">
                  <p className="">TOTAL PRICE</p>
                  <p>{FormatPrice(total)}</p>
                </div>
                <div className="flex justify-center pt-5">
                  <Button title={"CHECKOUT"} type={"submit"} />
                </div>
              </div>
            </div>
          </form>
        )
      )}
      {}

      {!isBill && !isCheckout && isListProduct?.data?.length === 0 && (
        <>
          <div className="h-64 flex justify-center items-center font-semibold">
            Không có sản phẩm
          </div>
        </>
      )}

      {!isBill && isCheckout ? (
        <div className="px-14 py-10">
          <CheckoutForm
            setIsCheckout={setIsCheckout}
            dataSend={dataSend}
            setDataSend={setDataSend}
            setIsBill={setIsBill}
          />
        </div>
      ) : null}

      {isBill ? (
        <div className="flex justify-center w-full">
          <div className="min-w-[500px] border-t-8 border-solid border-blue-400 p-5 rounded-lg">
            <div className="flex justify-between">
              <div className="flex gap-4 items-center">
                <img
                  src="https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045-2.jpg"
                  className="w-16"
                />
                <div>
                  <p>TGDD</p>
                  <p>thegioididong.com</p>
                </div>
              </div>
              <div className="flex flex-col">
                <p className="font-bold text-xl text-center">BILL</p>
                <p>{`Ngày ${currentDay} tháng ${currentMonth} năm ${currentYear}`}</p>
              </div>
            </div>

            <p className="font-bold text-2xl my-3 pt-3">
              {dataSend?.shipping_info?.shipping_name}
            </p>
            <p>
              Điện thoại khách hàng: {dataSend?.shipping_info?.shipping_phone}
            </p>
            <p>
              Địa chỉ khách hàng: {dataSend?.shipping_info?.shipping_address}
            </p>

            <table className="table-auto w-full border-collapse mt-5 text-center">
              <thead className="bg-gray-200">
                <tr className="border-b border-gray-300 ">
                  <th className="px-4 py-2 text-center">NAME</th>
                  <th className="px-4 py-2 text-center">QUANTITY</th>
                  <th className="px-4 py-2 text-center">UNIT PRICE</th>
                  <th className="px-4 py-2 text-center">DISCOUNT</th>
                  <th className="px-4 py-2 text-center">AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                {isListProduct?.data?.map((item, index) => (
                  <tr className="border-b border-gray-300" key={index}>
                    <td className="px-4 py-2">
                      {item.product_detail.product_name}
                    </td>
                    <td className="px-4 py-2">1</td>
                    <td className="px-4 py-2">
                      {FormatPrice(item.product_detail.product_price)}
                    </td>
                    <td className="px-4 py-2">
                      {item.product_detail.product_sale}%
                    </td>
                    <td className="px-4 py-2">
                      {FormatPrice(
                        item.product_detail.product_price -
                          (item.product_detail.product_price *
                            item.product_detail.product_sale) /
                            100
                      )}
                    </td>
                  </tr>
                ))}

                <tr>
                  <td className="px-4 py-2"></td>
                  <td className="px-4 py-2"></td>
                  <td className="px-4 py-2"></td>
                  <td className="px-4 py-2">Tổng cộng</td>
                  <td className="px-4 py-2">{FormatPrice(total)}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2"></td>
                  <td className="px-4 py-2"></td>
                  <td className="px-4 py-2"></td>
                  <td className="px-4 py-2">TAX(0%)</td>
                  <td className="px-4 py-2">0₫</td>
                </tr>
                <tr className="text-blue-400">
                  <td className="px-4 py-2"></td>
                  <td className="px-4 py-2"></td>
                  <td className="px-4 py-2"></td>
                  <td className="px-4 py-2">TOTAL PAYMENT</td>
                  <td className="px-4 py-2">{FormatPrice(total)}</td>
                </tr>
              </tbody>
            </table>
            <div className="flex justify-center mt-10 gap-10">
              <button
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 border-solid hover:border-transparent rounded "
                onClick={() => {
                  setIsBill(false);
                  setIsCheckout(false);
                }}
              >
                Back to Cart
              </button>
              <button
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 border-solid hover:border-transparent rounded "
                onClick={CompleteOrder}
              >
                Complete Order
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
