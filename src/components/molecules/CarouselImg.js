import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";

export const CarouselImg = ({ items, responsive }) => {
  const renderPrevButton = ({ isDisabled = false }) => (
    <button disabled={isDisabled} className="custom-prev-button">
      <FaArrowLeft />
    </button>
  );

  const renderNextButton = ({ isDisabled = false }) => (
    <button disabled={isDisabled} className="custom-next-button">
      <FaArrowRight />
    </button>
  );

  return (
    <div>
      <AliceCarousel
        items={items}
        mouseTracking
        responsive={responsive}
        controlsStrategy="alternate"
        autoPlay
        autoPlayInterval={3000}
        infinite={true}
        renderPrevButton={renderPrevButton}
        renderNextButton={renderNextButton}
        disableDotsControls={true}
      />
    </div>
  );
};
