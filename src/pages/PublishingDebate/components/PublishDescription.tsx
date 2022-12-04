import { useState } from "react"; // react

//
const PublishDescription: React.FC = () => {
  // variables ---

  const [description, setDescription] = useState<string>("");

  //
  return (
    <div className="description">
      <p className="publish-post-mini-title">
        Write a short description for your post.*
      </p>
      <textarea
        placeholder="Write description"
        cols={44}
        rows={2}
        maxLength={120}
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <p className="description-letter-limit">{`${description.length}/120`}</p>
    </div>
  );
};

export default PublishDescription;
