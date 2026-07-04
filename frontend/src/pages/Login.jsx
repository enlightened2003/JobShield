import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import {
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaShieldAlt,
} from "react-icons/fa";

import { loginUser } from "../services/authService";

function Login() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
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

        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center px-4">

            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl w-full items-center">

                {/* Left Section */}

                <div className="hidden lg:block text-white">

                    <div className="flex items-center gap-4 mb-8">

                        <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center shadow-2xl">

                            <FaShieldAlt className="text-4xl"/>

                        </div>

                        <div>

                            <h1 className="text-5xl font-bold">
                                JobShield
                            </h1>

                            <p className="text-blue-200 mt-2">
                                AI Powered Job Scam Detection
                            </p>

                        </div>

                    </div>

                    <h2 className="text-4xl font-bold leading-tight">

                        Protect yourself from
                        fake job offers.

                    </h2>

                    <p className="mt-6 text-lg text-blue-100 leading-8">

                        Analyze job descriptions and posters using AI,
                        OCR and intelligent scam detection.

                    </p>

                </div>

                {/* Login Card */}

                <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10">

                    <h2 className="text-3xl font-bold text-gray-800">

                        Welcome Back 👋

                    </h2>

                    <p className="text-gray-500 mt-2 mb-8">

                        Login to continue using JobShield.

                    </p>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6"
                    >

                        {/* Email */}

                        <div>

                            <label className="font-medium">

                                Email

                            </label>

                            <div className="relative mt-2">

                                <FaEnvelope className="absolute left-4 top-4 text-gray-400"/>

                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                    {...register("email", {
                                        required: "Email is required",
                                    })}
                                />

                            </div>

                            {errors.email && (

                                <p className="text-red-500 text-sm mt-2">

                                    {errors.email.message}

                                </p>

                            )}

                        </div>

                        {/* Password */}

                        <div>

                            <label className="font-medium">

                                Password

                            </label>

                            <div className="relative mt-2">

                                <FaLock className="absolute left-4 top-4 text-gray-400"/>

                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    className="w-full pl-12 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                    {...register("password", {
                                        required: "Password is required",
                                    })}
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-4 top-4 text-gray-500"
                                >

                                    {showPassword
                                        ? <FaEyeSlash/>
                                        : <FaEye/>}

                                </button>

                            </div>

                            {errors.password && (

                                <p className="text-red-500 text-sm mt-2">

                                    {errors.password.message}

                                </p>

                            )}

                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 rounded-xl font-semibold text-white transition ${
                                loading
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-[1.02]"
                            }`}
                        >

                            {loading
                                ? "Logging in..."
                                : "Login"}

                        </button>

                    </form>

                    <p className="text-center mt-8">

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

        </div>

    );

}

export default Login;