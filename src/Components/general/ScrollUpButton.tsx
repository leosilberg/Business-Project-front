import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { ArrowBigUp, ArrowUpWideNarrow } from "lucide-react";

function ScrollUpButton() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
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
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4">
      {isVisible && (
        <Button onClick={scrollToTop}>
          <ArrowBigUp />
        </Button>
      )}
    </div>
  );
}

export default ScrollUpButton;
