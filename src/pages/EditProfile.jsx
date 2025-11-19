import { useState,useEffect } from "react";
import { editProfile,fetchUserProfile,deleteUser } from "../api/userApi";

export default function EditProfile() {
  const [data, setData] = useState({ userName: "",
    phoneNumber: "",
    role: "",
    email: ""
   });
useEffect(() => {
    fetchUserProfile().then((res) => setData({
        userName: res.data.data.userName || "",
        phoneNumber: res.data.data.phoneNumber || "",
        role: res.data.data.role || "",
        email: res.data.data.email || ""}));
  }, []);
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
 
  async function deleteProf(){
    try{
        console.log("here it is--->>>");
        await deleteUser();
        alert("User Deleted!");
    }catch(err){
      alert(err.response?.data?.message); 
    }
  }
  return (
    <div>
      <h2>Edit Profile</h2>
       <button onClick={() =>deleteProf()}>
        Delete User
      </button>
       <input name="userName" placeholder="Username" value={data.userName} onChange={handleChange} />
       <input name="phoneNumber" placeholder="Phone Number" value={data.phoneNumber} onChange={handleChange} />
      <input name="role" placeholder="Role" value={data.role} onChange={handleChange} />
      <input name="email" placeholder="Email" value={data.email} onChange={handleChange} />      <button onClick={save}>Save</button>
    </div>
  );
}
