import { Routes, Route, Navigate, Link } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";

import Login from "../pages/Login.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Students from "../pages/Students.jsx";
import Companies from "../pages/Companies.jsx";
import Drives from "../pages/Drives.jsx";
import Applications from "../pages/Application.jsx";

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
};

const Layout = ({ children }) => {
  const { logout, user } = useAuth();

  return (
    <div>
      <h2>Placement Recruitment System</h2>

      <nav>
        <Link to="/">Dashboard</Link> |{" "}
        <Link to="/students">Students</Link> |{" "}
        <Link to="/companies">Companies</Link> |{" "}
        <Link to="/drives">Drives</Link> |{" "}
        <Link to="/applications">Applications</Link>
      </nav>

      <p>Logged in as: {user?.name} ({user?.role})</p>
      <button onClick={logout}>Logout</button>

      <hr />
      {children}
    </div>
  );
};

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/students"
        element={
          <ProtectedRoute>
            <Layout>
              <Students />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/companies"
        element={
          <ProtectedRoute>
            <Layout>
              <Companies />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/drives"
        element={
          <ProtectedRoute>
            <Layout>
              <Drives />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/applications"
        element={
          <ProtectedRoute>
            <Layout>
              <Applications />
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}