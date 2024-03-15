import { FaMouse } from "react-icons/fa";
import { FaKeyboard } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { FaHeadphones } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { FaCompressAlt } from "react-icons/fa";
import { FaSquare } from "react-icons/fa";
import { FaUsb } from "react-icons/fa";
import { FaThermometer } from "react-icons/fa";
import { FaDonate } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export const ListCategoryBottom = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  const items = [
    {
      icon: <FaMouse fontSize="inherit" />,
      name: "Chuột máy tính",
      bgcolor: "#BC7AF9",
    },
    {
      icon: <FaKeyboard fontSize="inherit" />,
      name: "Bàn phím",
      bgcolor: "#FFA1F5",
    },
    {
      icon: <FaShoppingBag fontSize="inherit" />,
      name: "Balo, túi xách",
      bgcolor: "#F8FF95",
    },
    {
      icon: <FaHeadphones fontSize="inherit" />,
      name: "Loa, tai nghe",
      bgcolor: "#A6FF96",
    },
    {
      icon: <FaSave fontSize="inherit" />,
      name: "Ổ cứng di động",
      bgcolor: "#96C291",
    },
    {
      icon: <FaCompressAlt fontSize="inherit" />,
      name: "Cổng chuyển đổi",
      bgcolor: "#FFDBAA",
    },
    {
      icon: <FaSquare fontSize="inherit" />,
      name: "Bàn di chuột",
      bgcolor: "#FFB7B7",
    },
    {
      icon: <FaUsb fontSize="inherit" />,
      name: "USB flash",
      bgcolor: "#F4EEEE",
    },
    {
      icon: <FaThermometer fontSize="inherit" />,
      name: "Keo tản nhiệt",
      bgcolor: "#E7B10A",
    },
    {
      icon: <FaDonate fontSize="inherit" />,
      name: "Phần mềm bản quyền",
      bgcolor: "#F2EE9D",
    },
  ];
  return (
    <>
      <div className="container mx-auto">
        <div className="bg-white rounded-[20px] p-12 flex justify-center items-center">
          <div className="grid gap-8 grid-cols-5" data-aos="zoom-in">
            {items.map((item, index) => (
              <div key={index} className="w-28" style={{cursor:'pointer'}}>
                <div
                  className="w-full h-[112px] rounded-[20px] flex justify-center items-center text-7xl"
                  style={{ background: `${item.bgcolor}` }}
                >
                  {item.icon}
                </div>
                <p className="mt-1 text-center text-sm">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
