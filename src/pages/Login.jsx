import { useContext, useState } from "react";
import { loginUser } from "../api/userApi";
import { AuthContextFile } from "../context/AuthContextFile";
import { Link } from "react-router-dom";

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
    <div style={{ 
      width: "350px",
      margin: "80px auto",
      padding: "20px",
      border: "1px solid #ddd",
      borderRadius: "10px",
      textAlign: "center"
    }}>
      <h2>Login</h2>

      <input
        name="email"
        placeholder="Enter Email"
        onChange={handleChange}
        style={{ width: "100%", padding: "10px", margin: "10px 0" }}
      />

      <input
        name="password"
        type="password"
        placeholder="Enter Password"
        onChange={handleChange}
        style={{ width: "100%", padding: "10px", margin: "10px 0" }}
      />

      <button
        onClick={submit}
        style={{
          width: "100%",
          padding: "10px",
          background: "#4f46e5",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          marginTop: "10px"
        }}
      >
        Login
      </button>

      <p style={{ marginTop: "15px" }}>
        Don't have an account?  
        <Link to="/register" style={{ color: "blue", marginLeft: "5px" }}>
          Register
        </Link>
      </p>
    </div>
  );
}
