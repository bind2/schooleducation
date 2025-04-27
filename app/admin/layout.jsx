import React from "react";
import { SidebarLayout } from "@/components/admin-comp/sidebar-layout";
export default function AdminLayout({ children }) {
  return <SidebarLayout>{children}</SidebarLayout>;
}
