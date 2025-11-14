import { useContext } from "react";
import { AuthContextFile } from "../context/AuthContextFile";

export default function Dashboard() {
  const { logout } = useContext(AuthContextFile);

  return (
    <div>
      <h1>Dashboard</h1>

      <button onClick={() => (window.location.href = "/edit-profile")}>
        Edit Profile
      </button>

      <button onClick={() => (window.location.href = "/minors")}>
        Minor Members
      </button>

      <button onClick={logout}>Logout</button>
    </div>
  );
}
