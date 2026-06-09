import { useEffect, useState } from "react";
import api from "../services/api.js";

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [form, setForm] = useState({
    companyId: "",
    name: "",
    role: "",
    package: "",
    eligibleDepartments: "",
    minimumCgpa: "",
    driveDate: "",
    status: "open"
  });

  const fetchCompanies = async () => {
    const res = await api.get("/companies");
    setCompanies(res.data.data);
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.post("/companies", {
      ...form,
      package: Number(form.package),
      minimumCgpa: Number(form.minimumCgpa),
      eligibleDepartments: form.eligibleDepartments
        .split(",")
        .map((d) => d.trim().toUpperCase())
    });

    setForm({
      companyId: "",
      name: "",
      role: "",
      package: "",
      eligibleDepartments: "",
      minimumCgpa: "",
      driveDate: "",
      status: "open"
    });

    fetchCompanies();
  };

  const deleteCompany = async (id) => {
    await api.delete(`/companies/${id}`);
    fetchCompanies();
  };

  return (
    <div>
      <h3>Companies</h3>

      <form onSubmit={handleSubmit}>
        <input placeholder="Company ID" value={form.companyId} onChange={(e) => setForm({ ...form, companyId: e.target.value })} />
        <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
        <input placeholder="Package" value={form.package} onChange={(e) => setForm({ ...form, package: e.target.value })} />
        <input placeholder="Eligible Departments CSE,IT,ECE" value={form.eligibleDepartments} onChange={(e) => setForm({ ...form, eligibleDepartments: e.target.value })} />
        <input placeholder="Minimum CGPA" value={form.minimumCgpa} onChange={(e) => setForm({ ...form, minimumCgpa: e.target.value })} />
        <input type="date" value={form.driveDate} onChange={(e) => setForm({ ...form, driveDate: e.target.value })} />

        <button data-testid="add-company-btn" type="submit">
          Add Company
        </button>
      </form>

      <hr />

      {companies.map((company) => (
        <div key={company._id}>
          <p>
            {company.name} - {company.role} - {company.package} LPA
          </p>
          <button onClick={() => deleteCompany(company._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}