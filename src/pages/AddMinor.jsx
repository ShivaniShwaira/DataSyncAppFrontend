import { useState } from "react";
import { addMinor } from "../api/userApi";

export default function AddMinor() {
  const [data, setData] = useState({
    userName: "",
    dob: "",
    relation: "",
    role: "minor",
    deviceId:"12345"
  });

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  async function submit() {
    try {
      await addMinor(data);
      alert("Minor added");
      window.location.href = "/minors";
    } catch (err) {
      alert(err.response?.data?.message);
    }
  }

  return (
    <div>
      <h2>Add Minor</h2>
      <input name="userName" onChange={handleChange} placeholder="Name" />
      <input name="dob" onChange={handleChange} placeholder="DD-MM-YYYY" />
      <input name="relation" onChange={handleChange} placeholder="Relation" />
      <button onClick={submit}>Add</button>
    </div>
  );
}
