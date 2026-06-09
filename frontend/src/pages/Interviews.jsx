import { useEffect, useState } from "react";
import api from "../services/api";

export default function Interviews() {
  const [applications, setApplications] = useState([]);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    interviewId: "",
    application: "",
    interviewer: "",
    round: "",
    scheduledAt: ""
  });

  const fetchApplications = async () => {
    const res = await api.get("/applications?limit=100");
    setApplications(res.data.data);
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const scheduleInterview = async (e) => {
    e.preventDefault();

    try {
      await api.post("/interviews", form);
      setMessage("Interview scheduled successfully");

      setForm({
        interviewId: "",
        application: "",
        interviewer: "",
        round: "",
        scheduledAt: ""
      });
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to schedule interview");
    }
  };

  const updateResult = async () => {
    const interviewMongoId = prompt("Enter interview MongoDB _id");
    const result = prompt("Enter result: pending / pass / fail");

    if (!interviewMongoId || !result) return;

    try {
      await api.patch(`/interviews/${interviewMongoId}`, { result });
      setMessage("Interview result updated");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to update result");
    }
  };

  return (
    <div>
      <h3>Interviews</h3>

      <p>{message}</p>

      <form onSubmit={scheduleInterview}>
        <input
          placeholder="Interview ID"
          value={form.interviewId}
          onChange={(e) => setForm({ ...form, interviewId: e.target.value })}
        />

        <select
          value={form.application}
          onChange={(e) => setForm({ ...form, application: e.target.value })}
        >
          <option value="">Select Application</option>
          {applications.map((app) => (
            <option key={app._id} value={app._id}>
              {app.student?.name} - {app.drive?.title} - {app.status}
            </option>
          ))}
        </select>

        <input
          placeholder="Interviewer"
          value={form.interviewer}
          onChange={(e) => setForm({ ...form, interviewer: e.target.value })}
        />

        <input
          placeholder="Round"
          value={form.round}
          onChange={(e) => setForm({ ...form, round: e.target.value })}
        />

        <input
          type="datetime-local"
          value={form.scheduledAt}
          onChange={(e) => setForm({ ...form, scheduledAt: e.target.value })}
        />

        <button data-testid="schedule-interview-btn" type="submit">
          Schedule Interview
        </button>
      </form>

      <hr />

      <button data-testid="update-interview-result-btn" onClick={updateResult}>
        Update Interview Result
      </button>
    </div>
  );
}