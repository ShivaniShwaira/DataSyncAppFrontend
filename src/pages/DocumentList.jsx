import { useEffect, useState } from "react";
import axios from "axios";
import { getReports, deleteReport,downloadReport} from "../api/reportApi";

export default function DocumentList() {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    loadDocs();
  }, []);

  async function loadDocs() {
    try {
       let res= await getReports("12345");
    //   const res = await axios.get("/getreports?deviceId=abcdef");
      console.log(res.data,"data---->>>")
      setDocs(res.data.data);
    } catch (err) {
      alert(err.response?.data?.message);
    }
  }

  async function download(id) {
    // window.open(`https://datasynctaskapp.onrender.com/downloadreport?id=${id}`, "_blank");
    const token=localStorage.getItem("token");
    const res= await axios.get(`https://datasynctaskapp.onrender.com/downloadreport`,{
      params:{id,download:true},
      responseType:"blob",
      headers:{
        Authorization:`Bearer ${token}`
      }
    });
// Get filename from header (important)
  let fileName = "download";
  const disposition = res.headers["content-disposition"];
  if (disposition && disposition.includes("filename=")) {
    fileName = disposition.split("filename=")[1].replace(/"/g, "");
  }
    const url=window.URL.createObjectURL(new Blob([res.data]));
    const link=document.createElement("a");
    link.href =url;
    link.setAttribute("download",fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  async function deleteDoc(id) {
    if (!window.confirm("Delete this report?")) return;

    try {
    //   await axios.post("/deletereport", { id });
    await deleteReport(id);
      alert("Deleted!");
      loadDocs();
    } catch (err) {
      alert(err.response?.data?.message);
    }
  }

  return (
    <div>
      <h2>Document List</h2>
       <button onClick={() => (window.location.href = "/upload-reports")}>
        + Add New Report
      </button>
      {docs?.map((d) => (
        <div key={d._id} style={{ margin: "15px", border: "1px solid #ddd", padding: "10px" }}>
          <h3>{d.name}</h3>
          <p>Type: {d.fileType}</p>
          <p>Size: {Math.round(d.size / 1024)} KB</p>

          <button onClick={() => download(d._id)}>Download</button>
          <button onClick={() => (window.location.href = `/edit-reports?id=${d._id}`)}>
            Edit
          </button>
          <button onClick={() => deleteDoc(d._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
