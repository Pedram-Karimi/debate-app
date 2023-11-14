interface Props {
  debateTitle: string;
  debateDescription: string;
}
//
const DebateBox: React.FC<Props> = ({ debateTitle, debateDescription }) => {
  return (
    <div>
      {/* <Link to="/debate/room/1" className="link"> */}
      <div className="w-[100%] gap-2 flex flex-col pr-4 pl-4">
        {/* debate creater */}
        <div className="flex gap-2 items-center">
          <img
            src="https://www.gravatar.com/avatar/b3568450826559f6ce26b424b8283279.jpg?size=240&d=https%3A%2F%2Fwww.artstation.com%2Fassets%2Fdefault_avatar.jpg"
            className="w-[45px] h-[45px] rounded-full cursor-pointer border border-[var(--border-color-2)]"
          />

          <div>
            <div>
              <p>
                <span className="font-bold">[name]</span> . rank
              </p>
            </div>
            <p className="text-sm text-[var(--dark-text)]">2 days ago</p>
          </div>
        </div>
        {/* debate main line */}
        <div>
          <p className="text-lg">{debateTitle}</p>
          {/* debate description */}
          <p className="text-[var(--dark-text)] text-sm">{debateDescription}</p>
        </div>
        {/* possible media */}
        <div>
          {/* <img src={img} className="w-full rounded-xl m-auto max-w-[100%]" /> */}
        </div>
        {/* debate footer */}
      </div>
      <div className="w-full h-10 border-b border-[var(--border-color-2)] pl-4 pr-4"></div>
      {/* </Link> */}
    </div>
  );
};

export default DebateBox;
