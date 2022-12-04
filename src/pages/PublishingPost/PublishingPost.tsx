// components

import Navbar from "../../components/Navbar/Navbar";
import PublishDescription from "./components/PublishDescription";
import PublishTagsInput from "./components/PublishTagsInput";
import PublishThumbnail from "./components/PublishThumbnail";

import "./publishingPost.css"; // styles
//
const PublishingPost: React.FC = () => {
  // variables ---

  //
  return (
    <div className="publishingPost">
      <Navbar />
      <div className="publishing-page-container">
        <PublishThumbnail />
        <PublishTagsInput />
        <PublishDescription />
        <button className="publish-btn">Publish</button>
      </div>
    </div>
  );
};

export default PublishingPost;
