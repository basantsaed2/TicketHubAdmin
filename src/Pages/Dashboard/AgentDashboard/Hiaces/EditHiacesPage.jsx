import React, { useEffect, useState,useRef } from 'react';
import StaticLoader from '../../../../Components/StaticLoader';
import { useGet } from '../../../../Hooks/useGet';
import { usePost } from '../../../../Hooks/usePostJson';
import { useAuth } from '../../../../Context/Auth';
import { useNavigate, useParams } from 'react-router-dom';
import { IoCloudUpload } from 'react-icons/io5';

const EditHiacesPage = ({ update, setUpdate }) => {
    const { hiaceId } = useParams();
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const { refetch: refetchHiaceData, loading: loadingHiaceData, data: HiaceData } = useGet({ url:`${apiUrl}/agent/hiace/item/${hiaceId}` });
    const { refetch: refetchHiaceList, loading: loadingHiaceList, data: hiaceList } = useGet({ url: `${apiUrl}/agent/hiace` });
    const { postData, loadingPost, response } = usePost({ url: `${apiUrl}/agent/hiace/update/${hiaceId}` });
    const auth = useAuth();
    const navigate = useNavigate();
    const ImageRef = useRef();

    const [hiaceType, setHiaceType] = useState([]);
    const [hiaceAminities, setHiaceAminities] = useState([]);
    const [selectedHiaceType, setSelectedHiaceType] = useState('');
    const [selectedHiaceAminities, setSelectedHiaceAminities] = useState('');

    const [hiaceNumber, setHiaceNumber] = useState('');
    const [hiaceCapacity, setHiaceCapacity] = useState('');
    const [status, setStatus] = useState('active'); // default status
    const [imageFile, setImageFile] = useState(null); // state for uploaded image
    const [imageName, setImageName] = useState(''); // state for uploaded image name

  useEffect(() => {
    refetchHiaceList();
    refetchHiaceData();
  }, [refetchHiaceList,refetchHiaceData,update]);

  useEffect(() => {
    if (hiaceList && hiaceList.hiace_type && hiaceList.aminities) {
      console.log("hiaceList:", hiaceList);
      setHiaceType(hiaceList.hiace_type);
      setHiaceAminities(hiaceList.aminities);
    }
  }, [hiaceList]);

  useEffect(() => {
    if (HiaceData && HiaceData.hiace) {
      const hiace = HiaceData.hiace;
      setSelectedHiaceType(hiace.bus_type_id || '');
      setHiaceNumber(hiace.bus_number || '');
      setHiaceCapacity(hiace.capacity || '');
      setStatus(hiace.status || 'active');
      setImageFile(hiace.image_link || '');
      setImageName(hiace.bus_image || '');
      if (hiace.aminity && Array.isArray(hiace.aminity)) {
        setSelectedHiaceAminities(hiace.aminity.map(item => item.id));
      }
    }
    console.log('HiaceData', HiaceData);
  }, [HiaceData]);
  
  useEffect(() => {
    if (!loadingPost && response) {
      navigate(-1); // Navigate back only when the response is successful
    }
  }, [loadingPost, response, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
           setImageFile(file);
           setImageName(file.name);
    }
    }; 
    const handleImageClick = (ref) => {
        if (ref.current) {
            ref.current.click();
        }
    };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedHiaceType) {
      auth.toastError('Please Select Type');
      return;
    }

    const data = {
        bus_image:imageFile,
        bus_type_id: selectedHiaceType,
        aminities: selectedHiaceAminities,
        capacity: hiaceCapacity,
        bus_number: hiaceNumber,
        status: status,
    };
      postData(data, 'Hiace Added Success');
  };

  const handleReset = () => {
    setSelectedHiaceType('');
    setSelectedHiaceAminities('');
    setHiaceNumber('');
    setHiaceCapacity('');
    setStatus('available');
    setImageFile(null);
    setImageName('');
     // Reset file input value manually using the ref
    if (ImageRef.current) {
        ImageRef.current.value = '';
    }
  };

  if (loadingHiaceList || loadingHiaceData) {
    return <StaticLoader />;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Type Select */}
        <div>
          <label className="block text-gray-700 mb-1">Type</label>
          <select
            value={selectedHiaceType}
            onChange={(e) => setSelectedHiaceType(e.target.value)}
            className="select select-bordered w-full rounded-lg focus:outline-none focus:ring-1 focus:ring-mainColor"
          >
            <option value="">Select Type</option>
            {hiaceType.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
  
        {/* Amenities Multi-Select */}
        <div className="w-full">
          <label className="block text-gray-700 mb-1">Amenities</label>
          <div className="dropdown w-full">
            {/* Dropdown button with placeholder */}
            <label
              tabIndex="0"
              className="btn btn-bordered w-full flex justify-between items-center rounded-lg focus:outline-none focus:ring-1 focus:ring-mainColor"
            >
              <span
                className={`truncate ${
                  selectedHiaceAminities.length === 0 ? "text-gray-500" : ""
                }`}
              >
                {selectedHiaceAminities.length > 0
                  ? selectedHiaceAminities
                      .map((id) => {
                        const amenity = hiaceAminities.find((a) => a.id === id);
                        return amenity ? amenity.name : "";
                      })
                      .join(", ")
                  : "Select Amenities"}
              </span>
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M7 10l5 5 5-5z" />
              </svg>
            </label>
            {/* Dropdown menu */}
            <ul
              tabIndex="0"
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full max-h-60 overflow-y-auto"
            >
              {hiaceAminities.map((amenity) => (
                <li key={amenity.id}>
                  <label className="cursor-pointer flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedHiaceAminities.includes(amenity.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedHiaceAminities((prev) => [
                            ...prev,
                            amenity.id,
                          ]);
                        } else {
                          setSelectedHiaceAminities((prev) =>
                            prev.filter((id) => id !== amenity.id)
                          );
                        }
                      }}
                      // Set accent color to mainColor (ensure --mainColor is defined in your CSS)
                      style={{ accentColor: "var(--mainColor)" }}
                      className="checkbox"
                    />
                    <span>{amenity.name}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
  
        {/* Hiace Capacity Input */}
        <div>
          <label className="block text-gray-700 mb-1">Hiace Capacity</label>
          <input
            type="number"
            value={hiaceCapacity}
            onChange={(e) => setHiaceCapacity(e.target.value)}
            placeholder="Enter Hiace capacity"
            min="1"
            className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-1 focus:ring-mainColor"
          />
        </div>
  
        {/* Hiace Number Input */}
        <div>
          <label className="block text-gray-700 mb-1">Hiace Number</label>
          <input
            type="text"
            value={hiaceNumber}
            onChange={(e) => setHiaceNumber(e.target.value)}
            placeholder="Enter Hiace number"
            className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-1 focus:ring-mainColor"
          />
        </div>
  
        {/* Status Switch */}
        <div className="flex items-center gap-3 mt-0 md:mt-5">
          <label className="block text-gray-700">Status</label>
          <label className="cursor-pointer label">
            <input
              type="checkbox"
              checked={status === "active"}
              onChange={(e) =>
                setStatus(e.target.checked ? "active" : "inactive")
              }
              className={`toggle ${
                status === "active" ? "bg-mainColor" : "toggle-primary"
              }`}
            />
            <span
              className={`label-text mr-3 ${
                status === "active" ? "text-green-600" : "text-gray-700"
              }`}
            >
              {status}
            </span>
          </label>
        </div>
      </div>
          {/* Image Upload */}
          <div>
          {/* Hidden file input */}
          <div className='w-full md:w-2/6 flex items-center gap-3'>
              <div className='w-full flex flex-col gap-2'>
                <label className="text-gray-700 ">Upload Hiace Image</label>
                <input
                  type="file"
                  ref={ImageRef}
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                {/* Custom upload button */}
                <button
                  type="button"
                  onClick={() => handleImageClick(ImageRef)}
                  className="btn btn-outline w-full flex justify-between items-center rounded-lg shadow-md border-mainColor hover:border-mainColor focus:border-mainColor"
                >
                  <span className="truncate block w-full mr-2">
                    {imageName || "Upload Image"}
                  </span>
                  <IoCloudUpload className="text-xl" />
                </button>
              </div>
          {imageFile &&
            (typeof imageFile === "string" ? (
              <img src={imageFile} alt="Hiace" className="mt-2 w-32 h-auto" />
            ) : (
              <img
                src={URL.createObjectURL(imageFile)}
                alt="Hiace"
                className="mt-2 w-32 h-auto"
              />
            ))}
            </div>
        </div>
  
      {/* Action Buttons */}
      <div className="flex justify-end space-x-2">
        <button
          type="reset"
          onClick={handleReset}
          className="text-white btn btn-md bg-mainColor hover:bg-mainColor/90 border-none focus:outline-none focus:ring-1 focus:ring-mainColor"
        >
          Reset
        </button>
        <button
          type="submit"
          className="text-white btn btn-md bg-mainColor hover:bg-mainColor/90 border-none focus:outline-none focus:ring-1 focus:ring-mainColor"
        >
          Submit
        </button>
      </div>
    </form>
    </div>
  );
};

export default EditHiacesPage;
