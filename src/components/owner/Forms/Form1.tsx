// import { ErrorMessage, Field } from 'formik';

import { useState } from "react";

const Form1 = () => {
    const [selectedPlace, setSelectedPlace] = useState('');
    console.log(selectedPlace);
    
  
    const places = [
        { name: 'House', icon: '🏠' },
        { name: 'Flat/apartment', icon: '🏢' },
        { name: 'Barn', icon: '🏚️' },
        { name: 'Bed & breakfast', icon: '🍳' },
        { name: 'Boat', icon: '⛵' },
        { name: 'Cabin', icon: '🏡' },
        { name: 'Campervan/motorhome', icon: '🚐' },
        { name: 'Casa particular', icon: '🏘️' },
        { name: 'Castle', icon: '🏰' },
        { name: 'Cave', icon: '🕳️' },
        { name: 'Container', icon: '📦' },
        { name: 'Cycladic home', icon: '🏛️' },
      ];
    
      return (
        <div className=" flex items-center justify-center bg-varWhite w-full">
          <div className="w-full max-w-3xl p-4 bg-red-400 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
              Which of these best describes your place?
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {places.map((place) => (
                <button
                  key={place.name}
                  type="button"
                  onClick={() => setSelectedPlace(place.name)}
                  className={`flex flex-col items-center justify-center p-4 border rounded-lg transition duration-300 ${
                    selectedPlace === place.name
                      ? 'border-black bg-gray-200'
                      : 'border-gray-300 bg-white'
                  }`}
                >
                  <div className="text-3xl mb-2">{place.icon}</div>
                  <div className="text-sm font-medium">{place.name}</div>
                </button>
              ))}
            </div>
            {/* <div className="mt-6 flex justify-between">
              <button className="text-blue-500 hover:underline">Questions?</button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Save & exit
              </button>
            </div> */}
          </div>
        </div>
      )
};

export default Form1;