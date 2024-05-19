import { FaArrowRight } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { CarouselImg } from "../molecules/CarouselImg";

export const ListProductTop = () => {
  const [items, setItems] = useState();
  useEffect(() => {
    const data = [
      {
        slider_image: "images/banner_1.jpg",
      },
      {
        slider_image: "images/banner_2.jpg",
      },
      {
        slider_image: "images/banner_3.jpg",
      },
      {
        slider_image: "images/banner_4.jpg",
      },
    ];
    const itemsImage = data.map((item, index) => (
      <div key={index} className="mx-2">
        <img src={item.slider_image} className="h-52 rounded-lg" />
      </div>
    ));
    setItems(itemsImage);
  }, []);
  const responsive = {
    0: { items: 1 },
    768: { items: 2 },
    1024: { items: 2 },
  };
  return <CarouselImg responsive={responsive} items={items} />;
};
