import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { loginUser } from "../services/authService";

function Login() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await loginUser(
                data.email,
                data.password
            );

            localStorage.setItem(
                "token",
                response.access_token
            );

            toast.success("Login Successful!");

            navigate("/dashboard");

        } catch (error) {

            toast.error(
                error.response?.data?.detail ||
                "Login Failed"
            );
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-600">

            <div className="bg-white p-10 rounded-xl shadow-lg w-96">

                <h1 className="text-3xl font-bold text-center mb-6">
                    JobShield
                </h1>

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
                        <p className="text-red-500 text-sm mb-3">
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
                        className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
                    >
                        Login
                    </button>

                </form>

            </div>

        </div>
    );
}

export default Login;