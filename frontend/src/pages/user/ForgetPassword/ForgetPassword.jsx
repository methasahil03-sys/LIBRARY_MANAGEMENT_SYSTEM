import { useForm } from "react-hook-form";
import axios from "axios";
import { Server_URL } from "../../../utils/config";
import { useNavigate } from "react-router-dom";
import "../register.css"; 

function ForgotPassword() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${Server_URL}users/forgot-password`, data);
      alert(res.data.message);
      navigate("/verifyotp", { state: { email: data.email } });
    } catch (err) {
      alert(err.response?.data?.message || "Error sending OTP");
    }
  };

  return (
    <div className="register-container" style={{ minHeight: "100vh", padding: "2rem" }}>
      <div className="register-card" style={{ maxWidth: "500px", margin: "0 auto" }}>
        <div className="register-header">
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✉️</div>
          <h2 className="register-title">Forgot Password</h2>
          <p className="register-subtitle">
            Enter your email to receive a password reset OTP
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
          
          <button 
            type="submit" 
            className="register-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>
        
        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <span style={{ color: "#b8aad8", fontSize: "0.88rem" }}>Remember your password? </span>
          <a href="/login" style={{ color: "#8b5cf6", fontWeight: 700, fontSize: "0.88rem", textDecoration: "none" }}>
            Login here
          </a>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;