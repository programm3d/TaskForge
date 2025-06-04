// src/components/Profile/Profile.js
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import toast from "react-hot-toast";
import {
  UserCircleIcon,
  KeyIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

const Profile = () => {
  const { user, logout } = useAuth();
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    try {
      await api.put("/user/change-password", {
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
      });
      toast.success("Password changed successfully!");
      setShowChangePassword(false);
      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to change password");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await api.delete("/user/delete");
      toast.success("Account deleted successfully");
      logout();
    } catch (error) {
      toast.error("Failed to delete account");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Profile Settings
      </h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center mb-6">
          <UserCircleIcon className="h-16 w-16 text-gray-400" />
          <div className="ml-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {user?.username || "User"}
            </h2>
            <p className="text-gray-600">Manage your account settings</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="border-t pt-4">
            <button
              onClick={() => setShowChangePassword(!showChangePassword)}
              className="flex items-center text-primary-600 hover:text-primary-700"
            >
              <KeyIcon className="h-5 w-5 mr-2" />
              Change Password
            </button>

            {showChangePassword && (
              <form
                onSubmit={handleChangePassword}
                className="mt-4 space-y-4 max-w-md"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Current Password
                  </label>
                  <input
                    type="password"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    value={passwordData.oldPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        oldPassword: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <input
                    type="password"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        newPassword: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition duration-200"
                  >
                    Update Password
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowChangePassword(false);
                      setPasswordData({
                        oldPassword: "",
                        newPassword: "",
                        confirmPassword: "",
                      });
                    }}
                    className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="border-t pt-4">
            <h3 className="text-lg font-medium text-red-600 mb-2">
              Danger Zone
            </h3>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center text-red-600 hover:text-red-700"
            >
              <TrashIcon className="h-5 w-5 mr-2" />
              Delete Account
            </button>

            {showDeleteConfirm && (
              <div className="mt-4 p-4 border border-red-300 rounded-md bg-red-50">
                <p className="text-sm text-red-800 mb-4">
                  Are you sure you want to delete your account? This action
                  cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={handleDeleteAccount}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-200"
                  >
                    Yes, Delete My Account
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
