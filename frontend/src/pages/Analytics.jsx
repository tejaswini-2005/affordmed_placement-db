import { useState } from "react";
import api from "../services/api";

export default function Analytics() {
  const [placement, setPlacement] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState("");

  const fetchAnalytics = async () => {
    try {
      const placementRes = await api.get("/analytics/placements");
      const departmentRes = await api.get("/analytics/departments");
      const companyRes = await api.get("/analytics/companies");

      setPlacement(placementRes.data.data);
      setDepartments(departmentRes.data.data);
      setCompanies(companyRes.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch analytics");
    }
  };

  return (
    <div>
      <h3>Analytics</h3>

      <button data-testid="load-analytics-btn" onClick={fetchAnalytics}>
        Load Analytics
      </button>

      <p>{error}</p>

      {placement && (
        <div>
          <h4>Placement Analytics</h4>
          <p>Total Applications: {placement.totalApplications}</p>
          <p>Shortlisted: {placement.shortlistedCount}</p>
          <p>Selected: {placement.selectedCount}</p>
          <p>Rejected: {placement.rejectedCount}</p>
        </div>
      )}

      <h4>Department Analytics</h4>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Department</th>
            <th>Placed Count</th>
            <th>Placement %</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((item) => (
            <tr key={item.department}>
              <td>{item.department}</td>
              <td>{item.placedCount}</td>
              <td>{item.placementPercentage?.toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4>Company Analytics</h4>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Company</th>
            <th>Selected Students</th>
            <th>Highest Package</th>
            <th>Participation Count</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((item) => (
            <tr key={item.companyName}>
              <td>{item.companyName}</td>
              <td>{item.selectedStudents}</td>
              <td>{item.highestPackage}</td>
              <td>{item.driveParticipationCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}