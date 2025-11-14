import { useState } from "react";
import { editProfile } from "../api/userApi";

export default function EditProfile() {
  const [data, setData] = useState({ userName: "" });

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  async function save() {
    try {
      await editProfile(data);
      alert("Updated!");
    } catch (err) {
      alert(err.response?.data?.message);
    }
  }

  return (
    <div>
      <h2>Edit Profile</h2>
      <input name="userName" onChange={handleChange} />
      <button onClick={save}>Save</button>
    </div>
  );
}
