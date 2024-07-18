import { useNavigate } from "react-router-dom";
import { whishlistBlack, whishlistRed, whishlistWhite } from "../../assets/images";
import { useEffect, useState } from "react";
import { useFetchData } from "../../utils/fetcher";
import { USER_API } from "../../constants";
import axios from "axios";
import showToast from "../../utils/toast";
import { useAppSelector } from "../../redux/store/store";
import { RootState } from "../../redux/reducer/reducer";

interface HotelDataProps {
  _id: string;
  imageUrls: string[];
  name: string;
  destination: string;
  stayType: string;
  rooms: { price: number }[];
  offer: {
    type: string;
    amount: number;
    minAmount?: number;
    maxAmount?: number;
    endDate: string;
  };
}

const HotelData: React.FC<HotelDataProps> = ({
  _id,
  imageUrls,
  name,
  destination,
  stayType,
  rooms,
  offer,
}) => {
  const navigate = useNavigate();
  const user = useAppSelector((state: RootState) => state.userSlice);
  const [isSaved, setIsSaved] = useState(false);
  const { data, isError, isLoading } = useFetchData<any>(`${USER_API}/saved`);
  const today = new Date();

  useEffect(() => {
    if (data && data.savedHotels) {
      const savedHotelIds = data.savedHotels.map((hotel: any) => hotel._id);
      setIsSaved(savedHotelIds.includes(_id));
    } else {
      setIsSaved(false);
    }
  }, [data, _id]);

  const handleClick = () => {
    navigate(`/user/hotelDetails/${_id}`);
  };

  const handleWishlist = async () => {
    try {
      const response = await axios.patch(
        `${USER_API}/addRemoveSaved/${_id}`,
        {},
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      showToast(response.data.message, "success");
      // Toggle the isSaved state
      setIsSaved(!isSaved);
    } catch (error) {
      console.error("Error updating wishlist:", error);
      showToast("Failed to update wishlist", "error");
    }
  };

  const roomPrices = rooms.map(room => room.price);
  const minPrice = Math.min(...roomPrices);

  const discountedPrice = () => {
    if (offer.type === "flat") {
      if (minPrice >= (offer.minAmount ?? 0) && minPrice <= (offer.maxAmount ?? Infinity)) {
        return minPrice - offer.amount;
      }
      return null;
    } else {
      return (minPrice * (100 - offer.amount)) / 100;
    }
  };

  return (
    <div className="bg-varGray col-span-1 relative border rounded-3xl shadow-sm p-2 border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="relative rounded-lg">
        {user.role === "user" && (
          <button onClick={handleWishlist} className="absolute top-2 right-2">
            <img src={isSaved ? whishlistRed : whishlistWhite} alt="wishlist" className="h-5" />
          </button>
        )}
        <img
          className="rounded-2xl object-cover aspect-square"
          src={imageUrls[0]}
          alt={name}
        />
      </div>

      <div className="pt-2 h-fit rounded-lg">
        <h5
          className="mb-1 text-lg font-bold tracking-tight text-gray-900 dark:text-white"
          onClick={handleClick}
        >
          {name}
        </h5>

        <div className="flex justify-between">
          <p className="mb-1 text-sm font-thin text-gray-700 dark:text-gray-400">
            {stayType.name}
          </p>
          <p className="mb-1 text-sm font-thin text-gray-700 dark:text-gray-400">
            {destination}
          </p>
        </div>
        <div className="flex justify-between">
          {offer && new Date(offer.endDate) >= today ? (
            discountedPrice() !== null ? (
              <>
                <p className="mb-1 ">
                  <span className="text-lg font-thin text-gray-600 dark:text-gray-400 line-through">
                    {minPrice}
                  </span>
                  <span>
                    {offer.type === "flat"
                      ? `${offer.amount} off`
                      : `${offer.amount}% off`}
                  </span>
                </p>
                <p className="mb-1 text-lg font-thin text-gray-700 dark:text-gray-400">
                  {discountedPrice()}
                </p>
              </>
            ) : (
              <p className="mb-1 text-lg font-thin text-gray-700 dark:text-gray-400">
                {minPrice}
              </p>
            )
          ) : (
            <p className="mb-1 text-lg font-thin text-gray-700 dark:text-gray-400">
              {minPrice}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotelData;
