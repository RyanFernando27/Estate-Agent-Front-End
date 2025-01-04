// components/ScrollButton.js

import React, { useState } from "react";
// import { GoArrowUp } from "react-icons/go";
import { FaArrowUpLong } from "react-icons/fa6";
import { Button } from "./Styles";
import { GoArrowUp } from "react-icons/go";

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <Button className="">
      <GoArrowUp
        onClick={scrollToTop}
        style={{
          display: visible ? "inline" : "none",
          backgroundColor: "rgb(255, 255, 255)",
          borderRadius: "25%",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
          color: "rgb(0, 110, 255)",
        }}
      />
    </Button>
  );
};

export default ScrollButton;
