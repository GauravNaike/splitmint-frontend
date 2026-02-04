import api from "./axios";

export const getBalances = (groupId) => {
    return api.get(`/groups/${groupId}/balances`);
};
