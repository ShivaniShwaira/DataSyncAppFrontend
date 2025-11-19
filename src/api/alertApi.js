import api from "./axios";
export const addAlert = (data) => api.post("/addalerts", data);

export const editAlert = (data) => api.put("/editalert", data);

export const getAlertList = (deviceId, lastSync,id) =>
  api.get(`/getalerts/?alertId=${id}&deviceId=${deviceId}&lastSync=${lastSync || ""}`);

export const getAlertDetails = (id) =>
  api.get(`/getalertsdetails?id=${id}`);

export const deleteAlert = (id) =>
  api.put("/deletealert", { data: { id } });