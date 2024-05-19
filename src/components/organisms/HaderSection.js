import { useEffect } from "react";

import React, { useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { GetSliders } from "../../utils/auth";
import styled from "styled-components";
import { useRouter } from "next/router";

export const HaderSection = () => {
  const [items, setItems] = useState();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetSliders();

        const data = result.map((item, index) => ({
          id: index + 1,
          backgroundImage: item.slider_image,
          title: item.slider_name,
          description: item.slider_content,
          buttonText: "Read More",
        }));

        setItems(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
  }, [items]);

  return (
    <>
      <div className="main_header">
        <ul className="slider">
          {items?.map((item, index) => {
            return (
              <li key={index} className="item_header">
                <img src={item.backgroundImage} className="h-full" />
                <div className="content">
                  <h2 className="title-header">{item.title}</h2>
                  <p
                    className="description"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  ></p>
                  <button id="A" onClick={() => router.push("/product")}>
                    Read More
                  </button>
                </div>
              </li>
            );
          })}
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
