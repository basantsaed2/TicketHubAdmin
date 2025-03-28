import React, { useEffect, useState } from "react";
import StaticLoader from "../../../../Components/StaticLoader";
import { useGet } from "../../../../Hooks/useGet";
import { usePost } from "../../../../Hooks/usePostJson";
import { IoCloudUploadOutline } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { useAuth } from '../../../../Context/Auth';
import { useNavigate } from "react-router-dom";
const AgentProfilePage = ({ update, setUpdate }) => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const { refetch: refetchProfile, loading: loadingProfile, data: profileData } = useGet({
    url: `${apiUrl}/agent/profile`,
  });
  const { postData, loadingPost,response } = usePost({ url: `${apiUrl}/agent/profile/update` });
    const auth = useAuth();
    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    // password: "",
    image_link: null,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    refetchProfile();
  }, [refetchProfile, update]);

  useEffect(() => {
    if (profileData?.agent) {
      setFormData({
        name: profileData.agent.name || "",
        email: profileData.agent.email || "",
        phone: profileData.agent.phone || "",
        // password: null,
        image_link: null,
      });
    }
  }, [profileData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (!loadingPost && response) {
      if (response.status === 200) {
        setIsModalOpen(false);
        setUpdate((prev) => !prev);
      } else if (response.data.error.message?.password) {
        auth.toastError(response.data.error.message.password[0]);
      } else {
        auth.toastError("Something went wrong. Please try again.");
      }
    }
  }, [loadingPost, response, navigate]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    postData(formData,"Profile updated successfully!");
  };

  if (loadingProfile || loadingPost) {
    return <StaticLoader />;
  }

  return (
    <div className="w-full bg-gradient-to-r from-[#1E1E2F] to-[#29293D] text-white p-6 rounded-xl shadow-lg">
      {/* Profile Header */}
      <div className="flex items-center space-x-6">
        {/* Profile Image */}
        <div className="w-28 h-28 bg-gray-600 rounded-full overflow-hidden border-4 border-[#F58220] shadow-lg">
          <img
            src={profileData?.agent?.image_link || "https://via.placeholder.com/100"}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Profile Info */}
        <div>
          <h2 className="text-3xl font-semibold">{profileData?.agent?.name || "Agent"}</h2>
          <p className="text-gray-300">{profileData?.agent?.email || "No Email Provided"}</p>
          <p className="text-gray-300">Points: {profileData?.agent?.points || "0"}</p>
          <p className="text-gray-300">Phone: {profileData?.agent?.phone || "No Phone"}</p>
          <span className="bg-[#F58220] text-[#1E1E2F] px-4 py-1 rounded-full text-sm font-semibold mt-3 inline-block">
            {profileData?.agent?.role?.toUpperCase() || "ROLE"}
          </span>
        </div>
      </div>

      {/* Edit Profile Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-6 flex items-center gap-2 px-5 py-2 bg-[#F58220] text-[#1E1E2F] font-semibold rounded-full shadow-md hover:bg-opacity-90 transition duration-200"
      >
        <FiEdit size={18} /> Edit Profile
      </button>

      {/* Edit Profile Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#1E1E2F] text-white p-6 rounded-lg shadow-2xl w-96">
            {/* Modal Header */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Edit Profile</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-red-500">
                <AiOutlineClose size={20} />
              </button>
            </div>
            
            {/* Edit Form */}
            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-[#F58220]"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-[#F58220]"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-[#F58220]"
                />
              </div>

              {/* Password */}
              {/* <div>
                <label className="block text-sm font-medium">New Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-[#F58220]"
                />
              </div> */}

              {/* Upload Image */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer text-[#F58220]">
                  <IoCloudUploadOutline size={24} />
                  <input type="file" className="hidden" />
                  Upload Image
                </label>
                {formData.image_link && <span className="text-green-400">Image Selected</span>}
              </div>

              {/* Save Changes Button */}
              <button
                type="submit"
                className="w-full bg-[#F58220] text-[#1E1E2F] font-bold px-5 py-2 rounded-full hover:bg-opacity-90 transition duration-200"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentProfilePage;
