import { useContext, useEffect, useRef, useState, Fragment } from "react";
import { TruncateText } from "../atoms/TruncateText";
import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";
import Cookies from "js-cookie";
import { ProductContext } from "../contexts/ProductContext";

export const MiniCart = ({ content }) => {
  const { isListProduct, setIsListProduct } = useContext(ProductContext);
  return (
    <Menu as="div" className={`relative inline-block text-left`}>
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-none px-3 text-sm font-semibold shadow-sm ring-inset ring-gray-300 hover:bg-gray-50">
          {content}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none w-96 translate-x-10 translate-y-6">
          <div
            className="absolute h-0 w-0 border-solid right-11"
            style={{
              transform: "translateY(-12px)",
              borderWidth: "0 15px 15px 15px",
              borderColor: "transparent transparent #fff transparent",
            }}
          ></div>

          <div>
            {isListProduct?.map((item, index) => (
              <Menu.Item key={index}>
                <>
                  <div
                    className="flex items-center justify-between py-3 hover:bg-gray_light hover:rounded-md p-5 cursor-pointer"
                    key={index}
                  >
                    <div className="w-[15%]">
                      <img
                        className="w-10 h-10 rounded-full"
                        src={item.product_detail.product_image}
                        alt={item.product_detail.product_name}
                      />
                    </div>
                    <p
                      style={{ wordWrap: "break-word" }}
                      className="text-sm text-black w-[60%]"
                    >
                      {TruncateText(item.product_detail.product_name, 60)}
                    </p>
                    <p className="text-sm text-black w-[15%] pl-3">
                      x{item.product_quantity}
                    </p>
                  </div>
                </>
              </Menu.Item>
            ))}
            {isListProduct.length > 0 ? (
              <div className="flex justify-between items-center gap-2 p-5 cursor-pointer">
                <p className="text-right text-black">
                  {isListProduct.length} sản phẩm đã thêm{" "}
                </p>
                <Link href="/cart">
                  <div className="bg-[var(--primary-color)] flex justify-between items-center gap-2 p-2">
                    <p className="text-right text-white">Xem giỏ hàng </p>
                    <FaShoppingCart className="text-white" />
                  </div>
                </Link>
              </div>
            ) : (
              <div className="h-56 flex justify-center flex-col items-center gap-4">
                <img
                  src="https://taphoa.cz/static/media/cart-empty-img.8b677cb3.png"
                  className="w-[80%]"
                />
                <p>Không có sản phẩm nào</p>
              </div>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
