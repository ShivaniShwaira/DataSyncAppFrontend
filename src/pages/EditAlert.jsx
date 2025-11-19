import { useEffect, useState } from "react";
import { editAlert, getAlertDetails, getAlertList } from "../api/alertApi";

export default function EditAlert() {
  const [data, setData] = useState(null);

  const alertId = new URLSearchParams(window.location.search).get("id");

  useEffect(() => {
    loadAlert();
  }, []);

  async function loadAlert() {
    try {
     
      const res = await getAlertList("12345","",alertId);
      console.log(res.data,"data--->>>>")
    //    const found = res.data.data.find((a) => a._id == alertId);
        const found = res.data.data;
       setData(found);
    } catch (err) {
      alert(err.response?.data?.message);
    }
  }

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  async function save() {
    try {
      await editAlert({
        ...data,
        alertid: data._id,
      });

      alert("Updated!");
      window.location.href = "/alerts";
    } catch (err) {
      if (err.response?.status === 409) {
        alert("Version mismatch! Fetching latest...");
        loadAlert();
      } else {
        alert(err.response?.data?.message);
      }
    }
  }

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit Alert</h2>

      <input name="title" value={data.name} onChange={handleChange} />

      <input
        name="date"
        type="date"
        // value={new Date(data.date)}
        onChange={handleChange}
      />

      <input
        name="time"
        type="time"
        value={new Date(data.date).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
        onChange={handleChange}
      />

      <button onClick={save}>Save</button>
    </div>
  );
}
