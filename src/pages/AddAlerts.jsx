import { useState } from "react";
import { addAlert } from "../api/alertApi";

export default function AddAlerts() {
  const [form, setForm] = useState({
    name: "",
    type: "",
    medicine: "",
    quantity: "",
    doctorName: "",
    time: "",
    date: "",
    version: "1",
    deviceId: "abcdef"
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  async function save() {
    try {
      await addAlert(form);
      alert("Alert Created!");
      window.location.href = "/alerts";
    } catch (err) {
      alert(err.response?.data?.message);
    }
  }

  return (
    <div style={{ width: "350px", margin: "auto", paddingTop: "20px" }}>
      <h2 style={{ textAlign: "center" }}>Add New Alert</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

        <label>
          Name:
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
          />
        </label>

        <label>
          Type:
          <input
            name="type"
            value={form.type}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
          />
        </label>

        <label>
          Medicine:
          <input
            name="medicine"
            value={form.medicine}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
          />
        </label>

        <label>
          Quantity:
          <input
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
          />
        </label>

        <label>
          Doctor Name:
          <input
            name="doctorName"
            value={form.doctorName}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
          />
        </label>

        <label>
          Time (hh:mm am/pm):
          <input
            name="time"
            value={form.time}
            placeholder="10:30 am"
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
          />
        </label>

        <label>
          Date (DD-MM-YYYY):
          <input
            name="date"
            value={form.date}
            placeholder="12-11-2025"
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
          />
        </label>

        <button
          onClick={save}
          style={{
            padding: "10px",
            background: "blue",
            color: "white",
            border: "none",
            borderRadius: "5px",
            marginTop: "10px",
            cursor: "pointer"
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}
