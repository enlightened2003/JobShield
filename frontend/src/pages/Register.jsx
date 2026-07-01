import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import { registerUser } from "../services/authService";

function Register() {

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

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-700 p-4">

            <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">

                <h1 className="text-3xl font-bold text-center text-blue-600">
                    🛡️ JobShield
                </h1>

                <p className="text-center text-gray-500 mt-2 mb-8">
                    Create your account
                </p>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full border rounded-lg p-3 mb-2"
                        {...register("username", {
                            required: "Username is required"
                        })}
                    />

                    {errors.username && (
                        <p className="text-red-500 text-sm mb-4">
                            {errors.username.message}
                        </p>
                    )}

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
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters"
                            }
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
                                : "bg-green-600 hover:bg-green-700"
                        }`}
                    >
                        {loading ? "Creating Account..." : "Register"}
                    </button>

                </form>

                <p className="text-center mt-6">

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

    );

}

export default Register;