import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";

function Navbar({ sidebarOpen, setSidebarOpen }) {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/", { replace: true });
    };

    return (
        <nav className="bg-white shadow-md px-4 md:px-8 py-4">

            <div className="flex items-center justify-between">

                <div className="flex items-center gap-4">

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-2xl"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        <FaBars />
                    </button>

                    <div>
                        <h1 className="text-2xl font-bold text-blue-600">
                            🛡️ JobShield
                        </h1>

                        <p className="text-sm text-gray-500">
                            AI Powered Job Scam Detection
                        </p>
                    </div>

                </div>

                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
                >
                    Logout
                </button>

            </div>

        </nav>
    );
}

export default Navbar;