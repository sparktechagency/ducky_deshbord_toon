import { Button, Form, Typography } from "antd";
import React, { useState } from "react";
import OTPInput from "react-otp-input";
import { useNavigate, useLocation } from "react-router-dom";
import {
  useOtpVerifyMutation,
  useResendOtpMutation,
} from "../../redux/apiSlices/authSlice";
import toast from "react-hot-toast";

const { Text } = Typography;

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState();
  const email = new URLSearchParams(location.search).get("email"); // Get email from query params

  // console.log(typeof otp);

  const [otpVerify] = useOtpVerifyMutation();
  const [resendOtp] = useResendOtpMutation(); // RTK Query mutation for resending OTP

  const onFinish = async () => {
    // console.log("OTP:", otp);
    // console.log(localStorage.getItem("toon_forgot_password_token"));
    // navigate(`/auth/reset-password?email=${email}`);

    try {
      console.log({ otp: otp });

      const response = await otpVerify({ otp: otp }).unwrap();

      if (response?.success) {
        toast.success("OTP verified successfully!");
        localStorage.removeItem("toon_forgot_password_token");
        localStorage.setItem("toon_reset_password_token", response?.data?.forgetOtpMatchToken);
        navigate(`/auth/reset-password?email=${email}`);
      } else {
        toast.error("OTP verification failed");
      }
    } catch (error) {
      toast.error("Error verifying OTP:", error);
    }
  };

  const handleResendEmail = async () => {
    try {
      // Trigger resend OTP API call with the email
      const response = await resendOtp().unwrap();
      // console.log(response);

      if (response?.success) {
        toast.success("OTP resent successfully!");
      } else {
        toast.error("Failed to resend OTP. Try again later");
      }
    } catch (error) {
      // console.log(error?.data?.message);
      toast.error(error?.data?.message);
    }
  };

  return (
    <div>
      <div className="text-center mb-6">
        <h1 className="text-[25px] font-semibold mb-6">Verify OTP</h1>
        <p className="w-[80%] mx-auto text-sm">
          We've sent a verification code to your email. Please check your inbox
          and enter the code here.
        </p>
      </div>

      <Form layout="vertical" onFinish={onFinish}>
        <div className="flex items-center justify-center mb-6">
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            inputStyle={{
              height: 50,
              width: 50,
              borderRadius: "8px",
              margin: "6px",
              fontSize: "20px",
              border: "1px solid #000000",
              color: "#2B2A2A",
              outline: "none",
              marginBottom: 10,
            }}
            renderInput={(props) => <input {...props} />}
          />
        </div>

        <div className="flex items-center justify-between mb-6 px-1">
          <Text>Didn't receive the code?</Text>

          <p
            onClick={handleResendEmail}
            className="login-form-forgot"
            style={{ color: "black", cursor: "pointer" }}
          >
            Resend
          </p>
        </div>

        <Form.Item style={{ marginBottom: 0 }}>
          <button
            htmlType="submit"
            style={{
              width: "100%",
              height: 44,
              border: "1px solid #d9d9d9",
              outline: "none",
              boxShadow: "none",
              color: "white",
            }}
            className="bg-gray-800 rounded-md py-2 text-lg"
          >
            Verify
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default VerifyOtp;
