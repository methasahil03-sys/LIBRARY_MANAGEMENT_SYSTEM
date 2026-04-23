import { useForm } from "react-hook-form";
import axios from "axios";
import { 
  UserPlus, 
  Mail, 
  Lock, 
  User, 
  ShieldCheck,
  ArrowRight,
  AlertCircle
} from "lucide-react";
import { Server_URL } from "../../utils/config";
import { showErrorToast, showSuccessToast } from "../../utils/toasthelper";
import "./AdminDashboard.css";

export default function AddLibrarian() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = { ...data, role: "librarian" };
      const url = Server_URL + "admin/addlibrarian";
      const authToken = localStorage.getItem("authToken");

      await axios.post(url, formData, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      showSuccessToast("Librarian account created successfully!");
      reset();
    } catch (error) {
      showErrorToast(error.response?.data?.message || "Registration Failed!");
    }
  };

  return (
    <div className="section-viewport">
      <header className="centered-header">
        <span className="badge badge-purple" style={{ padding: '0.6rem 1rem', marginBottom: '1rem', display: 'inline-flex' }}>
           <UserPlus size={14} style={{ marginRight: '6px' }} /> Staff Management
        </span>
        <h1>Add New Librarian</h1>
        <p>Create a new staff account with full cataloging privileges.</p>
      </header>

      <div className="cool-form-container" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ 
            width: '60px', height: '60px', 
            background: 'linear-gradient(135deg, var(--primary), var(--accent-purple))',
            borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1.25rem', color: 'white', boxShadow: '0 8px 20px rgba(139, 92, 246, 0.2)'
          }}>
            <UserPlus size={28} />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="fine-form-container">
          {/* Name Field */}
          <div className="fine-form-group">
            <label className="fine-label"><User size={14} /> Full Name</label>
            <div className="fine-input-wrapper">
              <input
                type="text"
                className="fine-input-field"
                placeholder="John Doe"
                {...register("name", { required: "Full name is required" })}
              />
              <User size={18} className="fine-input-icon" />
            </div>
            {errors.name && <span className="fine-error-text"><AlertCircle size={12} /> {errors.name.message}</span>}
          </div>

          {/* Email Field */}
          <div className="fine-form-group">
            <label className="fine-label"><Mail size={14} /> Email Address</label>
            <div className="fine-input-wrapper">
              <input
                type="email"
                className="fine-input-field"
                placeholder="librarian@college.edu"
                {...register("email", { 
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                })}
              />
              <Mail size={18} className="fine-input-icon" />
            </div>
            {errors.email && <span className="fine-error-text"><AlertCircle size={12} /> {errors.email.message}</span>}
          </div>

          {/* Password Field */}
          <div className="fine-form-group">
            <label className="fine-label"><Lock size={14} /> Account Password</label>
            <div className="fine-input-wrapper">
              <input
                type="password"
                className="fine-input-field"
                placeholder="••••••••"
                {...register("password", { 
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters required" }
                })}
              />
              <Lock size={18} className="fine-input-icon" />
            </div>
            {errors.password && <span className="fine-error-text"><AlertCircle size={12} /> {errors.password.message}</span>}
          </div>

          <div style={{ marginTop: '1rem' }}>
            <button type="submit" className="fine-button-primary" disabled={isSubmitting}>
              {isSubmitting ? (
                <><div className="spinner" style={{ width: '20px', height: '20px', borderThickness: '2px' }} /> Processing...</>
              ) : (
                <><ShieldCheck size={20} /> Register Librarian <ArrowRight size={18} /></>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
