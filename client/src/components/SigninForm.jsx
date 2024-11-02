// src/components/SignInForm.js
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useContext } from "react";
import { DataContext } from "../apis/dataContext";
import "../styles/SigninForm.scss";

const SignInForm = () => {
  const { setUser } = useContext(DataContext);

  const handleLoginSuccess = (credentialResponse) => {
    try {
      const token = credentialResponse.credential;
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.sub; // Assuming `sub` holds the user ID
      setUser(userId);
      localStorage.setItem("token", token); // Store the entire token in localStorage
    } catch (error) {
      console.error("Failed to decode JWT:", error);
    }
  };

  return (
    <div className="form signin-form">
      <img src="logo-dark.svg" alt="logo-dark.svg" className="sigin-logo" />
      <GoogleLogin
        className="sigin-button"
        onSuccess={handleLoginSuccess}
        onError={() => console.log("Login Failed")}
      />
    </div>
  );
};

export default SignInForm;
