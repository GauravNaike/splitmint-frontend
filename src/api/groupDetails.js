import api from "./axios";

export const addParticipant = (groupId, name) =>
    api.post(`/groups/${groupId}/participants`, { name });

export const getGroup = (groupId) =>
    api.get(`/groups/${groupId}`);
