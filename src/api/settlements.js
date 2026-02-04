import api from "./axios";

export const getSettlements = (groupId) => {
    return api.get(`/groups/${groupId}/settlements`);
};
