import React, { useState, useCallback,useEffect} from "react";

const names = ["hotel", "appartment", "villas","resorts"];

const Banner = () => {
  const [newName, setnewName] = useState("");
  const shuffle = useCallback(() => {
    const index = Math.floor(Math.random() * names.length);
    setnewName(names[index]);
  }, []);
  useEffect(() => {
    const intervalID = setInterval(shuffle, 3000);
    return () => clearInterval(intervalID);
  }, [shuffle]);
  return (
    <>
      <div className="relative h-[300px] bg-varBlue">
        <div className="flex flex-col gap-4 justify-center xl:ml-40 lg:ml-2.5 md:ml-3.5  sm:ml-60 w-full h-full px-3 md:px-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            List Your
          </h1>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-500">
            {newName}
          </h1>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white gap-3 flex">
            On <p className="text-green-400">BEDBLISS</p>
          </h1>
          
        </div>
      </div>
    </>
  );
};

export default Banner;
