import { useEffect, useState } from "react";
import api from "../services/api.js";

export default function Dashboard() {
  const [me, setMe] = useState(null);
  const [message, setMessage] = useState("");

  const syncData = async () => {
    try {
      const res = await api.post("/sync");
      setMessage(
        `Fetched: ${res.data.totalFetched}, Inserted: ${res.data.inserted}, Duplicates: ${res.data.duplicates}, Rejected: ${res.data.rejected}`
      );
    } catch (err) {
      setMessage(err.response?.data?.message || "Sync failed");
    }
  };

  useEffect(() => {
    api.get("/auth/me").then((res) => setMe(res.data.data));
  }, []);

  return (
    <div>
      <h3>Dashboard</h3>

      {me && (
        <p>
          {me.name} - {me.role}
        </p>
      )}

      <button data-testid="sync-btn" onClick={syncData}>
        Sync Dataset
      </button>

      <p>{message}</p>
    </div>
  );
}