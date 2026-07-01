import api from "../api/axios";

/* Login */

export const loginUser = async (email, password) => {

    const formData = new URLSearchParams();

    formData.append("username", email);
    formData.append("password", password);

    const response = await api.post(
        "/auth/login",
        formData,
        {
            headers: {
                "Content-Type":
                    "application/x-www-form-urlencoded",
            },
        }
    );

    return response.data;

};

/* Register */

export const registerUser = async (
    username,
    email,
    password
) => {

    const response = await api.post(
        "/auth/register",
        {
            username,
            email,
            password,
        }
    );

    return response.data;

};