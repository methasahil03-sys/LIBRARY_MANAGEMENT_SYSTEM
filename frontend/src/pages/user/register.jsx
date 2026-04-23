import {useForm} from "react-hook-form";
import axios from "axios";
import { Server_URL } from "../../utils/config";
import { showErrorToast, showSuccessToast } from "../../utils/toasthelper";
import "./register.css";


export default function Register(){
    const { register, handleSubmit, reset, formState: { errors } } = useForm();


    const onSubmit =async (data) => {
      try{
        const formData = { ...data, role: "user" };
      const response = await axios.post(`${Server_URL}users/register`, formData);

      console.log("Response:", response.data);
      showSuccessToast("Registration Successful!");
      reset();


      }catch(error){
        console.error("Error:", error.response?.data || error.message);
      showErrorToast("Registration Failed!");
      }
      
    };
    return(
      <div className="register-container">
        <div className="register-card">
          <div className="register-header">
            <h2 className="register-title">Create Account</h2>
            <p className="register-subtitle">Join the Library Management System</p>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            
            <div className="form-floating-custom">
              <input 
                type="text" 
                id="name"
                className="custom-input" 
                placeholder=" "
                {...register("name", { required: "Name is required" })} 
              />
              <label htmlFor="name" className="custom-label">Full Name</label>
              {errors.name && <p className="error-text">{errors.name.message}</p>}
            </div>

            <div className="form-floating-custom">
              <input 
                type="email" 
                id="email"
                className="custom-input" 
                placeholder=" "
                {...register("email", { required: "Email is required" })} 
              />
              <label htmlFor="email" className="custom-label">Email Address</label>
              {errors.email && <p className="error-text">{errors.email.message}</p>}
            </div>

            <div className="form-floating-custom">
              <input 
                type="password" 
                id="password"
                className="custom-input" 
                placeholder=" "
                {...register("password", { required: "Password is required" })} 
              />
              <label htmlFor="password" className="custom-label">Password</label>
              {errors.password && <p className="error-text">{errors.password.message}</p>}
            </div>

            <div className="form-floating-custom">
              <input 
                type="text" 
                id="stream"
                className="custom-input" 
                placeholder=" "
                {...register("stream", { required: "Stream is required" })} 
              />
              <label htmlFor="stream" className="custom-label">Stream (e.g. Science, Arts)</label>
              {errors.stream && <p className="error-text">{errors.stream.message}</p>}
            </div>

            <div className="form-floating-custom">
              <input 
                type="number" 
                id="year"
                className="custom-input" 
                placeholder=" "
                {...register("year", { required: "Year is required" })} 
              />
              <label htmlFor="year" className="custom-label">Current Year</label>
              {errors.year && <p className="error-text">{errors.year.message}</p>}
            </div>

            <button type="submit" className="register-btn">Register</button>
          </form>
        </div>
      </div>
    )
}