// 'use client'

// import { useState } from "react";

// export function ScrollArea({ children, className = "" }) {
//   const [hovered, setHovered] = useState(false);

//   return (
//     <div
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       className={`flex-1 overflow-y-auto transition-all duration-300 ${
//         hovered ? "scrollbar-show" : "scrollbar-hide"
//       } ${className}`}
//       data-lenis-prevent
//     >
//       {children}
//     </div>
//   );
// }

"use client";

export function ScrollArea({ children, className = "" }) {
  return (
    <div
      className={`scrollbar-container flex-1 transition-all duration-300 ${className}`}
      data-lenis-prevent
    >
      {children}
    </div>
  );
}
