import { useForm } from "react-hook-form";
import axios from "axios";
import { Server_URL } from "../../../utils/config";
import { useNavigate } from "react-router-dom";
import "../register.css";

function ResetPassword() {
  const { 
    register, 
    handleSubmit, 
    watch, 
    formState: { errors, isSubmitting } 
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${Server_URL}users/reset-password`, data);
      alert(res.data.message);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="register-container" style={{ minHeight: "100vh", padding: "2rem" }}>
      <div className="register-card" style={{ maxWidth: "500px", margin: "0 auto" }}>
        <div className="register-header">
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔑</div>
          <h2 className="register-title">Reset Your Password</h2>
          <p className="register-subtitle">
            Create a new password for your account
          </p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-floating-custom">
            <input
              id="email"
              type="email"
              className="custom-input"
              placeholder=" "
              {...register("email", { 
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
            />
            <label htmlFor="email" className="custom-label">
              Email Address
            </label>
            {errors.email && (
              <p className="error-text">{errors.email.message}</p>
            )}
          </div>

          <div className="form-floating-custom">
            <input
              id="newPassword"
              type="password"
              className="custom-input"
              placeholder=" "
              {...register("newPassword", {
                required: "Password is required",
                minLength: { 
                  value: 6, 
                  message: "Password must be at least 6 characters" 
                }
              })}
            />
            <label htmlFor="newPassword" className="custom-label">
              New Password
            </label>
            {errors.newPassword && (
              <p className="error-text">{errors.newPassword.message}</p>
            )}
          </div>

          <div className="form-floating-custom">
            <input
              id="confirmPassword"
              type="password"
              className="custom-input"
              placeholder=" "
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) => 
                  value === watch("newPassword") || "Passwords do not match"
              })}
            />
            <label htmlFor="confirmPassword" className="custom-label">
              Confirm Password
            </label>
            {errors.confirmPassword && (
              <p className="error-text">{errors.confirmPassword.message}</p>
            )}
          </div>
          
          <button 
            type="submit" 
            className="register-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;