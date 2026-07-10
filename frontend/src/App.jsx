import { Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AnalyzeJob from "./pages/AnalyzeJob";
import History from "./pages/History";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/ProtectedRoute";

const Page = ({ children }) => (
    <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -18 }}
        transition={{
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
        }}
    >
        {children}
    </motion.div>
);

function App() {
    return (
        <AnimatePresence mode="wait">

            <Routes>

                <Route
                    path="/"
                    element={
                        <Page>
                            <Login />
                        </Page>
                    }
                />

                <Route
                    path="/register"
                    element={
                        <Page>
                            <Register />
                        </Page>
                    }
                />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Page>
                                <Dashboard />
                            </Page>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/analyze"
                    element={
                        <ProtectedRoute>
                            <Page>
                                <AnalyzeJob />
                            </Page>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/history"
                    element={
                        <ProtectedRoute>
                            <Page>
                                <History />
                            </Page>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="*"
                    element={
                        <Page>
                            <NotFound />
                        </Page>
                    }
                />

            </Routes>

        </AnimatePresence>
    );
}

export default App;