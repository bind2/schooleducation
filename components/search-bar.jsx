// "use client";

// import { useState, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { X } from "lucide-react"; // If you want to use the X icon

// const SearchBar = ({ placeholder = "Search...", onSearch, baseUrl = "/" }) => {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     // On mount, set input value based on URL query param "search"
//     const currentSearch = searchParams.get("search") || "";
//     setSearchTerm(currentSearch);
//   }, [searchParams]);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     const params = new URLSearchParams();

//     if (searchTerm.trim()) {
//       params.set("search", searchTerm.trim());
//     }

//     router.push(`${baseUrl}?${params.toString()}`);

//     // Call the onSearch callback prop if provided
//     if (onSearch) {
//       onSearch(searchTerm.trim());
//     }
//   };

//   const handleClear = () => {
//     setSearchTerm("");
//   };

//   return (
//     <form onSubmit={handleSearch} className="relative mb-5 w-full">
//       <input
//         type="text"
//         placeholder={placeholder}
//         className="w-full rounded-md border-2 px-4 py-2 pr-10 focus:outline-none"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//       {searchTerm && (
//         <button
//           type="button"
//           onClick={handleClear}
//           className="absolute right-2 text-gray-500 hover:text-gray-700 cursor-pointer p-1 rounded-full hover:bg-gray-100"
//           style={{ top: "50%", transform: "translateY(-50%)" }}
//         >
//           <X size={20} />
//         </button>
//       )}
//     </form>
//   );
// };

// export default SearchBar;

"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import Link from "next/link";

const SearchBar = ({
  placeholder = "Search...",
  onSearch,
  suggestions = [],
  baseUrl = "/",
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1); // NEW: for arrow key movement
  const inputRef = useRef(null);

  useEffect(() => {
    const currentSearch = searchParams.get("search") || "";
    setSearchTerm(currentSearch);
  }, [searchParams]);

  const handleSearch = (query) => {
    const params = new URLSearchParams();
    if (query.trim()) {
      params.set("search", query.trim());
    }
    router.push(`${baseUrl}?${params.toString()}`);

    if (onSearch) {
      onSearch(query.trim());
    }
    setShowSuggestions(false);
    setActiveIndex(-1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeIndex >= 0 && filteredSuggestions.length > 0) {
      handleSearch(filteredSuggestions[activeIndex]);
      setSearchTerm(filteredSuggestions[activeIndex]);
    } else {
      handleSearch(searchTerm);
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    setActiveIndex(-1);

    if (inputRef.current) {
      inputRef.current.focus(); // 👈 after clear, refocus input
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() && suggestions.length > 0) {
      const filtered = suggestions.filter((s) =>
        s.toLowerCase().includes(value.toLowerCase()),
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
      setActiveIndex(-1); // reset on new typing
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev < filteredSuggestions.length - 1 ? prev + 1 : 0,
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev > 0 ? prev - 1 : filteredSuggestions.length - 1,
      );
    }

    if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0) {
        handleSearch(filteredSuggestions[activeIndex]);
        setSearchTerm(filteredSuggestions[activeIndex]);
      } else {
        handleSearch(searchTerm);
      }
    }

    if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    handleSearch(suggestion);
  };

  return (
    <div className="relative mb-5 w-full">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          ref={inputRef}
          placeholder={placeholder}
          className="w-full rounded-md border-2 px-4 py-2 pr-10 focus:outline-none"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (filteredSuggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
        />
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            style={{ top: "50%", transform: "translateY(-50%)" }}
            className="absolute right-2 cursor-pointer rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        )}
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul
          data-lenis-prevent
          className="absolute z-10 mt-1 min-h-6 w-full overflow-hidden rounded-md border-2 bg-white shadow-md"
        >
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`cursor-pointer ${
                index === activeIndex
                  ? "bg-gray-200 font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              <Link
                href={`/admin/students/${index}`}
                className="block h-full w-full px-4 py-2"
              >
                {suggestion}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
