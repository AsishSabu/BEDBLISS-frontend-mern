import { useNavigate } from "react-router-dom";

interface HotelDataProps {
    _id:string;
    image: string;
    name: string;
    place: string;
    description: string;
  }
  
  const HotelData: React.FC<HotelDataProps> = ({_id,image, name, place, description }) => {
  const navigate=useNavigate()
  const handleClick=()=>{
    navigate(`/user/hotelDetails/${_id}`)
  }
  
    return (
  
      <div  onClick={handleClick} className="col-span-1 grid grid-flow-row grid-rows-3 border h-80 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="row-span-2 rounded-lg">
          
          <img
            className="w-full h-full overflow-hidden rounded-lg"
            src={image}
            alt={name}
          />
        </div>
  
        <div className="row-span-1 px-4 pt-2 h-fit rounded-lg">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {name}
          </h5>
  
          <div className="flex justify-between">
            <p className="mb-3 text-sm font-thin text-gray-700 dark:text-gray-400">
              {description}
            </p>
            <p className="mb-3 text-sm font-thin text-gray-700 dark:text-gray-400">
              {place}
            </p>
          </div>
  
          <p className="mb-3 text-lg font-thin text-gray-700 dark:text-gray-400">
          ₹1000
          </p>
        </div>
      </div>
    );
  };
  export default HotelData