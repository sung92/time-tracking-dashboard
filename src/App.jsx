import { useEffect } from "react";
import { useState } from "react";
import PropTypes from "prop-types";

function App() {
  const [select, setSelect] = useState("weekly");

  function handleSelect(timeframe) {
    setSelect(timeframe);
  }

  return (
    <>
      <Cards select={select} onSelect={handleSelect} />
    </>
  );
}

function Cards({ select, onSelect }) {
  return (
    <div className="grid gap-5 desktop:grid-cols-4 desktop:grid-rows-2">
      <MainCard select={select} onSelect={onSelect} />
      <SubCard select={select} />
    </div>
  );
}

function MainCard({ select, onSelect }) {
  return (
    <div className="flex max-w-[300px] flex-col rounded-[12px] bg-neutral-darkblue desktop:row-span-2">
      <div className="flex items-center justify-center gap-4 overflow-hidden rounded-[12px] bg-[#5747EA]/[0.85] p-[25px] font-light desktop:max-w-[250px] desktop:flex-col desktop:items-start desktop:gap-8 desktop:py-[40px] desktop:pb-[80px]">
        <img
          src="/images/image-jeremy.png"
          className="h-[65px] w-[65px] rounded-full border-2 border-white"
        ></img>
        <div className="flex flex-col gap-1 desktop:gap-0">
          <p className="text-[13px] text-white/[0.7]">Report for</p>
          <p className="text-[24px] text-white desktop:text-[40px] desktop:leading-10">
            Jeremy Robson
          </p>
        </div>
      </div>
      <ul
        role="list"
        className="flex justify-around p-[18px] text-[15px] text-neutral-desaturatedblue desktop:flex-col desktop:gap-4 desktop:py-[30px]"
      >
        <li
          onClick={() => onSelect("daily")}
          className={`cursor-pointer duration-300 hover:text-white ${select === "daily" ? "text-white" : ""}`}
        >
          Daily
        </li>
        <li
          onClick={() => onSelect("weekly")}
          className={`cursor-pointer duration-300 hover:text-white ${select === "weekly" ? "text-white" : ""}`}
        >
          Weekly
        </li>
        <li
          onClick={() => onSelect("monthly")}
          className={`cursor-pointer duration-300 hover:text-white ${select === "monthly" ? "text-white" : ""}`}
        >
          Monthly
        </li>
      </ul>
    </div>
  );
}

function SubCard({ select }) {
  const [data, setData] = useState();

  useEffect(function () {
    async function fetchData() {
      const data1 = await fetch("data.json");
      const result = await data1.json();
      setData(result);
    }
    fetchData();
  }, []);

  return data
    ? data.map((el) => <Card select={select} el={el} key={el.title} />)
    : "Error Fetching";
}

function Card({ select, el }) {
  let title = el.title.split(" ").join("-").toLowerCase();
  const selectUpper = select.charAt(0).toUpperCase() + select.slice(1);
  let time = selectUpper.replace("ly", "");
  if (time === "Dai") time = "Day";
  let timeframe;
  let current;

  if (select === "weekly") {
    timeframe = el.timeframes.weekly.previous;
    current = el.timeframes.weekly.current;
  }
  if (select === "daily") {
    timeframe = el.timeframes.daily.previous;
    current = el.timeframes.daily.current;
  }

  if (select === "monthly") {
    timeframe = el.timeframes.monthly.previous;
    current = el.timeframes.monthly.current;
  }

  let background;

  if (title === "work") background = "bg-primary-lightredw";
  if (title === "play") background = "bg-primary-softblue";
  if (title === "study") background = "bg-primary-lightreds";
  if (title === "exercise") background = "bg-primary-limegreen";
  if (title === "social") background = "bg-primary-violet";
  if (title === "self-care") background = "bg-primary-softorange";

  return (
    <>
      <div
        className={`${background} rounded-[15px] bg-[top_-0.4rem_right_0.6rem] bg-no-repeat`}
        style={{ backgroundImage: `url('/images/icon-${title}.svg')` }}
      >
        <div className="mt-[37px] flex flex-col gap-2 rounded-[12px] bg-neutral-darkblue p-[20px] hover:bg-neutral-darkbluehover desktop:mt-[52px] desktop:cursor-pointer">
          <div className="flex w-full items-center justify-between">
            <p className="text-white">{el.title}</p>
            <div className="group cursor-pointer">
              <svg width="21" height="5" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"
                  fill="#BBC0FF"
                  fillRule="evenodd"
                  className="group-hover:fill-white group-hover:duration-300"
                />
              </svg>
            </div>
          </div>
          <div className="flex items-center justify-between desktop:flex-col desktop:items-start">
            <p className="text-[32px] font-light text-white desktop:text-[56px]">
              {current}hrs
            </p>
            <p className="text-[12px] text-neutral-paleblue">
              Last {time} - {timeframe}
              hrs
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

Card.propTypes = {
  select: PropTypes.string,
  el: PropTypes.object,
};

export default App;
