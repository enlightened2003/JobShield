import api from "../api/axios";

export const getDashboardStats = async () => {
    const response = await api.get("/jobs/stats");
    return response.data;
};

export const analyzeJob = async (jobDescription) => {
    const response = await api.post("/jobs/analyze", {
        job_description: jobDescription,
    });

    return response.data;
};

export const analyzeImage = async (imageFile) => {

    const formData = new FormData();

    formData.append("file", imageFile);

    const response = await api.post(
        "/jobs/analyze-image",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};

export const getRecentHistory = async () => {

    const response = await api.get(
        "/jobs/history?limit=5"
    );

    return response.data;
};