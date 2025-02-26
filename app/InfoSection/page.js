import React from "react";
import { FaShare } from "react-icons/fa6";

const InfoSection = ({ trip }) => {
  // Check if trip data is available
  if (!trip || trip.length === 0 || !trip[0]?.travelPlan) {
    return (
      <div className="text-center text-red-500 font-bold mt-5">
        No trip details available.
      </div>
    );
  }

  const { location, duration, budget, travelers } = trip[0].travelPlan;

  return (
    <div>
      <img
        src="/360_F_785742997_ZWJMcUGBybedhnKxU6soenCBnXMHaHvN.jpg"
        className="h-[300px] w-full object-cover rounded-xl"
        alt="Trip Image"
      />
      <div className="flex justify-between items-center gap-4">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">{location || "Unknown Location"}</h2>
          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-600">
              📅 {duration || "N/A"}
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-600">
              💸 {budget || "Not specified"}
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-600">
              🥂 {travelers || "N/A"}
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
