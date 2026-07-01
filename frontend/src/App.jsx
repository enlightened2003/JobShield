import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import AnalyzeJob from "./pages/AnalyzeJob";
import NotFound from "./pages/NotFound";

function App() {
    return (
        <Routes>

            <Route
                path="/"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            <Route
                path="/dashboard"
                element={<Dashboard />}
            />

            <Route
                path="/analyze"
                element={<AnalyzeJob />}
            />

            <Route
                path="/history"
                element={<History />}
            />

            <Route
                path="*"
                element={<NotFound />}
            />

        </Routes>
    );
}

export default App;