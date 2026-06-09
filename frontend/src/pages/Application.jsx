import { useEffect, useState } from "react";
import api from "../services/api.js";

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [students, setStudents] = useState([]);
  const [drives, setDrives] = useState([]);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    applicationId: "",
    student: "",
    drive: "",
    currentRound: "applied",
    status: "applied"
  });

  const fetchData = async () => {
    const appRes = await api.get("/applications");
    const studentRes = await api.get("/students");
    const driveRes = await api.get("/drives");

    setApplications(appRes.data.data);
    setStudents(studentRes.data.data);
    setDrives(driveRes.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/applications", form);
      setMessage("Application submitted");

      setForm({
        applicationId: "",
        student: "",
        drive: "",
        currentRound: "applied",
        status: "applied"
      });

      fetchData();
    } catch (err) {
      setMessage(err.response?.data?.message || "Application failed");
    }
  };

  const deleteApplication = async (id) => {
    await api.delete(`/applications/${id}`);
    fetchData();
  };

  return (
    <div>
      <h3>Applications</h3>

      <p>{message}</p>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Application ID"
          value={form.applicationId}
          onChange={(e) => setForm({ ...form, applicationId: e.target.value })}
        />

        <select
          value={form.student}
          onChange={(e) => setForm({ ...form, student: e.target.value })}
        >
          <option value="">Select Student</option>
          {students.map((student) => (
            <option key={student._id} value={student._id}>
              {student.name} - {student.department} - CGPA {student.cgpa}
            </option>
          ))}
        </select>

        <select
          value={form.drive}
          onChange={(e) => setForm({ ...form, drive: e.target.value })}
        >
          <option value="">Select Drive</option>
          {drives.map((drive) => (
            <option key={drive._id} value={drive._id}>
              {drive.title} - {drive.company?.name}
            </option>
          ))}
        </select>

        <button data-testid="add-application-btn" type="submit">
          Apply
        </button>
      </form>

      <hr />

      {applications.map((app) => (
        <div key={app._id}>
          <p>
            {app.student?.name} applied for {app.drive?.title} - {app.status}
          </p>

          <button onClick={() => deleteApplication(app._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}