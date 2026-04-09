"use client"
import Sidebar from "@/components/admin/Sidebar";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";



const AdminLayout = ({ children }) => {
    const pathname = usePathname();

    // Hide sidebar on login page
    const showSidebar = pathname !== "/admin/login";
    return (
        <div className="flex min-h-screen bg-[#FAFAFA] ">
            {/* Sidebar */}
            {showSidebar && <Sidebar />}

            {/* Main content area */}
            <main className="flex-1 overflow-x-hidden">
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;
