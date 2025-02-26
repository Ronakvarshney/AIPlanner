"use client";
import Navbar from "@/components/Navbar";
import { AI_PROMPT, chatSession } from "@/service/AIModel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";

import React, { useEffect, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CreateTrip = () => {
  const [formData, setFormData] = useState({
    destination: "",
    days: "",
    budget: "",
    companions: "",
  });
  const [opendialog, setopendialog] = useState(false);
  const [aidata, setaidata] = useState(null);
  const [userData, setuserData] = useState(null);
  const [loading, setloading] = useState(false);
  const router = useRouter();
  const login = useGoogleLogin({
    onSuccess: (coderes) => GetUserProfile(coderes),
    onError: (error) => console.log(error),
  });

  const handleSubmit = async (e) => {
    e?.preventDefault();
    const user = localStorage.getItem("user");

    if (!user) {
      setopendialog(true);
      return;
    }

    const Final_Prompt = AI_PROMPT.replace("{location}", formData?.destination)
      .replace("{totalDays}", formData?.days)
      .replace("{traveler}", formData.companions)
      .replace("{budget}", formData.budget);

    console.log(Final_Prompt);

    try {
      setloading(true);
      const result = await chatSession.sendMessage(Final_Prompt);

      const responseText = result.response?.text();

      setaidata(responseText);

      // Now call CreateUser after aidata is set
      const userdata = JSON.parse(localStorage.getItem("user"));
      if (userdata) {
        setuserData(userdata);
      }

      setloading(false);
    } catch (error) {
      console.error("Error fetching from Google Generative AI:", error);
      alert(
        "There was an issue with the API key or the API request. Please check the key."
      );
    }
  };
  useEffect(() => {
    console.log(userData)
    if (aidata && userData) {
      createUser();
    }
  }, [aidata, userData]);

  const GetUserProfile = async (tokeninfo) => {
    try {
      const resp = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokeninfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokeninfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      );

      const userData = resp.data;
      localStorage.setItem("user", JSON.stringify(userData));
      setopendialog(false);
   

      // Ensure userData is stored before handling submission
      handleSubmit();
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const createUser = async () => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userData, aidata }),
      });

      if (!response.ok) throw new Error("Failed to create user");

      console.log("User created successfully");
      router.push('/viewtrip/'+ userData.id);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="w-full h-full flex flex-col">
      <Navbar />
      <div className="px-6 py-8 flex flex-col mt-14">
        <h2 className="font-bold text-3xl mb-4">
          Tell us your travel preference -
        </h2>
        <p className="text-center text-gray-500 text-lg mb-6">
          Just provide some basic information, and our trip planner will
          generate a customized itinerary based on your preference.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Destination of choice */}
          <div>
            <label htmlFor="destination" className="text-xl font-medium">
              What is your destination of choice?
            </label>
            <input
              type="text"
              id="destination"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder="Enter destination"
              className="w-full mt-2 p-3 border rounded-md"
            />
          </div>

          {/* Number of days */}
          <div>
            <label htmlFor="days" className="text-xl font-medium">
              How many days are you planning?
            </label>
            <input
              type="number"
              id="days"
              name="days"
              value={formData.days}
              onChange={handleChange}
              placeholder="Enter number of days"
              className="w-full mt-2 p-3 border rounded-md"
            />
          </div>

          {/* Budget */}
          <div>
            <label className="text-xl font-medium">What is your budget?</label>
            <div className="grid grid-cols-3 gap-4 mt-2">
              <div
                className={`flex items-center justify-center p-4 border rounded-lg shadow-lg cursor-pointer ${
                  formData.budget === "cheap"
                    ? "bg-green-300 shadow-green-500"
                    : "bg-gray-200 hover:bg-green-100"
                }`}
              >
                <input
                  type="radio"
                  id="cheap"
                  name="budget"
                  value="cheap"
                  checked={formData.budget === "cheap"}
                  onChange={handleChange}
                  className="mr-2 h-24"
                />
                <label htmlFor="cheap" className="text-lg">
                  Cheap
                </label>
              </div>
              <div
                className={`flex items-center justify-center p-4 border rounded-lg shadow-lg cursor-pointer ${
                  formData.budget === "moderate"
                    ? "bg-yellow-300 shadow-yellow-500"
                    : "bg-gray-200 hover:bg-yellow-100"
                }`}
              >
                <input
                  type="radio"
                  id="moderate"
                  name="budget"
                  value="moderate"
                  checked={formData.budget === "moderate"}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="moderate" className="text-lg">
                  Moderate
                </label>
              </div>
              <div
                className={`flex items-center justify-center p-4 border rounded-lg shadow-lg cursor-pointer ${
                  formData.budget === "luxury"
                    ? "bg-red-300 shadow-red-500"
                    : "bg-gray-200 hover:bg-red-100"
                }`}
              >
                <input
                  type="radio"
                  id="luxury"
                  name="budget"
                  value="luxury"
                  checked={formData.budget === "luxury"}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="luxury" className="text-lg">
                  Luxury
                </label>
              </div>
            </div>
          </div>

          {/* Who do you plan on travelling with */}
          <div>
            <label className="text-xl font-medium">
              Who do you plan on travelling with?
            </label>
            <div className="grid grid-cols-4 gap-4 mt-2">
              <div
                className={`flex items-center justify-center p-4 border rounded-lg shadow-lg cursor-pointer ${
                  formData.companions === "just-me"
                    ? "bg-blue-300 shadow-blue-500"
                    : "bg-gray-400 hover:bg-blue-100"
                }`}
              >
                <input
                  type="radio"
                  id="just-me"
                  name="companions"
                  value="just-me"
                  checked={formData.companions === "just-me"}
                  onChange={handleChange}
                  className="mr-2 h-32"
                />
                <label htmlFor="just-me" className="text-lg">
                  Just me
                </label>
              </div>
              <div
                className={`flex items-center justify-center p-4 border rounded-lg shadow-lg cursor-pointer ${
                  formData.companions === "couple"
                    ? "bg-pink-400 shadow-pink-600"
                    : "bg-gray-400 hover:bg-pink-100"
                }`}
              >
                <input
                  type="radio"
                  id="couple"
                  name="companions"
                  value="couple"
                  checked={formData.companions === "couple"}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="couple" className="text-lg">
                  Couple
                </label>
              </div>
              <div
                className={`flex items-center justify-center p-4 border rounded-lg shadow-lg cursor-pointer ${
                  formData.companions === "family"
                    ? "bg-green-600 shadow-green-500"
                    : "bg-gray-400 hover:bg-green-100"
                }`}
              >
                <input
                  type="radio"
                  id="family"
                  name="companions"
                  value="family"
                  checked={formData.companions === "family"}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="family" className="text-lg">
                  Family
                </label>
              </div>
              <div
                className={`flex items-center justify-center p-4 border rounded-lg shadow-lg cursor-pointer ${
                  formData.companions === "friend"
                    ? "bg-purple-300 shadow-purple-500"
                    : "bg-gray-400 hover:bg-purple-100"
                }`}
              >
                <input
                  type="radio"
                  id="friend"
                  name="companions"
                  value="friend"
                  checked={formData.companions === "friend"}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="friend" className="text-lg">
                  Friend
                </label>
              </div>
            </div>
          </div>

          {/* Generate trip button */}
          <div className="text-center">
            
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-xl mt-6"
              >
                {loading ? (
                  <AiOutlineLoading3Quarters className="w-7 h-7 animate-spin" />
                ) : (
                  "Generate Trip"
                )}
              </button>
          
          </div>
        </form>
      </div>
      <Dialog open={opendialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">
              Sign In With Google
            </DialogTitle>
            <DialogDescription className="text-center">
              Sign in to the App with Google authentication security
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col justify-center items-center mt-4">
            <img
              src="/9050014.jpg"
              className="w-24 h-24"
              alt="Google Sign In"
            />

            <button
              onClick={login}
              className="bg-blue-500 p-4 text-lg rounded-xl mt-5 flex items-center gap-2 text-white"
            >
              <FcGoogle className="w-7 h-7" /> Sign in with Google
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTrip;
