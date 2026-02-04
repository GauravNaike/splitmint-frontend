import api from "./axios";

export const addExpense = (groupId, payload) =>
    api.post(`/groups/${groupId}/expenses`, payload);

export const getBalances = (groupId) =>
    api.get(`/groups/${groupId}/balances`);

export const getSettlements = (groupId) =>
    api.get(`/groups/${groupId}/settlements`);
