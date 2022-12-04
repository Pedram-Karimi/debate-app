import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
// import { useUserAuth } from "../../contexts/UserAuthContext";
const Login: React.FC = () => {
  const [LoginEmail, setLoginEmail] = useState("");
  const [LoginPassword, setLoginPassword] = useState("");
  // const { signIn } = useUserAuth();
  // let navigate = useNavigate();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      // await signIn(LoginEmail, LoginPassword);
      // return navigate("/");
    } catch (err) {
      // console.log(err.message);
    }
  };
  return (
    <>
      <Navbar />
      <div className="authPage">
        <div className="container">
          <p>Login here</p>
          <div className="input_box">
            <form onSubmit={handleSubmit}>
              <input
                value={LoginEmail}
                placeholder="Email"
                required
                onChange={(e) => {
                  setLoginEmail(e.target.value);
                }}
              />
              <input
                placeholder="Password"
                value={LoginPassword}
                required
                onChange={(e) => {
                  setLoginPassword(e.target.value);
                }}
              />
              <button className="signup_btn">Login</button>
            </form>
          </div>
          <div className="signUp-box">
            do not have account?
            <Link to="/sign-up" className="signup-link">
              sign up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
