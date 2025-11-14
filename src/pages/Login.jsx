import { useContext, useState } from "react";
import { loginUser } from "../api/userApi";
import { AuthContextFile } from "../context/AuthContextFile";

export default function Login() {
  const { login } = useContext(AuthContextFile);
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
      const res = await loginUser(form);
      login(res.data.data.token);
      alert("Login Successful");
      window.location.href = "/dashboard";
    } catch (err) {
      alert(err.response?.data?.message);
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <input name="email" onChange={handleChange} />
      <input
        name="password"
        type="password"
        onChange={handleChange}
      />
      <button onClick={submit}>Login</button>
    </div>
  );
}
