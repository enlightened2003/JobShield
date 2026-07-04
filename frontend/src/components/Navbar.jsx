import { useNavigate } from "react-router-dom";
import {
    FaBars,
    FaBell,
    FaSignOutAlt,
    FaUserCircle,
} from "react-icons/fa";

function Navbar({ sidebarOpen, setSidebarOpen }) {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/", { replace: true });
    };

    return (

        <nav
            className="
                sticky
                top-0
                z-30
                bg-white/80
                backdrop-blur-lg
                border-b
                border-gray-200
                shadow-sm
            "
        >

            <div className="flex items-center justify-between px-4 md:px-8 py-4">

                {/* Left */}

                <div className="flex items-center gap-4">

                    <button
                        className="md:hidden text-2xl text-gray-700"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        <FaBars />
                    </button>

                    <div>

                        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">

                            JobShield

                        </h1>

                        <p className="text-gray-500 text-sm">

                            AI Powered Job Scam Detection

                        </p>

                    </div>

                </div>

                {/* Right */}

                <div className="flex items-center gap-4">

                    {/* Notification */}

                    <button
                        className="
                            hidden
                            md:flex
                            w-11
                            h-11
                            rounded-full
                            bg-gray-100
                            hover:bg-blue-100
                            transition
                            items-center
                            justify-center
                            text-gray-600
                        "
                    >

                        <FaBell size={18} />

                    </button>

                    {/* User */}

                    <div className="hidden md:flex items-center gap-3">

                        <FaUserCircle
                            className="text-blue-600"
                            size={34}
                        />

                        <div>

                            <h3 className="font-semibold text-gray-800">

                                Welcome

                            </h3>

                            <p className="text-sm text-gray-500">

                                JobShield User

                            </p>

                        </div>

                    </div>

                    {/* Logout */}

                    <button
                        onClick={handleLogout}
                        className="
                            flex
                            items-center
                            gap-2
                            bg-red-500
                            hover:bg-red-600
                            transition
                            text-white
                            px-5
                            py-2.5
                            rounded-xl
                            shadow-md
                        "
                    >

                        <FaSignOutAlt />

                        <span className="hidden sm:block">

                            Logout

                        </span>

                    </button>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;