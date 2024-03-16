import { useContext, useEffect, useState } from "react";
import { GetNewsDetail } from "../../utils/auth";
import { AuthContext } from "../contexts/AuthContext";
import { useRouter } from "next/router";

export const NewsDetail = () => {
  const { setBreadcrumb, setLoad } = useContext(AuthContext);
  useEffect(() => {
    setBreadcrumb("News");
  }, []);

  const router = useRouter();
  const { id } = router.query;

  const [dataNews, setDataNews] = useState();

  useEffect(() => {
    const fetch = async () => {
      const data = await GetNewsDetail({ news_id: id });
      setDataNews(data);
      setLoad(false);
    };

    fetch();
  }, []);
  return (
    <>
      <p className="text-2xl font-bold py-5">
        <center>{dataNews?.news_name}</center>
      </p>
      <div dangerouslySetInnerHTML={{ __html: dataNews?.news_content }}></div>
    </>
  );
};
