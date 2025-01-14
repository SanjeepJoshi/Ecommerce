import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderHistory from "../components/OrderHistory";
import Wishlist from "../components/Wishlist";
import { editProfile, getUserById } from "../apiCalls/userApi";
import { API } from "../config";

const Profile = () => {
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [editFormData, setEditFormData] = useState({
    username: "",
    phone: "",
    address: "",
    profileImage: null,
  });

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    const user = jwt ? JSON.parse(jwt).user : null;
    if (user) {
      getUserById(user.id)
        .then((data) => {
          if (!data.error) {
            setUserData(data);
            setEditFormData({
              username: data.username || "",
              phone: data.phone || "",
              address: data.address || "",
            });

            const imageUrl = data.profileImage 
              ? `${API}/profileImages/${data.profileImage}` 
              : "/defaultProfile.png";
            setProfileImagePreview(imageUrl);
          }
        })
        .catch((err) => console.error("Error fetching user data:", err));
    }
  }, [isEditModalOpen]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditFormData((prev) => ({ ...prev, profileImage: file }));
      const reader = new FileReader();
      reader.onloadend = () => setProfileImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("username", editFormData.username);
    formData.append("phone", editFormData.phone);
    formData.append("address", editFormData.address);

    if (editFormData.profileImage) {
      formData.append("profileImage", editFormData.profileImage);
    }

    try {
      const response = await editProfile(userData._id, formData);
      if (response.error) {
        alert(`Error: ${response.error}`);
      } else {
        alert("Profile updated successfully!");
        setUserData({ ...userData, ...response.data });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating the profile.");
    } finally {
      setIsEditModalOpen(false);
    }
  };

  const handleModalClose = () => {
    setEditFormData({
      username: userData.username || "",
      phone: userData.phone || "",
      address: userData.address || "",
      profileImage: null,
    });
    setProfileImagePreview(null);
    setIsEditModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Profile Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full sm:w-2/3 md:w-9/12 mx-auto flex items-center gap-6">
        {/* Profile Image */}
        <div className="flex-shrink-0 w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200">
          <img
            src={
              profileImagePreview ||
              (userData.profileImage && `${API}/profileImages/${userData.profileImage}`) ||
              "https://via.placeholder.com/150"
            }
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* User Info */}
        <div className="flex-grow">
          <h1 className="text-xl font-semibold text-gray-800">{userData.username || "N/A"}</h1>
          <p className="text-gray-600">{userData.email || "N/A"}</p>
          <p className="mt-2 text-sm text-gray-700">
            <span className="font-semibold">Phone:</span> {userData.phone || "N/A"}
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Address:</span> {userData.address || "N/A"}
          </p>
        </div>

        {/* Edit Button */}
        <div className="flex flex-col space-y-2">
        <button
          className="bg-blue-500 text-white py-2 px-2 rounded hover:bg-blue-600"
          onClick={() => setIsEditModalOpen(true)}
        >
          Edit Profile
        </button>
        <button
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
          
        >
          Change Password
        </button>
        </div>
      </div>

      {/* Order History and Wishlist */}
      <div className="mt-8">
        <OrderHistory />
        <Wishlist />
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold text-center mb-4">Edit Profile</h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4">
                  <img
                    src={profileImagePreview || "https://via.placeholder.com/150"}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
                />
              </div>
              <input
                type="text"
                name="username"
                value={editFormData.username}
                onChange={handleEditChange}
                placeholder="Username"
                className="w-full border rounded-md py-2 px-3"
              />
              <input
                type="text"
                name="phone"
                value={editFormData.phone}
                onChange={handleEditChange}
                placeholder="Phone Number"
                className="w-full border rounded-md py-2 px-3"
              />
              <input
                type="text"
                name="address"
                value={editFormData.address}
                onChange={handleEditChange}
                placeholder="Address"
                className="w-full border rounded-md py-2 px-3"
              />
              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
