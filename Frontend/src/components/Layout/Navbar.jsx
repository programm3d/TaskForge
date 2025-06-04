// src/components/Layout/Navbar.js - Update the dashboard link
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/app/dashboard" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary-600">
              TaskForge
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link
              to="/app/profile"
              className="flex items-center space-x-1 text-gray-700 hover:text-primary-600"
            >
              <UserCircleIcon className="h-6 w-6" />
              <span>Profile</span>
            </Link>
            <button
              onClick={logout}
              className="flex items-center space-x-1 text-gray-700 hover:text-red-600"
            >
              <ArrowRightOnRectangleIcon className="h-6 w-6" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
