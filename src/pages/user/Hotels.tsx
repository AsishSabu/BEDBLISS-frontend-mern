import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducer/reducer";
import { Range } from "react-range";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import useSWR from "swr";
import { ADMIN_API } from "../../constants";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../redux/store/store";
import { setData } from "../../redux/slices/searchingSlice";
import useHotelsUser from "../../hooks/user/useHotels";
import SearchBoxUser from "../../components/user/SearchBoxUser";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const STEP = 100;
const MIN = 0;
const MAX = 100000;

const fetcher = (url: string) => axios.get(url).then(res => res.data);

const Hotels: React.FC = () => {
  const searchData = useAppSelector(state => state.searchingSlice);
  const { handleSearch, loading } = useHotelsUser();
  const dispatch = useAppDispatch();

  const [stayTypes, setStayTypes] = useState<string[]>([]);
  const [localLoading, setLocalLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleClick = (id: string) => {
    navigate(`/user/hotelDetails/${id}`);
  };

  const searchResults = useSelector(
    (state: RootState) => state.destinationSlice.search
  );
  const totalResults = useSelector(
    (state: RootState) => state.destinationSlice.length
  ) || 0;

  console.log(totalResults, "page...........................");

  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 4;

  const { data } = useSWR(`${ADMIN_API}/stayTypes`, fetcher);

  useEffect(() => {
    if (data && data.data) {
      setStayTypes(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (!loading) {
      setLocalLoading(false);
    }
  }, [loading]);

  const getItemProps = (index: number) => ({
    variant: currentPage === index ? "filled" : "text",
    color: "gray",
    onClick: () => {
      setCurrentPage(index);
    },
  } as any);

  const next = async () => {
    if (currentPage < Math.ceil(totalResults / resultsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prev = async () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    const fetchPageData = async () => {
      setLocalLoading(true);
      const data = { ...searchData, page: currentPage };
      await dispatch(setData(data));
    };

    fetchPageData();
  }, [currentPage]);

  type optionType = {
    adult: number;
    children: number;
    room: number;
  };

  type datesType = {
    startDate: Date;
    endDate: Date;
  };

  const handleSearchFunction = async (
    destination: string,
    options: optionType,
    dates: datesType
  ) => {
    const { startDate, endDate } = dates;
    const searchData = {
      destination,
      dates: [{ startDate, endDate }],
      options,
      page: 1, // reset to the first page on a new search
    };
    setCurrentPage(1); // reset pagination
    setLocalLoading(true);
    await dispatch(setData(searchData));
  };

  useEffect(() => {
    if (localLoading) {
      handleSearch();
    }
  }, [searchData, localLoading]);

  useEffect(() => {
    if (searchResults.length > 0) {
      window.scrollTo(0, 0);
    }
  }, [searchResults]);

  const truncateText = (text:string, maxLength:number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <div className="md:px-40 lg:px-60 pt-8">
      <SearchBoxUser handleSearch={handleSearchFunction} />
      <div className="grid grid-cols-12 mt-2 min-h-screen">
        <div className="w-full bg-white col-span-12 lg:col-span-3 flex flex-col gap-5 px-2">
          <Formik
            initialValues={{
              StayType: [],
              budget: [MIN, MAX],
              amenities: [],
            }}
            onSubmit={async values => {
              setLocalLoading(true);
              await dispatch(
                setData({
                  stayTypes: values.StayType,
                  budget: { min: values.budget[0], max: values.budget[1] },
                  amenities: values.amenities,
                })
              );
            }}
          >
            {({ values, setFieldValue }) => (
              <Form className="flex-1 bg-gray-100 p-3 rounded-md sticky top-20 h-fit">
                <h1 className="text-lg text-gray-700 mb-2 font-bold">
                  Filter by:
                </h1>
                <div className="mb-4 border p-4 rounded-lg">
                  <h2 className="text-sm font-medium text-gray-700">
                    Stay Type
                  </h2>
                  <ul className="mt-2 space-y-2">
                    {stayTypes.map((category: any) => (
                      <li key={category}>
                        <label className="flex items-center">
                          <Field
                            type="checkbox"
                            name="StayType"
                            value={category._id}
                            className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                          />
                          <span className="ml-2 text-gray-700">
                            {category.name}
                          </span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mb-4 border p-4 rounded-lg">
                  <h2 className="text-sm font-medium text-gray-700">
                    Your budget (per night)
                  </h2>
                  <div className="py-4">
                    <Range
                      step={STEP}
                      min={MIN}
                      max={MAX}
                      values={values.budget}
                      onChange={budget => setFieldValue("budget", budget)}
                      renderTrack={({ props, children }) => (
                        <div
                          {...props}
                          className="w-full h-1 bg-gray-300 rounded-lg"
                        >
                          {children}
                        </div>
                      )}
                      renderThumb={({ props }) => (
                        <div
                          {...props}
                          className="w-5 h-5 bg-blue-600 rounded-full"
                        />
                      )}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-sm text-gray-600">
                    <span>₹ {values.budget[0]}</span>
                    <span>₹ {values.budget[1]}+</span>
                  </div>
                </div>
                <div className="mb-4 border p-4 rounded-lg">
                  <h2 className="text-sm font-medium text-gray-700">
                    Amenities
                  </h2>
                  <ul className="mt-2 space-y-2">
                    {[
                      "Swimming Pool",
                      "Gym",
                      "Spa",
                      "Restaurant",
                      "Parking",
                      "Free parking on premises",
                      "Kitchen",
                      "Washing Machine",
                      "Air Conditioning",
                      "BBQ grill",
                      "Hot tub",
                      "Beach Access",
                    ].map(amenity => (
                      <li key={amenity}>
                        <label className="flex items-center">
                          <Field
                            type="checkbox"
                            name="amenities"
                            value={amenity}
                            className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                          />
                          <span className="ml-2 text-gray-700">{amenity}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  type="submit"
                  className={`py-2 rounded-lg text-white w-full font-medium cursor-pointer ${
                    loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-700"
                  }`}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Apply filters"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
        <div className="col-span-12 lg:col-span-9 bg-gray-100 p-5">
          {searchResults.length > 0 ? (
            searchResults.map((hotel: any) => (
              <div
                key={hotel._id}
                className="flex flex-col p-4 min-w-full my-4 rounded-lg bg-white shadow-md md:max-w-xl md:flex-row transform transition-transform hover:scale-105 hover:shadow-md hover:bg-varGray"
                onClick={() => handleClick(hotel._id.toString())}
              >
                <img
                  className="aspect-square rounded-xl w-full object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                  src={hotel?.imageUrls[0]}
                  alt=""
                />
                <div className="flex flex-col justify-start p-6">
                  <h5 className="mb-2 text-2xl font-bold text-gray-800">
                    {hotel?.name}
                  </h5>
                  <p className="text-xs text-gray-500">{hotel?.destination}</p>
                  <p className="mb-4 text-base text-gray-600">
                    {truncateText(hotel?.description,130)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No hotels available</p>
          )}
        </div>
      </div>
      <div className="flex justify-center py-5">
        <div className="flex items-center gap-4">
          <Button
            variant="text"
            className="flex items-center gap-2"
            onClick={prev}
            disabled={currentPage === 1}
          >
            <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
          </Button>
          <div className="flex items-center gap-2">
            {Array.from({ length: Math.ceil(totalResults / resultsPerPage) }).map((_, index) => (
              <IconButton key={index} {...getItemProps(index + 1)}>
                {index + 1}
              </IconButton>
            ))}
          </div>
          <Button
            variant="text"
            className="flex items-center gap-2"
            onClick={next}
            disabled={currentPage === Math.ceil(totalResults / resultsPerPage)}
          >
            Next
            <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hotels;
