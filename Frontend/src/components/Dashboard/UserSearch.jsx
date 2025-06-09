import React, { useState, useEffect } from "react";
import { XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import api from "../../services/api";
import toast from "react-hot-toast";

const UserSearch = ({ onClose, onAssign, currentAssignees }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState(currentAssignees);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        searchUsers();
      } else {
        setUsers([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const searchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/user/search?username=${searchTerm}`);
      setUsers(response.data);
    } catch (error) {
      toast.error("Failed to search users");
    } finally {
      setLoading(false);
    }
  };

  const toggleUserSelection = (username) => {
    setSelectedUsers((prev) =>
      prev.includes(username)
        ? prev.filter((u) => u !== username)
        : [...prev, username]
    );
  };

  const handleAssign = () => {
    onAssign(selectedUsers);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Assign Users</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="mb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Search users by username..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-4 max-h-60 overflow-y-auto">
          {loading ? (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
            </div>
          ) : users.length > 0 ? (
            <div className="space-y-2">
              {users.map((user) => (
                <label
                  key={user._id}
                  className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    checked={selectedUsers.includes(user.username)}
                    onChange={() => toggleUserSelection(user.username)}
                  />
                  <span className="ml-2 text-gray-700">{user.username}</span>
                </label>
              ))}
            </div>
          ) : searchTerm ? (
            <p className="text-center text-gray-500 py-4">No users found</p>
          ) : (
            <p className="text-center text-gray-500 py-4">
              Start typing to search users
            </p>
          )}
        </div>

        {selectedUsers.length > 0 && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Selected users:</p>
            <div className="flex flex-wrap gap-2">
              {selectedUsers.map((username) => (
                <span
                  key={username}
                  className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-primary-100 text-primary-700"
                >
                  {username}
                  <button
                    onClick={() => toggleUserSelection(username)}
                    className="ml-1 text-primary-600 hover:text-primary-800"
                  >
                    <XMarkIcon className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={handleAssign}
            disabled={selectedUsers.length === 0}
            className={`flex-1 px-4 py-2 rounded-md transition duration-200 ${
              selectedUsers.length === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-primary-600 text-white hover:bg-primary-700"
            }`}
          >
            Assign {selectedUsers.length > 0 && `(${selectedUsers.length})`}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSearch;
