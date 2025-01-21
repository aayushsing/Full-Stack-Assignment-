import React, { useState } from "react";
import axios from "axios";
import "./styles/App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = async () => {
    try {
      await axios.post("http://localhost:5000/api/send-otp", { email });
      setOtpSent(true);
      toast.success("OTP sent to your email.");
    } catch (error) {
      toast.error("Error sending OTP.");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/verify-otp", { email, otp });
      toast.success("Login successful.");
      onLogin(response.data.token);
    } catch (error) {
      toast.error("Invalid OTP.");
    }
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <input 
        type="email" 
        placeholder="Enter your email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      {otpSent && (
        <input 
          type="text" 
          placeholder="Enter OTP" 
          value={otp} 
          onChange={(e) => setOtp(e.target.value)} 
        />
      )}
      {!otpSent ? (
        <button onClick={handleSendOtp}>Send OTP</button>
      ) : (
        <button onClick={handleVerifyOtp}>Verify OTP</button>
      )}
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
