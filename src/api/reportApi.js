import api from "./axios";
export const uploadReport = (data) => api.post("/uploadreport", data);

export const editReport = (data) => api.put("/editreport", data);

export const getReports = (deviceId, lastSync) =>
  api.get(`/getreports/?deviceId=${deviceId}&lastSync=${lastSync || ""}`);

export const getReportById = (id) =>
  api.get(`/getreportbyid/?id=${id}`);

export const downloadReport = (id,download=false) =>
  api.get(`/downloadreport?id=${id}&download=${download}`);

export const deleteReport = (id) =>
  api.put("/deletereport", { data: { id } });