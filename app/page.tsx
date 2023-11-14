const Home = () => {
  return (
    <div className="max-w-[1100px] m-auto flex justify-between mt-16">
      <div className="w-[64%] flex flex-col gap-4 border-l border-r border-[var(--border-color-2)] pt-4 pb-4">
        {/* <DebateBox
            debateTitle="Candy on pizza tastes good"
            debateDescription="Candy gives pizza a very good sweetness that the original version clearly lacks"
          />
          <DebateBox
            debateTitle="Candy on pizza tastes good"
            debateDescription="Candy gives pizza a very good sweetness that the original version clearly lacks"
          />
          <DebateBox
            debateTitle="Candy on pizza tastes good"
            debateDescription="Candy gives pizza a very good sweetness that the original version clearly lacks"
          /> */}
      </div>
      <div className="w-[33%] h-96 pt-4">
        <div className="w-[100%] h-96 rounded-xl">
          <p className="font-bold text-[22px]">Hot Debates</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
