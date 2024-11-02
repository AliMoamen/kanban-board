// src/components/SignIn.js
import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";

const SignIn = () => {
  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      // The signed-in user info
      const user = result.user;
      console.log("User Info:", user);
      // You can also save the user info to your state or context
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <div>
      <button onClick={handleSignIn} className="button-primary">
        Sign in with Google
      </button>
    </div>
  );
};

export default SignIn;
