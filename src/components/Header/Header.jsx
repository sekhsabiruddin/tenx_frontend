import React from "react";
import { RiLogoutBoxLine } from "react-icons/ri";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { server } from "../../server";
const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Replace with your actual logout API endpoint
      const response = await axios.post(
        `${server}/user/logout`,
        {},
        { withCredentials: true }
      );

      // Handle successful logout
      console.log("Logged out successfully");
      navigate("/"); // Navigate to the login page
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-teal-500 shadow-md">
      <header className="flex justify-between items-center p-4">
        <div>
          <h1 className="text-2xl text-white font-bold tracking-wide">
            Shopping .
          </h1>
        </div>
        <div
          className="cursor-pointer text-white hover:text-gray-200"
          onClick={handleLogout}
        >
          <RiLogoutBoxLine size={24} />
        </div>
      </header>
    </div>
  );
};

export default Header;
