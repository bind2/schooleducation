import React from "react";
import { SidebarLayout } from "@/components/admin-comp/sidebar-layout";
import AdminLayoutWrapper from "@/layout-wrapper/admin-layout-wrapper";
export default function AdminLayout({ children }) {
  return (
    <AdminLayoutWrapper>
      <SidebarLayout>{children}</SidebarLayout>
    </AdminLayoutWrapper>
  )
}
