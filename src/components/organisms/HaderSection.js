import { useEffect } from "react";

import React, { useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";

export const HaderSection = () => {
  useEffect(() => {
    const activate = (e) => {
      const slider = document.querySelector(".slider");
      if (slider) {
        const items = document.querySelectorAll(".item_header");
        e.target.matches(".next") && slider.append(items[0]);
        e.target.matches(".prev") && slider.prepend(items[items.length - 1]);
      }
    };

    document.addEventListener("click", activate, false);

    return () => {
      document.removeEventListener("click", activate, false);
    };
  }, []);

  const [items, setItems] = useState([
    {
      backgroundImage:
        "https://zda.vn/wp-content/uploads/2021/04/dien-thoai-samsung-2-2048x1152.jpg",
      title: "5",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.",
    },
    {
      backgroundImage:
        "https://th.bing.com/th/id/R.8baa8910d7607bdc24251faa7981408e?rik=gUsd12odYx5M2g&pid=ImgRaw&r=0",
      title: "Estrange Bond",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.",
    },
    {
      id: 3,
      backgroundImage:
        "https://danviet.mediacdn.vn/2021/1/2/2-1609553273528814827700.jpg",
      title: "The Gate Keeper",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.",
      buttonText: "Read More",
    },
    {
      id: 4,
      backgroundImage:
        "https://cdn.vietnammoi.vn/171464242508312576/2020/4/20/top-dien-thoai-chup-hinh-1-1587399375548846515816-15873994638171119435604.jpg",
      title: "Last Trace Of Us",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.",
      buttonText: "Read More",
    },
    {
      id: 5,
      backgroundImage:
        "https://phongreviews.com/wp-content/uploads/2021/06/dien-thoai-xiaomi-1-2048x1363.jpg",
      title: "Urban Decay",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.",
      buttonText: "Read More",
    },
    {
      id: 6,
      backgroundImage:
        "https://img.phonandroid.com/2020/02/Samsung-Galaxy-S20-07.jpg",
      title: "The Migration",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.",
      buttonText: "Read More",
    },
  ]);

  return (
    <>
      <div className="main_header">
        <ul className="slider">
          {items.map((item, index) => (
            <li
              key={index}
              className="item_header"
              style={{ backgroundImage: `url(${item.backgroundImage})` }}
            >
              <div className="content">
                <h2 className="title-header">{item.title}</h2>
                <p className="description">{item.description}</p>
                <button id="A">Read More</button>
              </div>
            </li>
          ))}
        </ul>
        <nav className="nav_button">
          <div className="btn prev" name="arrow-forward-outline">
            <FaAngleLeft className="prev" style={{ fontSize: "30px" }} />
          </div>
          <div className="btn next" name="arrow-forward-outline">
            <FaAngleRight className="next" style={{ fontSize: "30px" }} />
          </div>
        </nav>
      </div>
    </>
  );
};
