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
                z-20
                bg-white/90
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
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="
                            md:hidden
                            w-10
                            h-10
                            rounded-lg
                            flex
                            items-center
                            justify-center
                            hover:bg-gray-100
                            transition
                        "
                    >
                        <FaBars size={22} />
                    </button>

                    <div>

                        <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">

                            JobShield

                        </h1>

                        <p className="hidden sm:block text-sm text-gray-500">

                            AI Powered Job Scam Detection

                        </p>

                    </div>

                </div>

                {/* Right */}

                <div className="flex items-center gap-3 md:gap-4">

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
                            items-center
                            justify-center
                            transition
                        "
                    >
                        <FaBell />
                    </button>

                    {/* User */}

                    <div className="hidden lg:flex items-center gap-3">

                        <FaUserCircle
                            size={34}
                            className="text-blue-600"
                        />

                        <div>

                            <h3 className="font-semibold">

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
                            justify-center
                            gap-2
                            bg-red-500
                            hover:bg-red-600
                            text-white
                            rounded-xl
                            shadow-md
                            transition
                            w-11
                            h-11
                            md:w-auto
                            md:h-auto
                            md:px-5
                            md:py-2.5
                        "
                    >

                        <FaSignOutAlt />

                        <span className="hidden md:inline">

                            Logout

                        </span>

                    </button>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;