import React, { useEffect, useState } from "react";
import { IoArrowUpCircleOutline } from "react-icons/io5";
import "./ScrollToTop.css";
export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);


  const toggleVisibility = () => {
    if (window.pageYOffset > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="scroll-to-top" role="button">
      {isVisible && (
        <div onClick={scrollToTop}>
          <IoArrowUpCircleOutline style={{ width: "60px", height: "60px" }} />
        </div>
      )}
    </div>
  );
}
