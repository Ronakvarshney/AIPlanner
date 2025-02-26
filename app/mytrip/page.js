"use client";

import { Link } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Mytrip = () => {
  const router = useRouter();
  const [trip, setTrip] = useState([]);
  const [userdata, setUserdata] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/");
      return;
    }
    setUserdata(JSON.parse(storedUser));
  }, [router]); // Dependency array includes `router`

  useEffect(() => {
    if (!userdata) return; // Prevent API call if userdata is null

    const GetUserData = async () => {
      try {
        const response = await fetch("/api/userdata", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userid: userdata.id }),
        });

        const data = await response.json();

        setTrip(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    GetUserData();
  }, [userdata]);

  const data = JSON.parse(localStorage.getItem('user'));
  console.log(data.id)

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 my-11">
      <h2 className="font-bold text-3xl">My Trip</h2>
      <div className="w-[400px] h-[400px] bg-gray-200 rounded-lg">
        <img
          src="/travel-concept-with-worldwide-landmarks.jpg"
          className="w-full h-1/2"
        />
        <div className="flex flex-col justify-center items-center gap-3">
          <h2 className="font-bold text-lg mt-5">
            Location - {trip?.[0]?.travelPlan?.location}
          </h2>
          <h2 className="text-green-700 text-sm font-bold">
            Duration - {trip?.[0]?.travelPlan?.duration}
          </h2>
          <h2 className="text-red-700 text-sm font-bold">
            Budget - {trip?.[0]?.travelPlan?.budget}
          </h2>
          <h2 className="text-red-700 text-sm font-bold">
            Travel With - {trip?.[0]?.travelPlan?.travelers}
          </h2>
        </div>
       
        
          <button onClick={()=>router.push(`/viewtrip/${data.id}`)} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
            View Trip
          </button>
      
      </div>
    </div>
  );
};

export default Mytrip;
