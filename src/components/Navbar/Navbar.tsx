// react
import { useState } from "react";
// librarys
import { Link } from "react-router-dom";
import { useUserAuth } from "../../contexts/UserAuthContext";
// firebase

// styles
import "./navbar.css";
import UserMenu from "./UserMenu";
//
const Navbar: React.FC = () => {
  // context
  const { user } = useUserAuth();

  // variables

  const [userMenuDisplay, setUserMenuDisplay] = useState<boolean>(false);
  const [addTypeDisplay, setAddTypeDisplay] = useState<boolean>(false);

  //
  return (
    <>
      <div className="empty-box"></div>
      <div className="navbar">
        <div className="logo-box">
          <Link to="/" className="link">
            <h1>Logo</h1>
          </Link>
        </div>
        <form>
          <input placeholder="Search for topics..." />
          <button>Search</button>
        </form>
        <div className="nav-account">
          <div className="add-svg-wrapper">
            <svg
              className="add-svg"
              x="0px"
              y="0px"
              width="45.402px"
              height="45.402px"
              viewBox="0 0 45.402 45.402"
              onClick={() => {
                setAddTypeDisplay(!addTypeDisplay);
              }}
            >
              <path
                d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141
		c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27
		c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435
		c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z"
              />
            </svg>
            {addTypeDisplay && (
              <div className="add-contentType">
                <Link to="/create-post" className="link">
                  <p style={{ borderBottom: "1px solid var(--border-color)" }}>
                    Post
                  </p>
                </Link>
                <Link to="/create-debate" className="link">
                  <p>Debate</p>
                </Link>
              </div>
            )}
          </div>
          <svg x="0px" y="0px" viewBox="0 0 512 512" className="bell-svg">
            <g>
              <path d="M381.7,225.9c0-97.6-52.5-130.8-101.6-138.2c0-0.5,0.1-1,0.1-1.6c0-12.3-10.9-22.1-24.2-22.1c-13.3,0-23.8,9.8-23.8,22.1   c0,0.6,0,1.1,0.1,1.6c-49.2,7.5-102,40.8-102,138.4c0,113.8-28.3,126-66.3,158h384C410.2,352,381.7,339.7,381.7,225.9z" />
              <path d="M256.2,448c26.8,0,48.8-19.9,51.7-43H204.5C207.3,428.1,229.4,448,256.2,448z" />
            </g>
          </svg>
          {user != null && (
            <div>
              <div
                className="nav-avatar"
                onClick={() => {
                  setUserMenuDisplay(!userMenuDisplay);
                }}
              ></div>
              {userMenuDisplay && <UserMenu />}
            </div>
          )}

          {user == null && (
            <div className="logInOrSignup">
              <Link to="/sign-up " className="link">
                <div className="signUp-btn"> Sign Up </div>
              </Link>
              <Link to="/login" className="link">
                <div className="signIn-btn">Sign In</div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
