import React, { useEffect, useState,useRef } from 'react';
import StaticLoader from '../../../../Components/StaticLoader';
import { useGet } from '../../../../Hooks/useGet';
import { usePost } from '../../../../Hooks/usePostJson';
import { useAuth } from '../../../../Context/Auth';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import { IoCloudUpload } from 'react-icons/io5';

const AddCarPage = ({ update, setUpdate }) => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const { refetch: refetchCarList, loading: loadingCarList, data: carList } = useGet({ url: `${apiUrl}/agent/car` });
    const { postData, loadingPost, response } = usePost({ url: `${apiUrl}/agent/car/add` });
    const auth = useAuth();
    const navigate = useNavigate();
    const ImageRef = useRef();

    const [carBrand, setCarBrand] = useState([]);
    const [carCategory, setCarCategory] = useState([]);
    const [carModel, setCarModel] = useState([]);

    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [carColor, setCarColor] = useState('');
    const [carYear, setCarYear] = useState(new Date());
    const [carNumber, setCarNumber] = useState('');
    const [status, setStatus] = useState('available'); // default status
    const [imageFile, setImageFile] = useState(null); // state for uploaded image
    const [imageName, setImageName] = useState(''); // state for uploaded image name

  useEffect(() => {
    refetchCarList();
  }, [refetchCarList, update]);

  useEffect(() => {
    if (carList && carList.brands && carList.category && carList.car_models) {
      console.log("carList:", carList);
      setCarBrand(carList.brands);
      setCarCategory(carList.category);
      setCarModel(carList.car_models);
    }
  }, [carList]);

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

    if (!selectedBrand) {
      auth.toastError('Please Select Brand');
      return;
    }
    if (!selectedCategory) {
      auth.toastError('Please Select Category');
      return;
    }
    if (!selectedModel) {
      auth.toastError('Please Select Model');
      return;
    }

    const data = {
        image:imageFile,
        brand_id: selectedBrand,
        category_id: selectedCategory,
        model_id: selectedModel,
        car_color: carColor,
        car_year: carYear, // You might want to format the year as needed (e.g., carYear.getFullYear())
        car_number: carNumber,
        status: status,
    };

    // If an image file is selected, convert it to a Base64 string
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        data.image_link = reader.result; // reader.result contains the Base64 encoded image
        postData(data, 'Car Added Success');
      };
      reader.readAsDataURL(imageFile);
    } else {
      postData(data, 'Car Added Success');
    }
  };

  const handleReset = () => {
    setSelectedBrand('');
    setSelectedCategory('');
    setSelectedModel('');
    setCarColor('');
    setCarYear(new Date());
    setCarNumber('');
    setStatus('available');
    setImageFile(null);
    setImageName('');
     // Reset file input value manually using the ref
    if (ImageRef.current) {
        ImageRef.current.value = '';
    }
  };

  if (loadingCarList) {
    return <StaticLoader />;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Brand Select */}
          <div>
            <label className="block text-gray-700 mb-1">Brand</label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="select select-bordered w-full rounded-lg focus:outline-none focus:ring-1 focus:ring-mainColor"
            >
              <option value=''>
                Select Brand
              </option>
              {carBrand.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>
          {/* Category Select */}
          <div>
            <label className="block text-gray-700 mb-1">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="select select-bordered w-full rounded-lg focus:outline-none focus:ring-1 focus:ring-mainColor"
            >
              <option value="">
                Select Category
              </option>
              {carCategory.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          {/* Model Select */}
          <div>
            <label className="block text-gray-700 mb-1">Model</label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="select select-bordered w-full rounded-lg focus:outline-none focus:ring-1 focus:ring-mainColor"
            >
              <option value="">
                Select Model
              </option>
              {carModel.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.name}
                </option>
              ))}
            </select>
          </div>
          {/* Car Color Input */}
          <div>
            <label className="block text-gray-700 mb-1">Car Color</label>
            <input
              type="text"
              value={carColor}
              onChange={(e) => setCarColor(e.target.value)}
              placeholder="Enter car color"
              className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-1 focus:ring-mainColor"
            />
          </div>
          {/* Car Year Picker */}
          <div className="w-full">
            <label className="block text-gray-700 mb-1">Car Year</label>
            <DatePicker
              selected={carYear}
              onChange={(date) => setCarYear(date)}
              showYearPicker
              dateFormat="yyyy"
              placeholderText="Select Year"
              className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-1 focus:ring-mainColor"
              wrapperClassName="w-full"
            />
          </div>
          {/* Car Number Input */}
          <div>
            <label className="block text-gray-700 mb-1">Car Number</label>
            <input
              type="text"
              value={carNumber}
              onChange={(e) => setCarNumber(e.target.value)}
              placeholder="Enter car number"
              className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-1 focus:ring-mainColor"
            />
          </div>
          {/* Image Upload */}
            <div>
            <label className="block text-gray-700 mb-1">Upload Car Image</label>
            {/* Hidden file input */}
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
                className="btn btn-outline w-full flex justify-between items-center shadow-md border-mainColor hover:border-mainColor focus:border-mainColor"
            >
                <span className="truncate block w-full mr-2">
                {imageName || "Upload Image"}
                </span>
                <IoCloudUpload className="text-xl" />
            </button>
            {imageFile && (
                // Check if imageFile is a URL (string) or a File object, and display accordingly
                typeof imageFile === 'string' ? (
                <img src={imageFile} alt="Car" className="mt-2 w-32 h-auto" />
                ) : (
                <img
                    src={URL.createObjectURL(imageFile)}
                    alt="Car"
                    className="mt-2 w-32 h-auto"
                />
                )
            )}
            </div>
            {/* Status Switch */}
            <div className='flex items-center gap-3 mt-0 md:mt-5'>
            <label className="block text-gray-700">Status</label>
                <label className="cursor-pointer label">
                    <input
                    type="checkbox"
                    checked={status === "available"}
                    onChange={(e) => setStatus(e.target.checked ? "available" : "busy")}
                    className={`toggle ${status === "available" ? "bg-mainColor" : "toggle-primary"}`}
                    />
                    <span className={`label-text mr-3 ${status === "available" ? "text-green-600" : "text-gray-700"}`}>
                    {status}
                    </span>
                </label>
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

export default AddCarPage;
