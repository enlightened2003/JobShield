import { Link, useLocation } from "react-router-dom";

import {
    FaChartPie,
    FaSearch,
    FaHistory,
    FaShieldAlt,
} from "react-icons/fa";

function Sidebar({ sidebarOpen, setSidebarOpen }) {

    const location = useLocation();

    const menuItems = [
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: <FaChartPie />,
        },
        {
            name: "Analyze Job",
            path: "/analyze",
            icon: <FaSearch />,
        },
        {
            name: "History",
            path: "/history",
            icon: <FaHistory />,
        },
    ];

    return (
        <>
            {/* Mobile Overlay */}

            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}

            <aside
                className={`
                    fixed
                    md:static
                    top-0
                    left-0
                    h-screen
                    w-72
                    bg-gradient-to-b
                    from-slate-900
                    via-slate-800
                    to-slate-900
                    text-white
                    shadow-2xl
                    z-50
                    transform
                    transition-transform
                    duration-300
                    ${
                        sidebarOpen
                            ? "translate-x-0"
                            : "-translate-x-full md:translate-x-0"
                    }
                `}
            >

                {/* Logo */}

                <div className="p-8 border-b border-slate-700">

                    <div className="flex items-center gap-4">

                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">

                            <FaShieldAlt className="text-2xl" />

                        </div>

                        <div>

                            <h1 className="text-3xl font-bold">
                                JobShield
                            </h1>

                            <p className="text-gray-400 text-sm mt-1">
                                AI Scam Detection
                            </p>

                        </div>

                    </div>

                </div>

                {/* Menu */}

                <nav className="p-6">

                    <ul className="space-y-4">

                        {menuItems.map((item) => (

                            <li key={item.path}>

                                <Link
                                    to={item.path}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`
                                        flex
                                        items-center
                                        gap-4
                                        px-5
                                        py-4
                                        rounded-2xl
                                        font-medium
                                        transition-all
                                        duration-300
                                        ${
                                            location.pathname === item.path
                                                ? "bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg"
                                                : "hover:bg-slate-700"
                                        }
                                    `}
                                >

                                    <span className="text-xl">
                                        {item.icon}
                                    </span>

                                    <span>
                                        {item.name}
                                    </span>

                                </Link>

                            </li>

                        ))}

                    </ul>

                </nav>

                {/* Footer */}

                <div className="absolute bottom-6 left-6 right-6">

                    <div className="rounded-2xl bg-slate-800 border border-slate-700 p-5">

                        <h3 className="font-bold">
                            JobShield AI
                        </h3>

                        <p className="text-sm text-gray-400 mt-2">

                            Detect fake job offers using AI-powered scam analysis.

                        </p>

                    </div>

                </div>

            </aside>
        </>
    );
}

export default Sidebar;