import { useEffect, useState } from "react";
import axios from "axios";
import { getReportById,editReport,downloadReport} from "../api/reportApi";

export default function EditDocument() {
  const [data, setData] = useState(null);
  const [file, setFile] = useState(null);

  const id = new URLSearchParams(window.location.search).get("id");

  useEffect(() => {
    loadDoc();
  }, []);

  async function loadDoc() {
    // const res = await axios.get("/api/get-documents?deviceId=abcdef");
       const res = await downloadReport(id,false);
    const found = res.data.data         //.find((d) => d._id === id);
    setData(found);
  }

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  async function save() {
    const fd = new FormData();
    fd.append("reportId", data._id);
    fd.append("name", data.name);
    fd.append("relatedTo", data.relatedTo);
    fd.append("deviceId", data.deviceId);
    fd.append("version", data.version);

    if (file) fd.append("file", file);

    try {
    //   const res = await axios.put("/api/edit-document", fd);
    const res = await editReport(fd);
      alert("Updated!");
      window.location.href = "/reports";
    } catch (err) {
      if (err.response?.status === 409) {
        alert("Version conflict! Please refresh.");
      } else {
        alert(err.response?.data?.message);
      }
    }
  }

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit Document</h2>

      <input
        type="text"
        name="name"
        value={data.name}
        onChange={handleChange}
      />

      <input
        type="text"
        name="relatedTo"
        value={data.relatedTo}
        onChange={handleChange}
      />

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />

      <button onClick={save}>Save</button>
    </div>
  );
}
