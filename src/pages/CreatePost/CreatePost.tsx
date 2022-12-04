import { useEffect, useState, useRef } from "react"; // react-hooks

import { Link } from "react-router-dom"; // react-router

import { useQuill } from "react-quilljs"; // quill

import "quill/dist/quill.bubble.css"; // quill css file

// components

import Navbar from "../../components/Navbar/Navbar";

import "./createPost.css"; // styles
//
const CreatePost: React.FC = () => {
  //--
  // variables ---
  const [postTitle, setPostTitle] = useState<string>(
    localStorage.getItem("post")
      ? JSON.parse(localStorage.getItem("post") ?? "").title
      : ""
  );
  const [postContent, setPostContent] = useState<string>(
    localStorage.getItem("post")
      ? JSON.parse(localStorage.getItem("post") ?? "").content
      : ""
  );

  // quill rich text editor config ------------------------------

  const theme = "bubble";
  const placeholder = "Write...";
  // const scrollingContainer = "body";
  const { quill, quillRef } = useQuill({
    theme,
    placeholder,
    scrollingContainer: "html",
  });
  useEffect(() => {
    if (quill) {
      quill.root.innerHTML = `${postContent}`;
      quill.on("text-change", () => {
        setPostContent(quill.root.innerHTML);
      });
    }
  }, [quill]);

  //jsx ---
  return (
    <>
      <Navbar />
      <div className="create-post">
        <input
          className="create-post-title"
          placeholder="Write a title"
          maxLength={80}
          value={postTitle}
          onChange={(e) => {
            setPostTitle(e.target.value);
          }}
        />
        <div className="create-post-content">
          <div ref={quillRef} />
        </div>
        <Link to="/publish-post" className="link">
          <button className="createPost-next-btn">Next</button>
        </Link>
      </div>
    </>
  );
};

export default CreatePost;
