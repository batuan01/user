import { NewsDetail } from "../../../components/organisms/NewsDetail";

export const metadata = {
  title: "Technology",
  description: "Generated by create next app",
};
const NewsDetailPage = () => {
  return (
    <>
      <div className="container mx-auto py-10">
        <NewsDetail/>
      </div>
    </>
  );
};
export default NewsDetailPage;
