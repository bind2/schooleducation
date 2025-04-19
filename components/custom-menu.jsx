"use client";

import { createLucideIcon } from "lucide-react";

const CustomMenu = createLucideIcon("CustomMenu", [
  ["line", { x1: "2", y1: "6", x2: "20", y2: "6", strokeWidth: "2", key: "1" }],
  ["line", { x1: "2", y1: "12", x2: "20", y2: "12", strokeWidth: "2", key: "2" }],
  ["line", { x1: "10", y1: "18", x2: "20", y2: "18", strokeWidth: "2", key: "3" }], // Half-width last line
]);

export default CustomMenu;
