import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";

export default function StudentLayout() {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar open={open} onClose={() => setOpen(false)} />

            <div className="flex-1 flex flex-col">
                <TopNavbar onMenuClick={() => setOpen(true)} />

                <main className="flex-1 p-4 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}