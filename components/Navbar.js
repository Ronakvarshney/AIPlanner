"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import axios from "axios";

const Navbar = () => {
  const [opendialog, setopendialog] = useState(false);
  const [user, setUser] = useState(null); // Store user state
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => GetUserProfile(tokenResponse),
    onError: (error) => console.error("Google login failed:", error),
  });

  const GetUserProfile = async (tokenInfo) => {
    try {
      const resp = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      );

      const userData = resp.data;
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData); // Update state
      setopendialog(false);
      router.refresh(); // Refresh to ensure UI updates
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem("user");
    setUser(null);
    router.refresh(); // Refresh page after logout
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-800 via-purple-700 to-pink-600 p-4 fixed w-full top-0 shadow-2xl z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/vecteezy_beach-island-landscape-logo-beach-logo-design-vector_6627385-1.jpg"
            className="h-12 w-12 rounded-md shadow-lg hover:scale-105 transition-transform duration-300"
            alt="Logo"
          />
          <span className="text-3xl text-white font-bold tracking-wide drop-shadow-md">
            AI-TRIP
          </span>
        </Link>

        {/* Auth Section */}
        {user ? (
          <div className="flex items-center space-x-5">
            {/* My Trip Button */}
            <Link href="/mytrip">
              <button className="px-5 py-2 bg-gray-900 text-white rounded-lg shadow-md hover:bg-gray-700 transition duration-300 transform hover:scale-105">
                My Trip
              </button>
            </Link>

            {/* Profile Dropdown */}
            <Popover>
              <PopoverTrigger>
                <div className="bg-gray-300 px-4 py-2 rounded-lg shadow-lg cursor-pointer hover:bg-gray-200 transition duration-300">
                  {user.name}
                </div>
              </PopoverTrigger>
              <PopoverContent className="p-3 text-center">
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-700 transition duration-300 w-full"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <button
            onClick={() => setopendialog(true)}
            className="px-5 py-3 bg-green-600 text-white rounded-xl shadow-md hover:bg-green-700 transition duration-300 transform hover:scale-105"
          >
            Sign In
          </button>
        )}
      </div>

      {/* Google Sign-In Dialog */}
      <Dialog open={opendialog} onOpenChange={setopendialog}>
        <DialogContent className="bg-white p-6 rounded-lg shadow-xl">
          <DialogHeader>
            <DialogTitle
              className="text-center text-xl font-semibold cursor-pointer hover:text-blue-600 transition duration-300"
              onClick={login}
            >
              Sign In With Google
            </DialogTitle>
            <DialogDescription className="text-center text-gray-500">
              Secure authentication via Google
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col justify-center items-center mt-4">
            <img
              src="/9050014.jpg"
              className="w-32 h-32 rounded-full shadow-lg"
              alt="Google Sign In"
            />
            <button
              onClick={login}
              className="bg-blue-500 px-6 py-3 text-lg rounded-xl mt-5 flex items-center gap-2 text-white shadow-md hover:bg-blue-600 transition duration-300"
            >
              <FcGoogle className="w-7 h-7" /> Sign in with Google
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </nav>
  );
};

export default Navbar;
