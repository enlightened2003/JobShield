import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import { loginUser } from "../services/authService";

function Login() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {

        try {

            setLoading(true);

            const response = await loginUser(
                data.email,
                data.password
            );

            localStorage.setItem(
                "token",
                response.access_token
            );

            toast.success("Login successful!");

            navigate("/dashboard");

        } catch (error) {

            toast.error(
                error.response?.data?.detail ||
                "Login failed."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-700 p-4">

            <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">

                <h1 className="text-3xl font-bold text-center text-blue-600">
                    🛡️ JobShield
                </h1>

                <p className="text-center text-gray-500 mt-2 mb-8">
                    AI Powered Job Scam Detection
                </p>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full border rounded-lg p-3 mb-2"
                        {...register("email", {
                            required: "Email is required"
                        })}
                    />

                    {errors.email && (
                        <p className="text-red-500 text-sm mb-4">
                            {errors.email.message}
                        </p>
                    )}

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full border rounded-lg p-3 mb-2"
                        {...register("password", {
                            required: "Password is required"
                        })}
                    />

                    {errors.password && (
                        <p className="text-red-500 text-sm mb-4">
                            {errors.password.message}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full p-3 rounded-lg text-white font-semibold transition ${
                            loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

                <p className="text-center mt-6">

                    Don't have an account?{" "}

                    <Link
                        to="/register"
                        className="text-blue-600 font-semibold hover:underline"
                    >
                        Register
                    </Link>

                </p>

            </div>

        </div>

    );

}

export default Login;