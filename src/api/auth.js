import api from "./axios";

export const loginUser = async (email, password) => {
    const res = await api.post("/auth/login", {
        email,
        password,
    });

    // 🔥 auto-detect token key
    const token =
        res.data.token ||
        res.data.accessToken ||
        res.data.jwt ||
        res.data.access_token;

    if (!token) {
        throw new Error("Token not found in response");
    }

    return token;
};

export const registerUser = async (name, email, password) => {
    await api.post("/auth/register", {
        name,
        email,
        password,
    });
};
