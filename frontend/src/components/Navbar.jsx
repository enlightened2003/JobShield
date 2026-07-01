function Navbar() {
    return (
        <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">

            <h1 className="text-2xl font-bold text-blue-600">
                JobShield
            </h1>

            <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/";
                }}
            >
                Logout
            </button>

        </nav>
    );
}

export default Navbar;