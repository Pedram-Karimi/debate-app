import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../Firebase";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase";
import "./login&Signup.css";
import Navbar from "../../components/Navbar/Navbar";
const SignUp: React.FC = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerFirstName, setRegisterFirstName] = useState("");

  let navigate = useNavigate();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      const userRef = doc(db, "users", user.user.uid);
      setDoc(
        userRef,
        {
          userName: registerFirstName,
          bio: "",
        },
        { merge: true }
      );
      navigate("/");
      setRegisterEmail("");
      setRegisterPassword("");
      setRegisterFirstName("");
    } catch (err: any) {
      console.log(err.message);
    }
  };
  return (
    <>
      <Navbar />
      <div className="authPage">
        <div className="container">
          <p>Sign up here</p>
          <div className="input_box">
            <form onSubmit={handleSubmit}>
              <input
                value={registerFirstName}
                placeholder="First name"
                required
                onChange={(e) => {
                  setRegisterFirstName(e.target.value);
                }}
              />
              <input
                value={registerEmail}
                placeholder="Email"
                required
                onChange={(e) => {
                  setRegisterEmail(e.target.value);
                }}
              />
              <input
                placeholder="Password"
                value={registerPassword}
                required
                onChange={(e) => {
                  setRegisterPassword(e.target.value);
                }}
              />
              <button className="signup_btn">Sign up</button>
            </form>
          </div>
          <div className="signUp-box">
            do you have account?
            <Link to="/login" className="signup-link">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
