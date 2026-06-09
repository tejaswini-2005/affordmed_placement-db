import { useEffect, useState } from "react";
import api from "../services/api";

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [students, setStudents] = useState([]);
  const [drives, setDrives] = useState([]);

  const [message, setMessage] = useState("");

  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [form, setForm] = useState({
    applicationId: "",
    student: "",
    drive: "",
    currentRound: "applied",
    status: "applied"
  });

  const fetchData = async (pageNumber = page) => {
    try {
      const appRes = await api.get("/applications", {
        params: {
          page: pageNumber,
          limit: 10,
          search,
          status
        }
      });

      const studentRes = await api.get("/students");
      const driveRes = await api.get("/drives");

      setApplications(appRes.data.data);
      setPagination(appRes.data.pagination);
      setStudents(studentRes.data.data);
      setDrives(driveRes.data.data);
      setMessage("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to fetch applications");
    }
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/applications", form);

      setMessage("Application submitted successfully");

      setForm({
        applicationId: "",
        student: "",
        drive: "",
        currentRound: "applied",
        status: "applied"
      });

      setPage(1);
      fetchData(1);
    } catch (err) {
      setMessage(err.response?.data?.message || "Application failed");
    }
  };

  const deleteApplication = async (id) => {
    try {
      await api.delete(`/applications/${id}`);
      setMessage("Application deleted successfully");
      fetchData(page);
    } catch (err) {
      setMessage(err.response?.data?.message || "Delete failed");
    }
  };

  const applyFilters = () => {
    setPage(1);
    fetchData(1);
  };

  const nextPage = () => {
    if (pagination && page >= pagination.pages) return;

    const newPage = page + 1;
    setPage(newPage);
    fetchData(newPage);
  };

  const prevPage = () => {
    if (page <= 1) return;

    const newPage = page - 1;
    setPage(newPage);
    fetchData(newPage);
  };

  return (
    <div>
      <h3>Applications</h3>

      <p>{message}</p>

      <div>
        <input
          data-testid="application-search"
          placeholder="Search student/company/drive"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          data-testid="application-status-filter"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="applied">applied</option>
          <option value="shortlisted">shortlisted</option>
          <option value="rejected">rejected</option>
          <option value="selected">selected</option>
          <option value="withdrawn">withdrawn</option>
        </select>

        <button data-testid="filter-applications-btn" onClick={applyFilters}>
          Search / Filter
        </button>
      </div>

      <hr />

      <form onSubmit={handleSubmit}>
        <input
          data-testid="application-id-input"
          placeholder="Application ID"
          value={form.applicationId}
          onChange={(e) =>
            setForm({ ...form, applicationId: e.target.value })
          }
        />

        <select
          data-testid="student-select"
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
          data-testid="drive-select"
          value={form.drive}
          onChange={(e) => setForm({ ...form, drive: e.target.value })}
        >
          <option value="">Select Drive</option>
          {drives.map((drive) => (
            <option key={drive._id} value={drive._id}>
              {drive.title} - {drive.company?.name} - {drive.status}
            </option>
          ))}
        </select>

        <button data-testid="add-application-btn" type="submit">
          Apply
        </button>
      </form>

      <hr />

      <div>
        <button data-testid="prev-page-btn" onClick={prevPage}>
          Previous
        </button>

        <span>
          Page {page} of {pagination?.pages || 1}
        </span>

        <button data-testid="next-page-btn" onClick={nextPage}>
          Next
        </button>
      </div>

      <br />

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Application ID</th>
            <th>Student</th>
            <th>Drive</th>
            <th>Company</th>
            <th>Current Round</th>
            <th>Status</th>
            <th>Applied At</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {applications.map((app) => (
            <tr key={app._id}>
              <td>{app.applicationId}</td>
              <td>{app.student?.name}</td>
              <td>{app.drive?.title}</td>
              <td>{app.drive?.company?.name}</td>
              <td>{app.currentRound}</td>
              <td>{app.status}</td>
              <td>{new Date(app.appliedAt).toLocaleDateString()}</td>
              <td>
                <button
                  data-testid="delete-application-btn"
                  onClick={() => deleteApplication(app._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}