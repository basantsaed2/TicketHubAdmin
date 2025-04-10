import React, { useEffect, useState,useRef } from 'react';
import StaticLoader from '../../../../Components/StaticLoader';
import { useGet } from '../../../../Hooks/useGet';
import { usePost } from '../../../../Hooks/usePostJson';
import { useAuth } from '../../../../Context/Auth';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate, useParams } from 'react-router-dom';
import { IoCloudUpload } from 'react-icons/io5';
import Select from 'react-select';

const EditBusesPage = ({ update, setUpdate }) => {
    const { busId } = useParams();
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const { refetch: refetchBusData, loading: loadingBusData, data: BusData } = useGet({ url:`${apiUrl}/agent/bus/item/${busId}` });
    const { refetch: refetchBusList, loading: loadingBusList, data: busList } = useGet({ url: `${apiUrl}/agent/bus` });
    const { postData, loadingPost, response } = usePost({ url: `${apiUrl}/agent/bus/update/${busId}` });
    const auth = useAuth();
    const navigate = useNavigate();
    const ImageRef = useRef();

    const [busType, setBusType] = useState([]);
    const [busAminities, setBusAminities] = useState([]);
    const [selectedBusType, setSelectedBusType] = useState('');
    const [selectedBusAminities, setSelectedBusAminities] = useState('');

    const [busNumber, setBusNumber] = useState('');
    const [busCapacity, setBusCapacity] = useState('');
    const [status, setStatus] = useState('active'); // default status
    const [imageFile, setImageFile] = useState(null); // state for uploaded image
    const [imageName, setImageName] = useState(''); // state for uploaded image name

  useEffect(() => {
    refetchBusList();
  }, [refetchBusList, update]);

  useEffect(() => {
    if (busList && busList.bus_type && busList.aminities) {
      console.log("busList:", busList);
      setBusType(busList.bus_type);
      setBusAminities(busList.aminities);
    }
  }, [busList]);

  useEffect(() => {
    if (BusData && BusData.bus) {
      const bus = BusData.bus;
      setSelectedBusType(bus.bus_type_id || '');
      setBusNumber(bus.bus_number || '');
      setBusCapacity(bus.capacity || '');
      setStatus(bus.status || 'active');
      setImageFile(bus.image_link || '');
      setImageName(bus.bus_image || '');
      if (bus.aminity && Array.isArray(bus.aminity)) {
        setSelectedBusAminities(bus.aminity.map(item => item.id));
      }
    }
    console.log('BusData', BusData);
  }, [BusData]);
  
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

    if (!selectedBusType) {
      auth.toastError('Please Select Type');
      return;
    }

    const data = {
        bus_image:imageFile,
        bus_type_id: selectedBusType,
        aminities: selectedBusAminities,
        capacity: busCapacity,
        bus_number: busNumber,
        status: status,
    };
      postData(data, 'Bus Updated Success');
  };

  const handleReset = () => {
    setSelectedBusType('');
    setSelectedBusAminities('');
    setBusNumber('');
    setBusCapacity('');
    setStatus('available');
    setImageFile(null);
    setImageName('');
     // Reset file input value manually using the ref
    if (ImageRef.current) {
        ImageRef.current.value = '';
    }
  };

  const busOptions = busType.map((type) => ({
    value: type.id,
    label: type.name,
  }));
  
  const AminityOptions = busAminities.map((amenity) => ({
    value: amenity.id,
    label: amenity.name,
  }));

  if (loadingBusList || loadingBusData) {
    return <StaticLoader />;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Type Select */}
        <div className="w-full">
        <label className="block text-gray-700 mb-1">Type</label>
        <Select
            options={busOptions}
            value={busOptions.find(option => option.value === selectedBusType)}
            onChange={(option) => setSelectedBusType(option?.value || '')}
            placeholder="Select Type"
            isClearable
            className="react-select-container w-full rounded-lg focus:outline-none focus:ring-1 focus:ring-mainColor"
            classNamePrefix="react-select"
            styles={{
              control: (provided, state) => ({
                ...provided,
                borderColor: state.isFocused ? '#1E1E2F' : '#e5e7eb', // your mainColor here
                boxShadow: state.isFocused ? '0 0 0 1px #1E1E2F' : 'none',
                '&:hover': {
                  borderColor: '#1E1E2F',
                },
              }),
            }}
          />
        </div>

        {/* Amenities Multi-Select */}
        <div className="w-full">
          <label className="block text-gray-700 mb-1">Amenities</label>
          <Select
            options={AminityOptions}
            value={AminityOptions.filter((option) => selectedBusAminities.includes(option.value))}
            onChange={(selectedOptions) => {
              setSelectedBusAminities(selectedOptions.map((option) => option.value));
            }}
            placeholder="Select Amenities"
            isMulti
            isSearchable
            className="react-select-container w-full"
            classNamePrefix="react-select"
            styles={{
              control: (provided, state) => ({
                ...provided,
                borderColor: state.isFocused ? '#1E1E2F' : '#e5e7eb', // your mainColor here
                boxShadow: state.isFocused ? '0 0 0 1px #1E1E2F' : 'none',
                '&:hover': {
                  borderColor: '#1E1E2F',
                },
              }),
            }}
          />
        </div>
  
        {/* Bus Capacity Input */}
        <div>
          <label className="block text-gray-700 mb-1">Bus Capacity</label>
          <input
            type="number"
            value={busCapacity}
            onChange={(e) => setBusCapacity(e.target.value)}
            placeholder="Enter bus capacity"
            min="1"
            className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-1 focus:ring-mainColor"
          />
        </div>
  
        {/* Bus Number Input */}
        <div>
          <label className="block text-gray-700 mb-1">Bus Number</label>
          <input
            type="text"
            value={busNumber}
            onChange={(e) => setBusNumber(e.target.value)}
            placeholder="Enter bus number"
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
                <label className="text-gray-700 ">Upload Bus Image</label>
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
              <img src={imageFile} alt="Bus" className="mt-2 w-32 h-auto" />
            ) : (
              <img
                src={URL.createObjectURL(imageFile)}
                alt="Bus"
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

export default EditBusesPage;
