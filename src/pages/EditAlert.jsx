import { useEffect, useState } from "react";
import { editAlert, getAlertDetails } from "../api/alertApi";

export default function EditAlert() {
  const [data, setData] = useState(null);

  const alertId = new URLSearchParams(window.location.search).get("id");

  // fields NOT to show in UI
  const excludedFields = [
    "_id",
    "version",
    "createdBy",
    "deviceId",
    "isDeleted",
    "createdAt",
    "updatedAt",
    "__v",
  ];

  useEffect(() => {
    loadAlert();
  }, []);

 async function loadAlert() {
  try {
    const res = await getAlertDetails(alertId);
    const found = res.data.data;

    // Format date → YYYY-MM-DD
    const formattedDate = found.date ? found.date.split("T")[0] : "";

    // Convert "12:55 pm" → "12:55"
    let formattedTime = "";
    if (found.time) {
      const t = found.time.toLowerCase();
      let [hours, minutes] = t.replace("am", "").replace("pm", "").trim().split(":");

      if (t.includes("pm") && hours !== "12") {
        hours = String(Number(hours) + 12);
      }
      if (t.includes("am") && hours === "12") {
        hours = "00";
      }

      // Final HH:mm format
      formattedTime = `${hours}:${minutes}`;
    }

    setData({
      ...found,
      date: formattedDate,
      time: formattedTime,
    });
  } catch (err) {
    alert(err.response?.data?.message);
  }
}


  // Generic input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
    <div style={{ padding: "20px" }}>
      <h3>Edit Alert</h3>

      {Object.entries(data)
        .filter(([key]) => !excludedFields.includes(key))
        .map(([key, value]) => (
          <div key={key} style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
                textTransform: "capitalize",
              }}
            >
              {key}
            </label>

            <input
              name={key}
              type={
                key === "date"
                  ? "date"
                  : key === "time"
                  ? "time"
                  : "text"
              }
              value={value || ""}
              onChange={handleChange}
              style={{
                width: "300px",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>
        ))}

      <button
        onClick={save}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Save
      </button>
    </div>
  );
}
