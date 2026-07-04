import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import {
    FaUser,
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaShieldAlt,
} from "react-icons/fa";

import { registerUser } from "../services/authService";

function Register() {

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

            await registerUser(
                data.username,
                data.email,
                data.password
            );

            toast.success("Registration successful!");

            navigate("/");

        } catch (error) {

            toast.error(
                error.response?.data?.detail ||
                "Registration failed."
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

                            <FaShieldAlt className="text-4xl" />

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

                        Join JobShield today.

                    </h2>

                    <p className="mt-6 text-lg text-blue-100 leading-8">

                        Create your account and start protecting yourself
                        from fake job offers using AI-powered scam detection.

                    </p>

                </div>

                {/* Register Card */}

                <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10">

                    <h2 className="text-3xl font-bold text-gray-800">

                        Create Account 🚀

                    </h2>

                    <p className="text-gray-500 mt-2 mb-8">

                        Register to start using JobShield.

                    </p>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6"
                    >

                        {/* Username */}

                        <div>

                            <label className="font-medium">
                                Username
                            </label>

                            <div className="relative mt-2">

                                <FaUser className="absolute left-4 top-4 text-gray-400" />

                                <input
                                    type="text"
                                    placeholder="Enter username"
                                    className="w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                    {...register("username", {
                                        required: "Username is required",
                                    })}
                                />

                            </div>

                            {errors.username && (
                                <p className="text-red-500 text-sm mt-2">
                                    {errors.username.message}
                                </p>
                            )}

                        </div>

                        {/* Email */}

                        <div>

                            <label className="font-medium">
                                Email
                            </label>

                            <div className="relative mt-2">

                                <FaEnvelope className="absolute left-4 top-4 text-gray-400" />

                                <input
                                    type="email"
                                    placeholder="Enter email"
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

                                <FaLock className="absolute left-4 top-4 text-gray-400" />

                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter password"
                                    className="w-full pl-12 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Password must be at least 6 characters",
                                        },
                                    })}
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-4 text-gray-500"
                                >

                                    {showPassword
                                        ? <FaEyeSlash />
                                        : <FaEye />}

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
                                    : "bg-gradient-to-r from-green-600 to-emerald-600 hover:scale-[1.02]"
                            }`}
                        >

                            {loading
                                ? "Creating Account..."
                                : "Create Account"}

                        </button>

                    </form>

                    <p className="text-center mt-8">

                        Already have an account?{" "}

                        <Link
                            to="/"
                            className="text-blue-600 font-semibold hover:underline"
                        >

                            Login

                        </Link>

                    </p>

                </div>

            </div>

        </div>

    );

}

export default Register;