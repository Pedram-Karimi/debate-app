import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserAuthCtxProvider } from "./contexts/UserAuthContext";
// components
import Home from "./pages/Home/Home";
import Science from "./pages/Science/Science";
import Philosophy from "./pages/Philosophy/Philosophy";
import SocialStudies from "./pages/SocialStudies/SocialStudies";
import SignUp from "./pages/Login&Signup/SignUp";
import Login from "./pages/Login&Signup/Login";
import Engineering from "./pages/Engineering/Engineering";
import CreatePost from "./pages/CreatePost/CreatePost";
import PublishingPost from "./pages/PublishingPost/PublishingPost";
import CreateDebate from "./pages/CreateDebate/CreateDebate";
import PublishingDebate from "./pages/PublishingDebate/PublishingDebate";

const App = () => {
  console.log(process.env);
  return (
    <div className="app">
      <UserAuthCtxProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/create-debate" element={<CreateDebate />} />
            <Route path="/publish-post" element={<PublishingPost />} />
            <Route path="/publish-debate" element={<PublishingDebate />} />
            {/* <Route path="/science" element={<Science />} />
            <Route path="/philosophy" element={<Philosophy />} />
            <Route path="/social-studies" element={<SocialStudies />} />
            <Route path="/engineering" element={<Engineering />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </UserAuthCtxProvider>
    </div>
  );
};

export default App;
