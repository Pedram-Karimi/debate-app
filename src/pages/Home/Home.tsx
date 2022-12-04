import Navbar from "../../components/Navbar/Navbar";
import Filter from "./components/Filter/Filter";
import Menu from "./components/Menu/Menu";
import Post from "./components/Post/Post";
import "./home.css";
//
const Home: React.FC = () => {
  return (
    <div className="home">
      <Navbar />
      <Menu />
      <Filter />
      <div className="home-body">
        <div className="home-body-left">
          <Post />
          <Post />
        </div>
        <div className="home-body-right">
          <h2 style={{ margin: "20px" }}>Next updates</h2>
        </div>
      </div>
    </div>
  );
};

export default Home;
