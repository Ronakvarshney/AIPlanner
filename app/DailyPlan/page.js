import React from "react";

const DailyPlan = ({ trip }) => {
  return (
    <div className="p-4">
      <h2 className="font-bold text-lg mb-4 text-center md:text-left">Places to Visit</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {trip[0]?.travelPlan?.itinerary.map((item, index) => (
          <div
            key={index}
            className="bg-gray-100 p-3 hover:scale-105 transition-transform rounded-lg shadow-md"
          >
            <h2 className="text-xs font-bold">Day {item.day}</h2>
            <h2 className="font-medium text-sm text-orange-600">BestTimeToVisit - {item.bestTimeToVisit}</h2>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <img
                src="/travel-concept-with-worldwide-landmarks.jpg"
                alt={item.placeName}
                className="w-full sm:w-[130px] h-[130px] rounded-md object-cover"
              />
              <div className="flex flex-col gap-2 text-center sm:text-left">
                <h2 className="font-bold text-sm">PlaceName - {item.placeName}</h2>
                <h2 className="text-xs text-gray-500">{item.placeDetails}</h2>
                <h2 className="text-sm text-red-600">TicketPrice - {item.ticketPricing || "N/A"}</h2>
                <h2 className="text-sm font-medium text-green-700"> Travel timing - ⏱️ {item.travelTime || "N/A"}</h2>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${trip[0]?.location + " " + item.placeName}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2"
                >
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-2xl w-full sm:w-auto">
                    Get Location
                  </button>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyPlan;
