import { useState } from "react";
import axios from "axios";
import { uploadReport} from "../api/reportApi";

export default function UploadReport() {
  const [form, setForm] = useState({
    name: "",
    relatedTo: "",
    deviceId: "",
  });
  const [file, setFile] = useState(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function upload() {
    if (!file) return alert("Please select a file");

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("relatedTo", form.relatedTo);
    fd.append("deviceId", form.deviceId);
    fd.append("file", file);

    try {
    //   const res = await axios.post("/api/upload-document", fd, {
    //     headers: { "Content-Type": "multipart/form-data" },
    //   });
      const res= await uploadReport(fd);
      alert("Uploaded Successfully!");
      window.location.href = "/reports";
    } catch (err) {
      alert(err.response?.data?.message);
    }
  }

  return (
    <div>
      <h2>Upload Document</h2>

      <input
        type="text"
        name="name"
        placeholder="Report Name"
        value={form.name}
        onChange={handleChange}
      />

      <input
        type="text"
        name="relatedTo"
        placeholder="Related To"
        value={form.relatedTo}
        onChange={handleChange}
      />

      <input
        type="text"
        name="deviceId"
        placeholder="Device ID"
        value={form.deviceId}
        onChange={handleChange}
      />

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />

      <button onClick={upload}>Upload</button>
    </div>
  );
}
