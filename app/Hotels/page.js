import { Link } from "lucide-react";
import React from "react";

const Hotel = ({ trip }) => {
  return (
    <div className="">
      <h2 className="font-bold text-xl mt-5 mb-6">Hotel Recommendations</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 xl:grid-cols-4">
        {trip[0]?.travelPlan?.hotels?.map((item, index) => (
          <div key={index} className="hover:scale-110 transition-all">
            <img src="/4873.jpg" className="rounded-xl" />
            <div className="my-2 gap-4">
              <h2 className="font-bold">{item.hotelName}</h2>
              <h2 className="text-xs text-gray-500">🚏{item.hotelAddress}</h2>
              <h2 className="text-red-600 font-bold text-sm">💸{item.price}</h2>
              <h2>⭐{item.rating}</h2>
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${item.hotelName + ' ' +  item.hotelAddress}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="p-2 bg-blue-600 text-white rounded-2xl">Get Location</button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hotel;
