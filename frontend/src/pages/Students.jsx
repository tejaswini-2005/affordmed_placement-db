import { useEffect, useState } from "react";
import api from "../services/api";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [department, setDepartment] = useState("");
  const [cgpaMin, setCgpaMin] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  const fetchStudents = async () => {
    try {
      const res = await api.get("/students", {
        params: {
          department,
          cgpaMin,
          status
        }
      });

      setStudents(res.data.data);
      setMessage("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to fetch students");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const clearFilters = () => {
    setDepartment("");
    setCgpaMin("");
    setStatus("");
  };

  return (
    <div>
      <h3>Students</h3>

      <p>{message}</p>

      <div>
        <input
          data-testid="department-filter"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />

        <input
          data-testid="cgpa-filter"
          placeholder="Minimum CGPA"
          value={cgpaMin}
          onChange={(e) => setCgpaMin(e.target.value)}
        />

        <select
          data-testid="status-filter"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="active">active</option>
          <option value="inactive">inactive</option>
        </select>

        <button data-testid="filter-students-btn" onClick={fetchStudents}>
          Filter
        </button>

        <button
          data-testid="clear-student-filters-btn"
          onClick={() => {
            clearFilters();
            setTimeout(fetchStudents, 0);
          }}
        >
          Clear
        </button>
      </div>

      <br />

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>CGPA</th>
            <th>Skills</th>
            <th>Graduation Year</th>
            <th>Phone</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.studentId}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.department}</td>
              <td>{student.cgpa}</td>
              <td>{student.skills?.join(", ")}</td>
              <td>{student.graduationYear}</td>
              <td>{student.phone}</td>
              <td>{student.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}