import api from "./axios";

export const registerUser = (data) => api.post("/register", data);

export const loginUser = (data) => api.post("/login", data);

export const editProfile = (data) => api.put("/editProfile", data);

export const fetchMinorMembers = () => api.get("/minorMembers");

export const deleteUser = () => api.delete("/deleteUser");

export const addMinor = (data) => api.post("/addMinor", data);
