import api from "../api/axios";

/* Dashboard Statistics */
export const getDashboardStats = async () => {

    const response = await api.get("/jobs/stats");

    return response.data;

};

/* Analyze Job Description */
export const analyzeJob = async (jobDescription) => {

    const response = await api.post("/jobs/analyze", {
        job_description: jobDescription,
    });

    return response.data;

};

/* Analyze Image (OCR) */
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

/* Get Recent Analyses */
export const getRecentAnalyses = async () => {

    const response = await api.get("/jobs/history");

    // Return only the latest 5 analyses
    return response.data.slice(0, 5);

};