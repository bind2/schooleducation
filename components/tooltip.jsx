"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export const Tooltip = ({ children, content, side = "right" }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleClick = () => setIsHovered(false);


  // Define positioning based on side prop
  const tooltipPosition = {
    top: {
      bottom: "100%",
      left: "50%",
      marginBottom: "8px",
      transform: "translateX(-50%)",
    },
    bottom: {
      top: "100%",
      left: "50%",
      marginTop: "8px",
      transform: "translateX(-50%)",
    },
    left: {
      right: "100%",
      top: "50%",
      marginRight: "8px",
      transform: "translateY(-50%)",
    },
    right: {
      left: "100%",
      top: "15%",
      marginLeft: "8px",
      transform: "translateY(-50%)",
    },
  };

  // Define the initial and exit animation for each side
  const tooltipAnimation = {
    top: { opacity: 0, scale: 0.95, y: 5 },
    bottom: { opacity: 0, scale: 0.95, y: -5 },
    left: { opacity: 0, scale: 0.95, x: 5 },
    right: { opacity: 0, scale: 0.95, x: -5 },
  };

  const tooltipExitAnimation = {
    top: { opacity: 0, scale: 0.95, y: 5 },
    bottom: { opacity: 0, scale: 0.95, y: -5 },
    left: { opacity: 0, scale: 0.95, x: 5 },
    right: { opacity: 0, scale: 0.95, x: -5 },
  };

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {children}

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={tooltipAnimation[side]}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={tooltipExitAnimation[side]}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`absolute z-50 rounded-md bg-gray-800 px-2 py-1 text-xs whitespace-nowrap text-white shadow-lg`} // Position based on the side
            style={tooltipPosition[side]}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
