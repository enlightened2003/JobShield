import { useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/", { replace: true });

    };

    return (

        <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">

            <div>

                <h1 className="text-2xl font-bold text-blue-600">
                    🛡️ JobShield
                </h1>

                <p className="text-sm text-gray-500">
                    AI Powered Job Scam Detection
                </p>

            </div>

            <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 transition text-white px-5 py-2 rounded-lg font-medium"
            >
                Logout
            </button>

        </nav>

    );

}

export default Navbar;