"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Mytrip = () => {
  const router = useRouter();
  const [trip, setTrip] = useState([]);
  const [userdata, setUserdata] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      router.push("/");
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUserdata(parsedUser);
  }, [router]); // Ensure `router` is included in dependencies

  useEffect(() => {
    if (!userdata) return; // Prevent API call if userdata is null

    const GetUserData = async () => {
      try {
        const response = await fetch("/api/userdata", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userid: userdata._id || userdata.id }), // Ensure correct ID field
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setTrip(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to load trip data.");
      }
    };

    GetUserData();
  }, [userdata]);

  if (error) {
    return <p className="text-red-500 text-center mt-5">{error}</p>;
  }

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 my-11">
      <h2 className="font-bold text-3xl">My Trip</h2>
      <div className="w-[400px] h-[400px] bg-gray-200 rounded-lg">
        <img
          src="/travel-concept-with-worldwide-landmarks.jpg"
          className="w-full h-1/2"
          alt="Travel"
        />
        <div className="flex flex-col justify-center items-center gap-3">
          <h2 className="font-bold text-lg mt-5">
            Location - {trip?.travelPlan?.location || "N/A"}
          </h2>
          <h2 className="text-green-700 text-sm font-bold">
            Duration - {trip?.travelPlan?.duration || "N/A"}
          </h2>
          <h2 className="text-red-700 text-sm font-bold">
            Budget - {trip?.travelPlan?.budget || "N/A"}
          </h2>
          <h2 className="text-red-700 text-sm font-bold">
            Travel With - {trip?.travelPlan?.travelers || "N/A"}
          </h2>
        </div>

        <button
          onClick={() => router.push(`/viewtrip/${userdata?._id || userdata?.id}`)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg mt-3"
        >
          View Trip
        </button>
      </div>
    </div>
  );
};

export default Mytrip;
