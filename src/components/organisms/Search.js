import { FaSearch } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/router";

export const Search = ({ showSearch, setShowSearch }) => {
   const router = useRouter();
  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const keyword = e.target.value;
      setShowSearch(false);
      router.push(`/search/?keyword=${keyword}`);
    }
  };
  return (
    <>
      {/* <!--==================== SEARCH ====================--> */}
      <div className={`search ${showSearch ? "show-search" : ""}`} id="search">
        <form action="" className="search__form">
          <FaSearch />
          <input
            type="search"
            placeholder="What are you looking for?"
            className="search__input"
            onKeyDown={handleKeyDown}
          />
        </form>

        <span onClick={toggleSearch}>
          <AiOutlineClose className="search__close" id="search-close" />
        </span>
      </div>
    </>
  );
};
