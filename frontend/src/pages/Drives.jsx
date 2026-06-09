import { useEffect, useState } from "react";
import api from "../services/api.js";

export default function Drives() {
  const [drives, setDrives] = useState([]);
  const [companies, setCompanies] = useState([]);

  const [form, setForm] = useState({
    driveId: "",
    company: "",
    title: "",
    mode: "online",
    location: "",
    registrationDeadline: "",
    rounds: "",
    status: "open"
  });

  const fetchData = async () => {
    const driveRes = await api.get("/drives");
    const companyRes = await api.get("/companies");

    setDrives(driveRes.data.data);
    setCompanies(companyRes.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.post("/drives", {
      ...form,
      rounds: form.rounds.split(",").map((r) => r.trim())
    });

    setForm({
      driveId: "",
      company: "",
      title: "",
      mode: "online",
      location: "",
      registrationDeadline: "",
      rounds: "",
      status: "open"
    });

    fetchData();
  };

  const deleteDrive = async (id) => {
    await api.delete(`/drives/${id}`);
    fetchData();
  };

  return (
    <div>
      <h3>Drives</h3>

      <form onSubmit={handleSubmit}>
        <input placeholder="Drive ID" value={form.driveId} onChange={(e) => setForm({ ...form, driveId: e.target.value })} />

        <select value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })}>
          <option value="">Select Company</option>
          {companies.map((company) => (
            <option key={company._id} value={company._id}>
              {company.name}
            </option>
          ))}
        </select>

        <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />

        <select value={form.mode} onChange={(e) => setForm({ ...form, mode: e.target.value })}>
          <option value="online">online</option>
          <option value="offline">offline</option>
          <option value="hybrid">hybrid</option>
        </select>

        <input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
        <input type="date" value={form.registrationDeadline} onChange={(e) => setForm({ ...form, registrationDeadline: e.target.value })} />
        <input placeholder="Rounds HR,Technical" value={form.rounds} onChange={(e) => setForm({ ...form, rounds: e.target.value })} />

        <button data-testid="add-drive-btn" type="submit">
          Add Drive
        </button>
      </form>

      <hr />

      {drives.map((drive) => (
        <div key={drive._id}>
          <p>
            {drive.title} - {drive.company?.name} - {drive.status}
          </p>
          <button onClick={() => deleteDrive(drive._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}