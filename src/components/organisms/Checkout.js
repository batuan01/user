import React, { useEffect, useState } from "react";
import { InputForm } from "../atoms/Input";
import { Controller, useForm } from "react-hook-form";
import { Select, pushData } from "../atoms/Select";
import { Listbox, RadioGroup, Tab } from "@headlessui/react";
import { Modal } from "../molecules/Modal";

import { TextRequired } from "../atoms/Text";
import { FormatPrice } from "../atoms/FormatPrice";
import { ListDistricts, ListProvinces, ListWards } from "../../utils/auth";

const shipping = [
  {
    name: "Giao Hàng Nhanh",
    img: "https://cdn.ntlogistics.vn/images/NTX/new_images/don-vi-giao-hang-nhanh-uy-tin-ghn-giao-hang-nhanh.jpg",
    time: "2-3 ngày",
    price: "25.000đ",
  },
  {
    name: "Giao Hàng Tiết Kiệm",
    img: "https://pos.nvncdn.com/4e732c-26/art/artCT/20181228_SbXO18pl4kMio4juj73bLjYK.png",
    time: "3-4 ngày",
    price: "20.000đ",
  },
  {
    name: "J&T Express",
    img: "https://pos.nvncdn.com/4e732c-26/art/artCT/20230227_wgp7wUbuOUJ7bTUG.png",
    time: "5-6 ngày",
    price: "15.000đ",
  },
];

export const CheckoutForm = ({
  setIsCheckout,
  dataSend,
  setDataSend,
  setIsBill,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedShipping, setSelectedShipping] = useState(shipping[0]);

  const [selectedProvince, setSelectedProvince] = useState(null);
  const [allProvince, setAllProvince] = useState();

  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [allDistrict, setAllDistrict] = useState();

  const [selectedWards, setSelectedWards] = useState(null);
  const [allWards, setAllWards] = useState();

  const {
    register,
    handleSubmit,
    reset,
    methods,
    control,
    formState: { errors },
  } = useForm();

  const handleNextClick = () => {
    if (currentStep === 3) {
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const handlePrevClick = () => {
    if (currentStep === 1) {
      return;
    }
    setCurrentStep(currentStep - 1);
  };

  const handleCloseCheckout = () => {
    setIsCheckout(false);
  };

  const arrNameStep = [
    "Personal Information",
    "Shipping Unit",
    "Payment Method",
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

  const onSubmit = (data) => {
    const shipping_info = {
      shipping_name: data.name,
      shipping_address: `${data.ward.name} , ${data.district.name}, ${data.province.name}`,
      shipping_phone: data.phonenumber,
      shipping_notes: data?.notes,
    };
    setDataSend({ ...dataSend, shipping_info });
    handleNextClick();
  };

    // lấy ra ngày tháng năm hiện tại
    const currentDate = new Date();

    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1; // Tháng bắt đầu từ 0, cần cộng thêm 1
    const currentYear = currentDate.getFullYear();

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="title">Checkout</h1>
        <div className={`step-${currentStep}`} id="checkout-progress">
          <div className="progress-bar">
            {arrNameStep.map((step, index) => (
              <div
                key={index}
                className={`step step-${step} ${
                  currentStep === index + 1 ? "active" : ""
                }`}
              >
                <span>{index + 1}</span>
                <div
                  className={`fa fa-check ${
                    currentStep >= index + 1 ? "" : "opaque"
                  }`}
                ></div>
                <div className="step-label"> {step}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="m-14">
          {currentStep === 1 ? (
            <>
              <div className="flex gap-10 justify-center">
                <div className="w-full">
                  <TextRequired>Name</TextRequired>
                  <InputForm
                    register={register("name", {
                      required: "Name cannot be left blank",
                    })}
                    type="text"
                    placeholder={"Name"}
                  />
                  {errors.name && (
                    <p className="text-[#FF6868] italic">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <TextRequired>PhoneNumber</TextRequired>
                  <InputForm
                    register={register("phonenumber", {
                      required: "Phonenumber cannot be left blank",
                    })}
                    type="text"
                    placeholder={"PhoneNumber"}
                  />
                  {errors.phonenumber && (
                    <p className="text-[#FF6868] italic">
                      {errors.phonenumber.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-10 justify-center mt-5">
                <div className="w-full h-12">
                  <TextRequired>Province</TextRequired>
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
                    <p className="text-[#FF6868] pb-3">
                      {errors.province.message}
                    </p>
                  )}
                </div>
                <div className="w-full h-12">
                  <TextRequired>District</TextRequired>
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
                    <p className="text-[#FF6868] pb-3">
                      {errors.district.message}
                    </p>
                  )}
                </div>
                <div className="w-full h-12">
                  <TextRequired>Wards</TextRequired>
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
                    <p className="text-[#FF6868] pb-3">{errors.ward.message}</p>
                  )}
                </div>
              </div>

              <div className="mt-14">
                <p>Notes</p>
                <textarea
                  className="resize-y rounded-md w-full border border-gray-300 border-solid p-3"
                  {...register("notes")}
                ></textarea>
              </div>
            </>
          ) : null}
        </div>

        <div className="m-14">
          {currentStep === 2 ? (
            <>
              <div className="w-full px-4 py-16">
                <div className="mx-auto w-full">
                  <RadioGroup
                    value={selectedShipping}
                    onChange={setSelectedShipping}
                  >
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
                                  <span>{plan.price}</span>
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
              </div>
            </>
          ) : null}
        </div>

        <div className="m-14">
          {currentStep === 3 ? (
            <>
              <div className="flex justify-center w-full">
                <div className="min-w-[500px] border-t-8 border-solid border-blue-400 p-5 rounded-lg bg-slate-200 my-10">
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
                    Điện thoại khách hàng:{" "}
                    {dataSend?.shipping_info?.shipping_phone}
                  </p>
                  <p>
                    Địa chỉ khách hàng:{" "}
                    {dataSend?.shipping_info?.shipping_address}
                  </p>

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
                        const filteredProductColors =
                          item.product_colors.filter(
                            (color) => color.color_id === item.color_id
                          );

                        return (
                          <tr className="border-b border-gray-300" key={index}>
                            <td className="px-4 py-2">
                              {TruncateText(
                                item.product_detail.product_name,
                                50
                              )}
                            </td>
                            <td className="px-4 py-2">
                              {getColorName(item.color_id)}
                            </td>
                            <td className="px-4 py-2">
                              {item.product_quantity}
                            </td>
                            <td className="px-4 py-2">
                              {FormatPrice(
                                filteredProductColors[0].product_price
                              )}
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
                        <td className="px-4 py-2">TOTAL</td>
                        <td className="px-4 py-2">
                          {FormatPrice(totalCostAllOrders)}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2"></td>
                        <td className="px-4 py-2"></td>
                        <td className="px-4 py-2"></td>
                        <td className="px-4 py-2">COUPON</td>
                        <td className="px-4 py-2">{FormatPrice(dataCoupon)}</td>
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
                        <td className="px-4 py-2">
                          {FormatPrice(totalCostAllOrders - dataCoupon)}
                        </td>
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
            </>
          ) : null}
        </div>

        <div className="button-container">
          <div
            className={`btn btn-prev ${currentStep === 0 ? "disabled" : ""}`}
            onClick={currentStep === 1 ? handleCloseCheckout : handlePrevClick}
          >
            Previous step
          </div>
          <button
            className={`btn btn-next ${currentStep === 4 ? "disabled" : ""}`}
            type={currentStep === 1 ? "submit" : "button"}
            onClick={() => {
              if (currentStep === 2) {
                handleNextClick();
              }
              if (currentStep === 3) {
                setIsBill(true);
                setDataSend({ ...dataSend, payment_id: 1 });
              }
            }}
          >
            Next step
          </button>
        </div>
      </form>
    </>
  );
};

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
