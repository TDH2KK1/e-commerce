import React from "react";

const ScrollbarContainer = ({ children, className }) => {
  return (
    <div className={`w-full h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 ${className}`}>
        {children}
    </div>
  );
};

export default ScrollbarContainer;