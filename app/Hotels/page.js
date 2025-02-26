import React from "react";

const Hotel = ({ trip }) => {
  if (!trip || trip.length === 0 || !trip[0]?.travelPlan?.hotels) {
    return <p className="text-center text-red-500">No hotel recommendations available.</p>;
  }

  return (
    <div>
      <h2 className="font-bold text-xl mt-5 mb-6">Hotel Recommendations</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 xl:grid-cols-4">
        {trip[0].travelPlan.hotels.map((item, index) => (
          <div key={index} className="hover:scale-110 transition-all">
            <img src="/4873.jpg" className="rounded-xl" alt={item.hotelName} />
            <div className="my-2 gap-4">
              <h2 className="font-bold">{item.hotelName || "Hotel Name Unavailable"}</h2>
              <h2 className="text-xs text-gray-500">🚏 {item.hotelAddress || "Address Unavailable"}</h2>
              <h2 className="text-red-600 font-bold text-sm">💸 {item.price || "N/A"}</h2>
              <h2>⭐ {item.rating || "No rating available"}</h2>
            </div>
            {item.hotelName && item.hotelAddress && (
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.hotelName + " " + item.hotelAddress)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="p-2 bg-blue-600 text-white rounded-2xl">Get Location</button>
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hotel;
