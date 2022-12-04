import { useState } from "react"; // react
//
const PublishTagsInput: React.FC = () => {
  // variables ---

  const [tagInput, setTagInput] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  //
  return (
    <div className="tag-box">
      <p className="publish-post-mini-title">
        Make your post easier to find, Add Maximum 5 tags to let your audience
        know what is your post about.*
      </p>
      <div className="publish-post-tag-div">
        {tags.map((tag: string, index: number) => {
          return (
            <p
              className={tag === "" ? "ignore" : `publish-post-tag`}
              key={index}
            >
              {tag}
              <svg
                x="0px"
                y="0px"
                viewBox="0 0 92.132 92.132"
                onClick={() => {
                  setTags((pervTags: string[]) =>
                    pervTags.filter((tagItem: string) => {
                      return tag !== tagItem;
                    })
                  );
                }}
              >
                <path
                  d="M2.141,89.13c1.425,1.429,3.299,2.142,5.167,2.142c1.869,0,3.742-0.713,5.167-2.142l33.591-33.592L79.657,89.13
c1.426,1.429,3.299,2.142,5.167,2.142c1.867,0,3.74-0.713,5.167-2.142c2.854-2.854,2.854-7.48,0-10.334L56.398,45.205
l31.869-31.869c2.855-2.853,2.855-7.481,0-10.334c-2.853-2.855-7.479-2.855-10.334,0L46.065,34.87L14.198,3.001
c-2.854-2.855-7.481-2.855-10.333,0c-2.855,2.853-2.855,7.481,0,10.334l31.868,31.869L2.143,78.795
C-0.714,81.648-0.714,86.274,2.141,89.13z"
                />
              </svg>
            </p>
          );
        })}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (tagInput && !tags.includes(tagInput)) {
              setTags((pervTags: string[]) => [...pervTags, tagInput]);
            }
            setTagInput("");
          }}
        >
          {tags.length !== 5 && (
            <input
              onChange={(e) => {
                setTagInput(e.target.value);
              }}
              value={tagInput}
              placeholder="Add tag..."
              className="publish-post-tag-input"
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default PublishTagsInput;
