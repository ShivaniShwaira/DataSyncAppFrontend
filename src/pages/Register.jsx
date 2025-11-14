import { useState } from "react";
import { registerUser } from "../api/userApi";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    deviceId: "12345",
    deviceType: "mobile",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  async function submit() {
    try {
      const res = await registerUser(form);
      alert("Registration successful!");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  }

  return (
    <div>
      <h2>Register</h2>
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input
        name="password"
        placeholder="Password"
        type="password"
        onChange={handleChange}
      />
      <button onClick={submit}>Register</button>
    </div>
  );
}
