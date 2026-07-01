import api from "../api/axios";

export const getHistory = async () => {
    const response = await api.get("/jobs/history");
    return response.data;
};

export const deleteHistory = async (id) => {
    await api.delete(`/jobs/${id}`);
};