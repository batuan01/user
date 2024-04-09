import React, { useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const CarouselOneImg = ({ height }) => {
  const data = [
    {
      slider_image:
        "https://media-cdn-v2.laodong.vn/storage/newsportal/2023/8/26/1233821/Giai-Nhi-1--Nang-Tre.jpg",
    },
    {
      slider_image:
        "https://media-cdn-v2.laodong.vn/storage/newsportal/2023/8/26/1233821/Giai-Nhi-1--Nang-Tre.jpg",
    },
    {
      slider_image:
        "https://media-cdn-v2.laodong.vn/storage/newsportal/2023/8/26/1233821/Giai-Nhi-1--Nang-Tre.jpg",
    },
    {
      slider_image:
        "https://media-cdn-v2.laodong.vn/storage/newsportal/2023/8/26/1233821/Giai-Nhi-1--Nang-Tre.jpg",
    },
  ];
  const items = data.map((item, index) => (
    <div key={index} className="div_li_ca">
      <img
        src={item.slider_image}
        alt={`Image ${index + 1}`}
        height={height}
        width={"100%"}
      />
    </div>
  ));

  const renderPrevButton = ({ isDisabled = false }) => (
    <button disabled={isDisabled} className="custom-prev-button">
      321
    </button>
  );

  const renderNextButton = ({ isDisabled = false }) => (
    <button disabled={isDisabled} className="custom-next-button">
      123
    </button>
  );

  const responsive = {
    0: { items: 1 },
    768: { items: 3 },
    1024: { items: 4 },
  };

  const items1 = [
    <div key="1" className="item" data-value="1">1</div>,
    <div key="2" className="item" data-value="2">2</div>,
    <div key="3" className="item" data-value="3">3</div>,
    <div key="4" className="item" data-value="4">4</div>,
    <div key="5" className="item" data-value="5">5</div>,
];


  return (
    <main className="h-[100vh]">
      <AliceCarousel
        items={items1}
        mouseTracking
        autoPlay
        autoPlayInterval={3000}
        infinite
        responsive={responsive}
        renderPrevButton={renderPrevButton}
        renderNextButton={renderNextButton}
        disableDotsControls={true}
        // autoWidth={true}
        controlsStrategy="alternate"
      />
    </main>
  );
};

export default CarouselOneImg;
