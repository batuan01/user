import { CgClose } from "react-icons/cg";
import { TruncateText } from "../atoms/TruncateText";
import { Button } from "../atoms/Button";
import { useContext, useEffect, useState } from "react";
import { InputQuantity } from "../atoms/Input";
import { FormatPrice } from "../atoms/FormatPrice";
import { useForm } from "react-hook-form";

import Cookies from "js-cookie";
import Notification from "../atoms/Notification";
import {
  DeleteProductCart,
  ListCarts,
  UpdateProductCart,
} from "../../utils/auth";
import { AuthContext } from "../contexts/AuthContext";
import { useRouter } from "next/router";
import { CheckboxIcon } from "../atoms/Icon";
import { TableCheckbox } from "../molecules/TableCheckbox";

export const Cart = () => {
  const [isListProduct, setIsListProduct] = useState([]);
  const [productUpdate, setProductUpdate] = useState([]);
  const [quantity, setQuantity] = useState();
  const { setBreadcrumb, setLoad } = useContext(AuthContext);

  const [reload, setReload] = useState(true);

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
      setLoad(false);
    };
    if (IdCustomer) {
      fetchCart();
    }
  }, [IdCustomer, reload]);

  //total product
  const arraySum = isListProduct?.data
    ?.map((item, index) => item.product_quantity)
    .reduce((acc, current) => acc + current, 0);
  //total money
  function calculateTotalPrice(order) {
    let totalPrice = 0;
    let discount = 0;
    if (order.product_detail.product_sale) {
      discount = parseFloat(order.product_detail.product_sale) / 100;
    }

    order.product_colors.forEach((color) => {
      if (color.color_id === order.color_id) {
        totalPrice +=
          (color.product_price - color.product_price * discount) *
          order.product_quantity;
      }
    });

    return totalPrice;
  }

  const totalCostAllOrders = (isListProduct?.data || [])
    .map((order) => calculateTotalPrice(order))
    .reduce((acc, curr) => acc + curr, 0);

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

  const deleteProduct = async (product_id) => {
    const payload = {
      IDCustomer: IdCustomer,
      IDProduct: product_id,
    };
    setLoad(true);
    await DeleteProductCart(payload);
    setReload(!reload);
    router.push("/cart/?delete=" + product_id);
    Notification.success("Delete successfully!");
  };

  const handleQuantity = async () => {
    const payload = {
      customer_id: IdCustomer,
      product_update: productUpdate.map((item) => ({
        product_id: item.product_id,
        product_quantity: item.product_quantity,
        color_id: item.color_id,
      })),
    };
    if (payload.product_update.length > 0) {
      await UpdateProductCart(payload);
    }
    Notification.success("Updated quantity successfully!");
  };

  //lấy ra color mà sản phẩm có
  const getColorName = (colorId) => {
    const color = isListProduct?.colors?.find(
      (item) => item.color_id === colorId
    );
    return color ? color.color_name : "";
  };

  //table checkbox//
  const labelData = ["name", "email", "role", "joinedAt"];

  const [rowData, setRowData] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      joinedAt: "2022-05-15",
      isChecked: false,
    },
    {
      id: 2,
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      joinedAt: "2022-05-15",
      isChecked: false,
    },
  ]);

  const handleCheckboxChange = (index) => {
    setRowData(
      rowData.map((item, idx) =>
        idx === index ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };


  const renderItems = [];

  rowData.map((item, index) =>
    renderItems.push(
      <tr key={index} className={item.isChecked ? "bg-blue-50" : ""}>
        <td className="pl-6 w-8">
          <input
            id={index}
            type="checkbox"
            className="hidden peer"
            checked={item.isChecked}
            onChange={() => handleCheckboxChange(index)}
          />
          <label
            htmlFor={index}
            className="relative flex items-center justify-center p-0.5 peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-white w-5 h-5 cursor-pointer bg-blue-500 border border-gray-400 rounded overflow-hidden"
          >
            <CheckboxIcon />
          </label>
        </td>
        <td className="px-6 py-4 text-sm">123</td>
        <td className="px-6 py-4 text-sm">231</td>
        <td className="px-6 py-4 text-sm">123</td>
        <td className="px-6 py-4 text-sm">123</td>
      </tr>
    )
  );

  const getCheckedIds = () => {
    const checkedRows = rowData.filter((item) => item.isChecked);
    const checkedIds = checkedRows.map((item) => item.id);
    return checkedIds;
  };


  return (
    <>
      {isListProduct?.data?.length > 0 && (
        <div className="block container">
          <div className="px-[5rem] py-10">
            <div
              className=" bg-white p-10 shadow-2xl"
              style={{ borderRadius: "20px 0 0 20px" }}
            >
              <div className="flex items-center justify-between pb-10 mb-3 border-b-2">
                <p className="font-bold text-3xl">Shopping Cart</p>
                <p>{Math.abs(arraySum)} sản phẩm</p>
              </div>
              {isListProduct?.data?.map((item, index) => {
                // lấy ra quantity với màu đã chọn
                const mapProductColor = item?.product_colors?.find(
                  (color) => item.color_id === color.color_id
                );

                return (
                  <div
                    className="grid grid-cols-12 gap-2 py-5 items-center hover:bg-slate-100 cursor-pointer"
                    key={index}
                  >
                    <div className="col-span-1">
                      <img
                        className="w-16 h-16"
                        src={item.product_detail.product_image}
                      />
                    </div>
                    <div className="col-span-6">
                      <p className="text-black font-semibold">
                        {TruncateText(item.product_detail.product_name, 70)}
                      </p>
                      <p className="text-[#8e8e8e] font-bold text-xs py-1">
                        {getColorName(item.color_id)}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <InputQuantity
                        quantity={item.product_quantity}
                        setQuantity={(newQuantity) =>
                          handleQuantityChange(index, newQuantity)
                        }
                        maxQuantity={mapProductColor?.quantity}
                      />
                    </div>
                    <div className="col-span-2">
                      <p className=" text-center">
                        {FormatPrice(
                          mapProductColor.product_price -
                            (mapProductColor.product_price *
                              item.product_detail.product_sale) /
                              100
                        )}
                      </p>
                    </div>
                    <div className="col-span-1 flex justify-end">
                      <div
                        className="cursor-pointer p-3 rounded-full hover:bg-orange hover:text-white max-w-[40px]"
                        onClick={() => deleteProduct(item.product_id)}
                      >
                        <CgClose />
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="flex justify-end gap-5 py-5 items-center text-xl font-semibold border-t-2">
                <p className="">TOTAL PRICE:</p>
                <p>{FormatPrice(totalCostAllOrders)}</p>
              </div>

              <div className="flex justify-end items-end pt-5 gap-10">
                <Button
                  title={"UPDATE QUANTITY"}
                  type={"button"}
                  onClick={handleQuantity}
                />
                <Button
                  title={"CHECKOUT"}
                  type={"button"}
                  onClick={() => router.push("/checkout")}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* <TableCheckbox
        labelData={labelData}
        renderItems={renderItems}
        setRowData={setRowData}
        rowData={rowData}
      /> */}

      {isListProduct?.data?.length === 0 && (
        <>
          <div className="flex justify-center flex-col gap-10 items-center w-full h-full py-10">
            <img
              src="https://taphoa.cz/static/media/cart-empty-img.8b677cb3.png"
              className="w-[50%]"
            />
            <p className="font-semibold">No products</p>
          </div>
        </>
      )}
    </>
  );
};
