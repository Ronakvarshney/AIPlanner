import React from "react";
import { FaShare } from "react-icons/fa6";
const InfoSection = ({ trip }) => {
  
  return (
    <div>
      <img
        src="/360_F_785742997_ZWJMcUGBybedhnKxU6soenCBnXMHaHvN.jpg"
        className="h-[300px] w-full object-cover rounded-xl"
      />
      <div className="flex justify-between item-center gap-4">
        <div className=" my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {trip[0]?.travelPlan?.location}
          </h2>
          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-600">
              📅{trip[0]?.travelPlan?.duration}
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-600">
              💸{trip[0]?.travelPlan?.budget}
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-600">
              🥂{trip[0]?.travelPlan?.travelers}
            </h2>
          </div>
        </div>

        <button className="bg-blue-500 p-3 h-10 mt-14 rounded-lg">
          <FaShare />
        </button>
      </div>


    </div>
  );
};

export default InfoSection;
