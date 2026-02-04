import api from "./axios";

export const addParticipant = async (groupId, name) => {
    const res = await api.post(`/groups/${groupId}/participants`, { name });
    return res.data;
};
