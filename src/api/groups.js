import api from "./axios";

export const getGroups = async () => {
    const res = await api.get("/groups");
    return res.data;
};

export const createGroup = async (name) => {
    const res = await api.post("/groups", { name });
    return res.data;
};

export const getGroupById = async (groupId) => {
    const res = await api.get(`/groups/${groupId}`);
    return res.data;
};

export const getGroupExpenses = async (groupId) => {
    const res = await api.get(`/groups/${groupId}/expenses`);
    return res.data;
};
