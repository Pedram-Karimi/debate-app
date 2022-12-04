import Navbar from "../../components/Navbar/Navbar";

//
const Science: React.FC = () => {
  return (
    <div className="science">
      <Navbar />
      <ul>
        <li>Physics</li>
        <li>Chemistry</li>
        <li>Mathmathics</li>
        <li>Biology</li>
        <li>Astrophysics</li>
      </ul>
    </div>
  );
};

export default Science;
