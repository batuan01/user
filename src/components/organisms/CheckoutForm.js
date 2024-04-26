import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import {
  DeleteAllProductCart,
  GetCouponBycode,
  ListCarts,
  ListDistricts,
  ListProvinces,
  ListWards,
  OrderProduct,
  PostVNPay,
} from "../../utils/auth";
import { CheckIcon, CouponIcon, MarkerIcon, PaymentIcon } from "../atoms/Icon";
import { ButtonModal } from "../atoms/Button";
import { FaPlusCircle } from "react-icons/fa";
import { FcSmartphoneTablet, FcShipped, FcSurvey } from "react-icons/fc";
import { TruncateText } from "../atoms/TruncateText";
import { FormatPrice } from "../atoms/FormatPrice";
import Notification from "../atoms/Notification";
import { InputForm, InputFormUser } from "../atoms/Input";
import { RadioGroupForm } from "../atoms/RadioGroup";
import { Modal } from "../molecules/Modal";
import { TextRequired } from "../atoms/Text";
import { Select, pushData } from "../atoms/Select";
import { RadioGroup } from "@headlessui/react";

const shipping = [
  {
    name: "Giao Hàng Nhanh",
    img: "https://cdn.ntlogistics.vn/images/NTX/new_images/don-vi-giao-hang-nhanh-uy-tin-ghn-giao-hang-nhanh.jpg",
    time: "2-3 ngày",
    price: 25000,
  },
  {
    name: "Giao Hàng Tiết Kiệm",
    img: "https://pos.nvncdn.com/4e732c-26/art/artCT/20181228_SbXO18pl4kMio4juj73bLjYK.png",
    time: "3-4 ngày",
    price: 20000,
  },
  {
    name: "J&T Express",
    img: "https://pos.nvncdn.com/4e732c-26/art/artCT/20230227_wgp7wUbuOUJ7bTUG.png",
    time: "5-6 ngày",
    price: 15000,
  },
];
export const CheckoutForm = () => {
  const { setBreadcrumb, setLoad } = useContext(AuthContext);
  const [isListProduct, setIsListProduct] = useState([]);
  const [dataCoupon, setDataCoupon] = useState(0);
  const [dataInputCoupon, setDataInputCoupon] = useState();
  const [selectedOption, setSelectedOption] = useState("1");
  const [isOpenAddress, setIsOpenAddress] = useState(false);
  const [isOpenTransport, setIsOpenTransport] = useState(false);

  const [selectedProvince, setSelectedProvince] = useState(null);
  const [allProvince, setAllProvince] = useState();

  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [allDistrict, setAllDistrict] = useState();

  const [selectedWards, setSelectedWards] = useState(null);
  const [allWards, setAllWards] = useState();

  const [selectedShipping, setSelectedShipping] = useState(shipping[0]);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    methods,
    reset,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const value = getValues();
  const storedIdCustomer = Cookies.get("id_customer");
  let IdCustomer;
  if (storedIdCustomer) {
    IdCustomer = atob(storedIdCustomer);
  }

  useEffect(() => {
    setBreadcrumb("Checkout");
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
  }, [IdCustomer]);

  //lấy ra color mà sản phẩm có
  const getColorName = (colorId) => {
    const color = isListProduct?.colors?.find(
      (item) => item.color_id === colorId
    );
    return color ? color.color_name : "";
  };

  //lấy ra price
  const getPrice = (colorId) => {
    if (isListProduct && isListProduct.data) {
      for (let item of isListProduct.data) {
        const foundColor = item.product_colors.find(
          (product) => product.color_id === colorId
        );
        if (foundColor) {
          return foundColor.product_price;
        }
      }
    }
    return null;
  };

  //tổng tiền
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

  const handleGetCoupon = async () => {
    const payload = {
      coupon_code: dataInputCoupon,
    };
    const result = await GetCouponBycode(payload);
    if (typeof result === "object") {
      Notification.error("Invalid discount code!");
    } else {
      setDataCoupon(result);
      Notification.success("Apply discount code successfully!");
    }
  };

  const optionsRadioTypePayment = [
    { value: "1", label: "Payment on delivery" },
    { value: "2", label: "Pay with VNPay" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await ListProvinces();
        setAllProvince(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await ListDistricts(selectedProvince);
        setAllDistrict(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (selectedProvince) {
      fetchData();
    }
  }, [selectedProvince]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await ListWards(selectedDistrict);
        setAllWards(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (selectedDistrict) {
      fetchData();
    }
  }, [selectedProvince, selectedDistrict]);

  let ContentProvinces = [];
  pushData({
    arrayForm: ContentProvinces,
    data: allProvince?.provinces,
  });

  let ContentDistrict = [];
  pushData({
    arrayForm: ContentDistrict,
    data: allDistrict?.districts,
  });

  let ContentWards = [];
  pushData({
    arrayForm: ContentWards,
    data: allWards?.wards,
  });

  // useEffect(() => {
  //   reset({
  //     ward: "",
  //     district: "",
  //   });
  //   setSelectedDistrict(null);
  //   setSelectedWards(null);
  // }, [selectedProvince]);

  // useEffect(() => {
  //   reset({
  //     ward: "",
  //   });
  //   setSelectedWards(null);
  // }, [selectedDistrict]);

  const handleCloseModalAddress = () => {
    setIsOpenAddress(false);
    reset();
  };

  const handleCreateAddress = () => {
    setIsOpenAddress(false);
  };

  const ContentModalAddress = (
    <form
      onSubmit={handleSubmit(handleCreateAddress)}
      className="min-h-[500px]"
    >
      <p className="text-lg font-medium">New Address</p>
      <div className="flex gap-5 mt-5">
        <InputFormUser
          register={register("shipping_name", {
            required: "Fullname cannot be left blank",
          })}
          type="text"
          placeholder={"fullname"}
          errors={errors}
          name={"shipping_name"}
          label={"Fullname"}
        />
        <InputFormUser
          register={register("shipping_phone", {
            required: "Phonenumber cannot be left blank",
          })}
          type="text"
          placeholder={"phone number"}
          errors={errors}
          name={"shipping_phone"}
          label={"Phone"}
        />
      </div>
      <div className="flex gap-5 mt-5">
        <div className="w-full mt-2">
          <p>Province</p>
          <Controller
            methods={methods}
            name="province"
            control={control}
            rules={{ required: "Province is required" }}
            render={({ field }) => {
              const { onChange, value, ref } = field;
              return (
                <Select
                  selected={selectedProvince}
                  content={ContentProvinces}
                  onChange={(value) => {
                    onChange(value);
                    setSelectedProvince(value);
                  }}
                />
              );
            }}
          />

          {errors.province && (
            <p className="text-red text-xs italic pt-1">
              {errors.province.message}
            </p>
          )}
        </div>
        <div className="w-full mt-2">
          <p>District</p>
          <Controller
            methods={methods}
            name="district"
            control={control}
            rules={{ required: "District is required" }}
            render={({ field }) => {
              const { onChange, value, ref } = field;
              return (
                <Select
                  selected={selectedDistrict}
                  content={ContentDistrict}
                  onChange={(value) => {
                    onChange(value);
                    setSelectedDistrict(value);
                  }}
                />
              );
            }}
          />

          {errors.district && (
            <p className="text-red text-xs italic pt-1">
              {errors.district.message}
            </p>
          )}
        </div>
      </div>
      <div className="w-full mt-2">
        <p>Wards</p>
        <Controller
          methods={methods}
          name="ward"
          control={control}
          rules={{ required: "Wards is required" }}
          render={({ field }) => {
            const { onChange, value, ref } = field;
            return (
              <Select
                selected={selectedWards}
                content={ContentWards}
                onChange={(value) => {
                  onChange(value);
                  setSelectedWards(value);
                }}
              />
            );
          }}
        />

        {errors.ward && (
          <p className="text-red text-xs italic pt-1">{errors.ward.message}</p>
        )}
      </div>
      <div className="mt-2">
        <p>Specific Address</p>
        <textarea
          className="resize-y rounded-sm w-full border border-stone-400 border-solid p-3"
          {...register("specific_address")}
        />
      </div>
      <div className="flex justify-end items-center gap-5 pt-5">
        <ButtonModal
          title={"Cancel"}
          type={"button"}
          sizeSm={true}
          onClick={() => {
            handleCloseModalAddress();
          }}
          className={"border-black border-[1px] w-20 text-black bg-slate-500"}
        />
        <ButtonModal
          title={"Create"}
          type={"submit"}
          sizeSm={true}
          className={"w-20 bg-[#1b84ff]"}
        />
      </div>
    </form>
  );

  const handleCloseModalTransport = () => {
    setIsOpenTransport(false);
  };

  const ContentModalTransport = (
    <div>
      <p className="text-lg font-medium">Shipping Unit</p>

      <div className="mx-auto w-full px-4 py-10 min-w-[500px]">
        <RadioGroup value={selectedShipping} onChange={setSelectedShipping}>
          <div className="space-y-2">
            {shipping.map((plan, index) => (
              <RadioGroup.Option
                key={index}
                value={plan}
                className={({ active, checked }) =>
                  `${
                    active
                      ? "ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300"
                      : ""
                  }
                  ${checked ? "bg-sky-900/75 text-white" : "bg-white"}
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center justify-between w-full mr-10">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium flex flex-col gap-3 justify-center items-center w-36 ${
                              checked ? "text-white" : "text-gray-900"
                            }`}
                          >
                            <img src={plan.img} className="w-20" />
                            {plan.name}
                          </RadioGroup.Label>
                        </div>
                        <span>{plan.time}</span>
                        <span>{FormatPrice(plan.price)}</span>
                      </div>
                      {checked && (
                        <div className="shrink-0 text-white">
                          <CheckIcon className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>

      <div className="flex justify-end items-center gap-5 pt-5">
        <ButtonModal
          title={"Update"}
          type={"button"}
          sizeSm={true}
          onClick={() => {
            handleCloseModalTransport();
          }}
          className={"w-20 bg-[#1b84ff]"}
        />
      </div>
    </div>
  );

  const PushOrder = async () => {
    const dataSend = {
      customer_id: Number(IdCustomer),
      order_total: totalCostAllOrders + selectedShipping.price - dataCoupon,
      order_status: 1,
      payment_id: Number(selectedOption),
      shipping_info: {
        shipping_name: value.shipping_name,
        shipping_address: `${
          value.specific_address ? `${value.specific_address}, ` : ""
        } ${value.ward?.name}, ${value.district?.name}, ${
          value.province?.name
        }`,
        shipping_phone: value.shipping_phone,
        shipping_notes: value.notes,
      },
      order_detail: isListProduct?.data?.map((item) => ({
        product_id: item.product_detail.product_id,
        color_id: item.color_id,
        product_image: item.product_detail.product_image,
        product_name: item.product_detail.product_name,
        product_price: getPrice(item.color_id),
        product_sales_quantity: item.product_quantity,
      })),
    };
    if (
      !dataSend.shipping_info.shipping_name ||
      !dataSend.shipping_info.shipping_phone
    ) {
      Notification.error("Please enter complete information!");
    } else {
      const result = await OrderProduct(dataSend);
      const payload = {
        customer_id: dataSend.customer_id,
      };
      await DeleteAllProductCart(payload);
      Notification.success("Order successfully!");
      return result.data.order_id;
    }
  };

  const handleVnpayPayment = async ({ orderID }) => {
    try {
      const payload = {
        total: totalCostAllOrders + selectedShipping.price - dataCoupon,
        fee: 0,
        order_id: orderID,
      };
      const response = await PostVNPay(payload);
      router.push(response.data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const CompleteOrder = async () => {
    if (selectedOption === "1") {
      const orderID = await PushOrder();
      if (orderID) {
        router.push("/thanks");
      }
    } else {
      const orderID = await PushOrder();
      if (orderID) {
        handleVnpayPayment({ orderID });
      }
    }
  };

  return (
    <>
      <div className="line-top"></div>
      <div className="bg-white px-10 py-5">
        <div className="flex gap-5 items-center">
          <MarkerIcon />
          <p className="text-[#ee4d2d] text-2xl">Delivery Address</p>
        </div>
        <div className="flex gap-10 items-center mt-5">
          <ButtonModal
            title={selectedWards ? "Update" : "Add"}
            type={"button"}
            sizeSm={true}
            onClick={() => setIsOpenAddress(true)}
            textBlack
            className={
              "bg-blue-200 text-[#1B84FF] hover:bg-[#1B84FF] hover:text-white w-fit"
            }
            icon={<FaPlusCircle />}
          />
          {selectedWards ? (
            <div>
              <p>
                <span className="font-semibold">{value.shipping_name}</span> |
                <span className="ml-1">{value.shipping_phone}</span>
              </p>
              <p>{value.specific_address}</p>
              <p>
                {value.ward?.name}, {value.district?.name},
                {value.province?.name}
              </p>
            </div>
          ) : null}
        </div>
        <Modal
          isOpen={isOpenAddress}
          setIsOpen={handleCloseModalAddress}
          content={ContentModalAddress}
        />
      </div>

      <div className="bg-white px-10 py-5 mt-5">
        <div className="flex gap-5 items-center">
          <FcSmartphoneTablet className="text-2xl" />
          <p className="text-[#ee4d2d] text-2xl">Product</p>
        </div>
        <table className="table-auto w-full border-collapse mt-5 text-center">
          <thead className="bg-gray-200">
            <tr className="border-b border-gray-300 ">
              <th className="px-4 py-2 text-center">NAME</th>
              <th className="px-4 py-2 text-center">COLOR</th>
              <th className="px-4 py-2 text-center">QUANTITY</th>
              <th className="px-4 py-2 text-center">UNIT PRICE</th>
              <th className="px-4 py-2 text-center">DISCOUNT</th>
              <th className="px-4 py-2 text-center">AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            {isListProduct?.data?.map((item, index) => {
              const filteredProductColors = item.product_colors.filter(
                (color) => color.color_id === item.color_id
              );

              return (
                <tr className="border-b border-gray-300" key={index}>
                  <td className="px-4 py-2">
                    {TruncateText(item.product_detail.product_name, 50)}
                  </td>
                  <td className="px-4 py-2">{getColorName(item.color_id)}</td>
                  <td className="px-4 py-2">{item.product_quantity}</td>
                  <td className="px-4 py-2">
                    {FormatPrice(filteredProductColors[0].product_price)}
                  </td>
                  <td className="px-4 py-2">
                    {item.product_detail.product_sale}%
                  </td>
                  <td className="px-4 py-2">
                    {FormatPrice(
                      filteredProductColors[0].product_price -
                        (filteredProductColors[0].product_price *
                          item.product_detail.product_sale) /
                          100
                    )}
                  </td>
                </tr>
              );
            })}

            <tr>
              <td className="px-4 py-2"></td>
              <td className="px-4 py-2"></td>
              <td className="px-4 py-2"></td>
              <td className="px-4 py-2"></td>
              <td className="px-4 py-2 font-semibold">TOTAL</td>
              <td className="px-4 py-2">{FormatPrice(totalCostAllOrders)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-white px-10 py-5 mt-5 flex gap-10">
        <div className="w-1/2">
          <div className="flex gap-5 items-center">
            <CouponIcon className="text-3xl w-7" />
            <p className="text-[#ee4d2d] text-2xl">Coupon</p>
          </div>
          <div className="flex items-center gap-5 mt-5 w-3/4">
            <InputForm
              type="text"
              placeholder={"code"}
              onChange={(e) => {
                setDataInputCoupon(e.target.value);
              }}
            />
            <ButtonModal
              title={"Check"}
              type={"button"}
              sizeSm={true}
              textBlack
              className={
                "bg-blue-400 text-[white] hover:bg-[#1B84FF] hover:text-white"
              }
              onClick={handleGetCoupon}
            />
          </div>
        </div>
        <div className="w-1/2">
          <div className="flex gap-5 items-center">
            <PaymentIcon className="text-3xl w-7" />
            <p className="text-[#ee4d2d] text-2xl">Payment Methods</p>
          </div>
          <div className="mt-5">
            <RadioGroupForm
              options={optionsRadioTypePayment}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />
          </div>
        </div>
      </div>

      <div className="bg-white px-10 py-5 mt-5 flex gap-10">
        <div className="w-1/2">
          <div className="flex gap-5 items-center">
            <FcSurvey className="text-3xl w-7" />
            <p className="text-[#ee4d2d] text-2xl">Notes</p>
          </div>
          <textarea
            className="mt-5 resize-y rounded-sm w-full border border-stone-400 border-solid p-3"
            {...register("notes")}
          />
        </div>

        <div className="w-1/2">
          <div className="flex gap-5 items-center">
            <FcShipped className="text-3xl" />
            <p className="text-[#ee4d2d] text-2xl">Shipping Unit</p>
          </div>

          <div className="flex gap-10 justify-between items-center mt-5">
            <ButtonModal
              title={"Edit"}
              type={"button"}
              sizeSm={true}
              onClick={() => setIsOpenTransport(true)}
              textBlack
              className={
                "bg-blue-200 text-[#1B84FF] hover:bg-[#1B84FF] hover:text-white w-fit"
              }
              icon={<FaPlusCircle />}
            />
            <div className="text-right">
              <p>{selectedShipping.name}</p>
              <p>{FormatPrice(selectedShipping.price)}</p>
            </div>
          </div>
          <Modal
            isOpen={isOpenTransport}
            setIsOpen={handleCloseModalTransport}
            content={ContentModalTransport}
          />
        </div>
      </div>
      <div className="bg-white px-10 py-5 flex justify-end border-t-2">
        <div>
          <div className="flex gap-10 items-center justify-between">
            <p className="font-normal text-base">Total</p>
            <p className="font-normal text-base">
              {FormatPrice(totalCostAllOrders)}
            </p>
          </div>
          <div className="flex gap-10 items-center justify-between">
            <p className="font-normal text-base">Transport fee</p>
            <p className="font-normal text-base">
              {FormatPrice(selectedShipping.price)}
            </p>
          </div>
          <div className="flex gap-10 items-center justify-between">
            <p className="font-normal text-base">Coupon</p>
            <p className="font-normal text-base">{FormatPrice(dataCoupon)}</p>
          </div>
          <div className="flex gap-10 items-center justify-between">
            <p className="font-normal text-base">Total payment</p>
            <p className="font-normal text-2xl text-[#ee4d2d]">
              {FormatPrice(
                totalCostAllOrders + selectedShipping.price - dataCoupon
              )}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white px-10 py-5 flex justify-end gap-10 border-t-[1px]">
        <button
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 border-solid hover:border-transparent rounded "
          onClick={CompleteOrder}
        >
          Complete Order
        </button>
      </div>
    </>
  );
};
