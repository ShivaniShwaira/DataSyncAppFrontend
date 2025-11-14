import { useEffect, useState } from "react";
import { fetchMinorMembers } from "../api/userApi";

export default function MinorMembers() {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetchMinorMembers().then((res) => setList(res.data.data));
  }, []);

  return (
    <div>
      <h2>Minor Members</h2>

      <button onClick={() => (window.location.href = "/add-minor")}>
        Add Minor
      </button>

      {list.map((m) => (
        <div key={m._id}>
          {m.userName} - {m.relation}
        </div>
      ))}
    </div>
  );
}
