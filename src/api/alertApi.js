import api from "./axios";
export const addAlert = (data) => api.post("/addalerts", data);

export const editAlert = (data) => api.put("/editalert", data);

export const getAlertList = (deviceId, lastSync) =>
  api.get(`/getalerts/?deviceId=${deviceId}&lastSync=${lastSync || ""}`);

export const getAlertDetails = (id) =>
  api.get(`/getalertbyid?id=${id}`);

export const deleteAlert = (id) =>
  api.put("/deletealert", { data: { id } });