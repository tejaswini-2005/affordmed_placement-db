import { useEffect, useState } from "react";
import api from "../services/api.js";

export default function Students() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    api.get("/students").then((res) => {
      setStudents(res.data.data);
    });
  }, []);

  return (
    <div>
      <h3>Students</h3>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Dept</th>
            <th>CGPA</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.department}</td>
              <td>{student.cgpa}</td>
              <td>{student.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}