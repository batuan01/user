import { useRouter } from "next/router";
import React, { useState } from "react";


const Pagination = ({ total, paginationPage, setPaginationPage }) => {
  const router = useRouter();
  const page = Math.ceil(total / 16);

  const handlePageClick = (event) => {
    event.preventDefault();
    const go = event.target.getAttribute("data-page");
    if (go === "+1") {
      setPaginationPage((prevPage) => prevPage + 1);
      router.push("/product/?page=" + (paginationPage + 1));
    } else if (go === "-1") {
      setPaginationPage((prevPage) => prevPage - 1);
      router.push("/product/?page=" + (paginationPage - 1));
    } else {
      setPaginationPage(parseInt(go, 10));
    }
  };

  return (
    <>
      <div className="content_detail__pagination cdp" actpage={paginationPage}>
        <p data-page="-1" className="cdp_i" onClick={handlePageClick}>
          prev
        </p>
        ưer
        {page && [...Array(page).keys()]?.map((index) => (
          <p
            data-page={index + 1}
            className="cdp_i"
            key={index + 1}
            onClick={handlePageClick}
          >
            {index + 1}
          </p>
        ))}
        <p data-page="+1" className="cdp_i" onClick={handlePageClick}>
          next
        </p>
      </div>
    </>
  );
};

export default Pagination;
