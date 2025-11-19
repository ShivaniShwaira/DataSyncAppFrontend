import api from "./axios";

export const registerUser = (data) => api.post("/registration", data);

export const loginUser = (data) => api.post("/login", data);

export const editProfile = (data) => api.post("/edituser", data);

export const fetchMinorMembers = () => api.get("/getminormembers");

export const fetchUserProfile = () => api.get("/getuserprofile");

export const deleteUser = () => api.put("/deleteUser");

export const addMinor = (data) => api.post("/addMinor", data);

export const logoutUser = (data) => api.put("/logout", data);
