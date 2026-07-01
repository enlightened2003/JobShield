import { Link, useLocation } from "react-router-dom";

import {
    FaChartPie,
    FaSearch,
    FaHistory
} from "react-icons/fa";

function Sidebar() {

    const location = useLocation();

    const menuItems = [
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: <FaChartPie />
        },
        {
            name: "Analyze Job",
            path: "/analyze",
            icon: <FaSearch />
        },
        {
            name: "History",
            path: "/history",
            icon: <FaHistory />
        }
    ];

    return (

        <aside className="w-64 bg-slate-900 text-white min-h-screen shadow-lg">

            <div className="p-6 border-b border-slate-700">

                <h1 className="text-3xl font-bold text-blue-400">
                    JobShield
                </h1>

                <p className="text-sm text-gray-400 mt-2">
                    AI Job Scam Detector
                </p>

            </div>

            <nav className="p-5">

                <ul className="space-y-3">

                    {menuItems.map((item) => (

                        <li key={item.path}>

                            <Link
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                                ${
                                    location.pathname === item.path
                                        ? "bg-blue-600 text-white"
                                        : "hover:bg-slate-800 text-gray-300"
                                }`}
                            >

                                <span className="text-lg">
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

        </aside>

    );
}

export default Sidebar;