import { useForm } from "react-hook-form";
import axios from "axios";
import { Server_URL } from "../../../utils/config";
import { useNavigate, useLocation } from "react-router-dom";
import "../register.css";

function VerifyOTP() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${Server_URL}users/verify-otp`, data);
      alert(res.data.message);
      navigate("/resetpass", { state: { email: data.email } });
    } catch (err) {
      alert(err.response?.data?.message || "Invalid or expired OTP");
    }
  };

  return (
    <div className="register-container" style={{ minHeight: "100vh", padding: "2rem" }}>
      <div className="register-card" style={{ maxWidth: "500px", margin: "0 auto" }}>
        <div className="register-header">
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔐</div>
          <h2 className="register-title">Verify OTP</h2>
          <p className="register-subtitle">
            We've sent a 6-digit code to <br /><span style={{ fontWeight: 700, color: "#8b5cf6" }}>{email}</span>
          </p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-floating-custom">
            <input
              id="email"
              type="email"
              className="custom-input"
              placeholder=" "
              defaultValue={email}
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
            <div style={{ display: "flex", gap: "10px" }}>
              <div style={{ position: "relative", flex: 1 }}>
                <input
                  id="otp"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength="6"
                  className="custom-input"
                  placeholder=" "
                  {...register("otp", { 
                    required: "OTP is required",
                    minLength: {
                      value: 6,
                      message: "OTP must be 6 digits"
                    },
                    maxLength: {
                      value: 6,
                      message: "OTP must be 6 digits"
                    },
                    pattern: {
                      value: /^[0-9]{6}$/,
                      message: "OTP must be numeric"
                    }
                  })}
                />
                <label htmlFor="otp" className="custom-label">
                  Enter 6-digit code
                </label>
              </div>
            </div>
            {errors.otp && (
              <p className="error-text">{errors.otp.message}</p>
            )}
          </div>
          
          <button 
            type="submit" 
            className="register-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
        
        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <span style={{ color: "#b8aad8", fontSize: "0.88rem" }}>Didn't receive the code? </span>
          <button 
            style={{ background: "none", border: "none", color: "#8b5cf6", fontWeight: 700, fontSize: "0.88rem", cursor: "pointer", textDecoration: "underline" }}
            onClick={() => alert("OTP resent!")}
          >
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
}

export default VerifyOTP;