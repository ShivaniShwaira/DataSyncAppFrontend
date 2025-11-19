import { useEffect, useState } from "react";
import { getAlertList, deleteAlert } from "../api/alertApi";

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    loadAlerts();
  }, []);

  async function loadAlerts() {
    try {
      const res = await getAlertList("12345");
      setAlerts(res.data.data);
    } catch (err) {
      alert(err.response?.data?.message);
    }
  }

  async function remove(id) {
    if (!window.confirm("Delete this alert?")) return;

    try {
      await deleteAlert(id);
      loadAlerts();
    } catch (err) {
      alert(err.response?.data?.message);
    }
  }

  return (
    <div>
      <h2>My Alerts</h2>

      <button onClick={() => (window.location.href = "/add-alerts")}>
        + Add New Alert
      </button>

      {alerts.map((a) => (
        <div key={a._id} style={{ border: "1px solid gray", margin: 10, padding: 10 }}>
          <p><strong>Title:</strong> {a.name}</p>
          <p><strong>Date:</strong> {new Date(a.date).toLocaleString()}</p>
          <p><strong>Version:</strong> {a.version}</p>

          <button onClick={() => (window.location.href = `/edit-alert?id=${a._id}`)}>
            Edit
          </button>

          <button onClick={() => remove(a._id)} style={{ marginLeft: 10 }}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
