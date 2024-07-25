import React from "react";

interface RoomNumber {
  _id: string;
  number: number;
}

interface Room {
  _id: string;
  title: string;
  desc: string;
  price: number;
  maxPeople: number;
  roomNumbers: RoomNumber[];
}

interface ReserveProps {
  setOpen: (open: boolean) => void;
  rooms: Room[];
}

const Reserve: React.FC<ReserveProps> = ({ setOpen, rooms }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-scroll">
      <div className="relative bg-white mt-40 p-6 rounded-lg w-fit">
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-white bg-varRed px-2 rounded-lg"
        >
          Close
        </button>
        <h2 className="text-2xl mb-4">Select your rooms:</h2>
        {rooms.map((item) => (
          <div className="mb-4 p-2 border shadow-2xl rounded-lg" key={item._id}>
            <div className="mb-2">
              <h3 className="text-lg font-semibold text-varRed">{item.title}</h3>
              <p className="p-2">{item.desc}</p>
              <div className="flex justify-between pt-2">
                <p>
                  Price:{" "}
                  <span className="text-lg font-bold text-orange-500">
                    {item.price}/night
                  </span>
                </p>
                <p>Max people: {item.maxPeople}</p>
              </div>
            </div>
            <p className="font-semibold text-varBlue">Rooms</p>
            <div className="flex flex-wrap gap-2 ring-1 rounded-lg m-2 p-2">
              {item.roomNumbers.map((roomNumber) => (
                <div key={roomNumber._id} className="flex items-center">
                  <input title="title" type="checkbox" value={roomNumber._id} />
                  <label className="ml-2">{roomNumber.number}</label>
                </div>
              ))}
            </div>
          </div>
        ))}
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;
