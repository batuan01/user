import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { GetAllNews } from "../../utils/auth";

import Link from "next/link";
import { FormatDate } from "../atoms/FormatDate";
import { useRouter } from "next/router";

export const NewsForm = () => {
  const { setBreadcrumb, setLoad } = useContext(AuthContext);
  const [dataNews, setDataNews] = useState();
  const router = useRouter();
  useEffect(() => {
    setBreadcrumb("News");
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const data = await GetAllNews();
      setDataNews(data);
      setLoad(false);
    };

    fetch();
  }, []);
  return (
    <div className="content-wrapper">
      {dataNews?.data.map((item, index) => (
        <div className="news-card" key={index}>
          <img src={item.news_image} alt="" className="news-card__image" />
          <div className="news-card__text-wrapper  w-full">
            <h2 className="news-card__title">{item.news_name}</h2>
            <div className="news-card__post-date">
              {FormatDate({ dateString: item.created_at })}
            </div>
            <div className="news-card__details-wrapper">
              <p className="news-card__excerpt">
                {/* TRUNG QUỐC - Công ty Unitree Robotics thông báo robot hình người
                H1 đi bằng hai chân của họ lập kỷ lục tốc độ mới khi di chuyển ở
                vận tốc 3,3 mét/giây (11,9 km/h).&hellip; */}
              </p>
              <Link
                href={"/news/" + item.news_id}
                className="news-card__read-more"
              >
                Read more
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
