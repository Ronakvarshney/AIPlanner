"use client"; // Required when using hooks in a component

import DailyPlan from "@/app/DailyPlan/page";
import Hotel from "@/app/Hotels/page";
import InfoSection from "@/app/InfoSection/page";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const TripData = () => {
  const { userid } = useParams();
  const [userData, setUserData] = useState(null); 
  const [error, setError] = useState(null); 
  const router = useRouter();
  const user = localStorage.getItem('user');
  if(!user){
    router.push('/')
  }
  const fetchUserData = async () => {
    try {
      const res = await fetch("/api/userdata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userid }), 
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const result = await res.json();
      setUserData(result);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    if (userid) {
      fetchUserData(); 
    }
  }, [userid]); 

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>; // Show loading while fetching data}
  }
  return (
    <div >
      <Navbar />
      <div className="p-10 mt-24 md:px-20 lg:px-44 xl:px-54">
        <InfoSection trip={userData} />
        <div className="mb-10">
          <Hotel trip={userData} />
        </div>
        <div className="mt-5">
          <DailyPlan trip={userData} />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default TripData;
