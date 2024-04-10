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
        slider_image:
          "https://bizweb.dktcdn.net/100/177/937/themes/881538/assets/slide-img4.png?1712416429944",
      },
      {
        slider_image:
          "https://bizweb.dktcdn.net/100/177/937/themes/881538/assets/slide-img5.png?1712416429944",
      },
      {
        slider_image:
          "https://bizweb.dktcdn.net/100/177/937/themes/881538/assets/slide-img1.png?1712416429944",
      },
      {
        slider_image:
          "https://thietkehaithanh.com/wp-content/uploads/2019/06/thietkehaithanh-banner-1-1.jpg",
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
