import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  UserPlus,
  Mail,
  Lock,
  User,
  ShieldCheck,
  ArrowRight,
  AlertCircle,
  Search,
  Trash2,
  Info,
} from "lucide-react";
import { Server_URL } from "../../utils/config";
import { getAuthToken } from "../../utils/auth";
import { showErrorToast, showSuccessToast } from "../../utils/toasthelper";
import "./AdminDashboard.css";

export default function AddLibrarian() {
  const [librarians, setLibrarians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const headers = { Authorization: `Bearer ${getAuthToken()}` };

  const fetchLibrarians = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${Server_URL}admin/librarians`, { headers });
      setLibrarians(res.data.librarians || []);
    } catch {
      showErrorToast("Failed to load librarians");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = { ...data, role: "librarian" };
      await axios.post(`${Server_URL}admin/addlibrarian`, formData, { headers });
      showSuccessToast("Librarian account created successfully!");
      reset();
      fetchLibrarians();
    } catch (error) {
      showErrorToast(error.response?.data?.message || "Registration Failed!");
    }
  };

  const deleteLibrarian = async (id) => {
    if (!window.confirm("Remove this librarian account?")) return;
    try {
      await axios.delete(`${Server_URL}admin/librarian/${id}`, { headers });
      showSuccessToast("Librarian removed");
      fetchLibrarians();
    } catch (error) {
      showErrorToast(error.response?.data?.message || "Failed to delete");
    }
  };

  useEffect(() => {
    fetchLibrarians();
  }, []);

  const filtered = librarians.filter(
    (l) =>
      l.name?.toLowerCase().includes(search.toLowerCase()) ||
      l.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="section-viewport">
      <header className="centered-header">
        <span
          className="badge badge-purple"
          style={{
            padding: "0.6rem 1rem",
            marginBottom: "1rem",
            display: "inline-flex",
          }}
        >
          <UserPlus size={14} style={{ marginRight: "6px" }} /> Staff Management
        </span>
        <h1>Staff Accounts</h1>
        <p>View all librarians and register new staff accounts.</p>
      </header>

      <div className="chart-container" style={{ padding: "1.25rem", marginBottom: "2rem" }}>
        <h3 className="section-title" style={{ marginBottom: "1rem" }}>
          Registered Librarians ({librarians.length})
        </h3>
        <div className="fine-input-wrapper" style={{ maxWidth: "600px", marginBottom: "1.25rem" }}>
          <input
            type="text"
            className="fine-input-field"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search size={18} className="fine-input-icon" />
        </div>

        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "60px" }}>
            <div className="spinner" />
          </div>
        ) : (
          <div className="admin-table-wrapper">
            <div style={{ overflowX: "auto" }}>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        style={{
                          textAlign: "center",
                          padding: "3rem",
                          color: "var(--text-muted)",
                        }}
                      >
                        <Info size={36} style={{ marginBottom: "0.75rem", opacity: 0.3 }} />
                        <br />
                        No librarians found.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((l) => (
                      <tr key={l._id}>
                        <td>
                          <div style={{ fontWeight: 800, color: "var(--text-main)" }}>
                            {l.name}
                          </div>
                        </td>
                        <td>
                          <div style={{ fontWeight: 600 }}>{l.email}</div>
                        </td>
                        <td>
                          <span
                            className="badge"
                            style={{
                              background:
                                l.status === "Active" ? "#dcfce7" : "#fee2e2",
                              color: l.status === "Active" ? "#166534" : "#991b1b",
                            }}
                          >
                            {l.status || "Active"}
                          </span>
                        </td>
                        <td style={{ fontSize: "0.85rem", color: "var(--text-dim)" }}>
                          {l.createdAt
                            ? new Date(l.createdAt).toLocaleDateString()
                            : "—"}
                        </td>
                        <td>
                          <button
                            type="button"
                            className="admin-nav-btn"
                            style={{
                              width: "auto",
                              padding: "0.6rem",
                              color: "#ef4444",
                            }}
                            onClick={() => deleteLibrarian(l._id)}
                            title="Remove librarian"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <div className="cool-form-container" style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h3 className="section-title" style={{ marginBottom: "1.5rem" }}>
          <UserPlus size={18} /> Add New Librarian
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="fine-form-container">
          <div className="fine-form-group">
            <label className="fine-label">
              <User size={14} /> Full Name
            </label>
            <div className="fine-input-wrapper">
              <input
                type="text"
                className="fine-input-field"
                placeholder="John Doe"
                {...register("name", { required: "Full name is required" })}
              />
              <User size={18} className="fine-input-icon" />
            </div>
            {errors.name && (
              <span className="fine-error-text">
                <AlertCircle size={12} /> {errors.name.message}
              </span>
            )}
          </div>

          <div className="fine-form-group">
            <label className="fine-label">
              <Mail size={14} /> Email Address
            </label>
            <div className="fine-input-wrapper">
              <input
                type="email"
                className="fine-input-field"
                placeholder="librarian@college.edu"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              <Mail size={18} className="fine-input-icon" />
            </div>
            {errors.email && (
              <span className="fine-error-text">
                <AlertCircle size={12} /> {errors.email.message}
              </span>
            )}
          </div>

          <div className="fine-form-group">
            <label className="fine-label">
              <Lock size={14} /> Account Password
            </label>
            <div className="fine-input-wrapper">
              <input
                type="password"
                className="fine-input-field"
                placeholder="••••••••"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters required",
                  },
                })}
              />
              <Lock size={18} className="fine-input-icon" />
            </div>
            {errors.password && (
              <span className="fine-error-text">
                <AlertCircle size={12} /> {errors.password.message}
              </span>
            )}
          </div>

          <div style={{ marginTop: "1rem" }}>
            <button type="submit" className="fine-button-primary" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <div
                    className="spinner"
                    style={{ width: "20px", height: "20px", borderThickness: "2px" }}
                  />{" "}
                  Processing...
                </>
              ) : (
                <>
                  <ShieldCheck size={20} /> Register Librarian <ArrowRight size={18} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
