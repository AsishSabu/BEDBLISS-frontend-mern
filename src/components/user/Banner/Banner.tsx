import React from "react";

const Banner = () => {
  return (
    <>
      <div className="relative h-[300px] bg-varBlue">
        <div className="flex flex-col gap-4 justify-center xl:ml-10 lg:ml-2.5 md:ml-3.5  sm:ml-60 w-full h-full px-3 md:px-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
          Find your next stay

          </h1>
          <p className="text-gray-300">Search low prices on hotels, homes and much more...</p>
        </div>
      </div>
      <section className=" flex items-center border border-white-200 justify-center p-2 container mx-auto rounded-lg h-auto relative bg-[#F3D430] max-w-3xl -mt-8 ">
        <input
          className="shadow rounded py-2 px-2 text-gray-700 w-1/4 mr-2"
          type="text"
          placeholder="Where are you going?"
        />
        <input
          className="shadow rounded py-2 px-2 text-gray-700 w-1/4 mr-2"
          type="date"
        />
        <input
          className="shadow rounded py-2 px-2 text-gray-700 w-1/4 mr-2"
          type="date"
        />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/4">
          Search
        </button>
      </section>
    </>
  );
};

export default Banner;
