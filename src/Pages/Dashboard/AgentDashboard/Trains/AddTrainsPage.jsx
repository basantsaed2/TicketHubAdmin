import React, { useEffect, useState,useRef } from 'react';
import StaticLoader from '../../../../Components/StaticLoader';
import { useGet } from '../../../../Hooks/useGet';
import { usePost } from '../../../../Hooks/usePostJson';
import { useAuth } from '../../../../Context/Auth';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

const AddTrainsPage = ({ update, setUpdate }) => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const { refetch: refetchTrainList, loading: loadingTrainList, data: trainList } = useGet({ url: `${apiUrl}/agent/train` });
    const { postData, loadingPost, response } = usePost({ url: `${apiUrl}/agent/train/add` });
    const auth = useAuth();
    const navigate = useNavigate();

    const [trainTypes, setTrainTypes] = useState([]);
    const [trainClasses, setTrainClasses] = useState([]);
    const [trainRoutes, setTrainRoutes] = useState([]);
    const [countries, setCountries] = useState([]);

    const [selectedTrainType, setSelectedTrainType] = useState('');
    const [selectedTrainClass, setSelectedTrainClass] = useState('');
    const [selectedTrainRoute, setSelectedTrainRoute] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');

    const [trainName, setTrainName] = useState('');
    const [status, setStatus] = useState('active'); // default status

  useEffect(() => {
    refetchTrainList();
  }, [refetchTrainList, update]);

  useEffect(() => {
    if (trainList && trainList.classes && trainList.train_types && trainList.routes && trainList.countries) {
      console.log("TrainList:", trainList);
      setTrainTypes(trainList.train_types);
      setTrainClasses(trainList.classes);
      setTrainRoutes(trainList.routes);
      setCountries(trainList.countries);
    }
  }, [trainList]);

  useEffect(() => {
    if (!loadingPost && response) {
      navigate(-1); // Navigate back only when the response is successful
    }
  }, [loadingPost, response, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedTrainClass) {
      auth.toastError('Please Select Class');
      return;
    }

    if (!selectedTrainRoute) {
      auth.toastError('Please Select Route');
      return;
    }

    if (!selectedTrainType) {
      auth.toastError('Please Select Type');
      return;
    }

    if (!selectedCountry) {
      auth.toastError('Please Select Country');
      return;
    }

    const data = {
      name: trainName,
      type_id: selectedTrainType,
      class_id: selectedTrainClass,
      country_id: selectedCountry,
      route_id:selectedTrainRoute,
      status: status === "active"? 1 : 0,
    };
      postData(data, 'Train Added Success');
  };

  const handleReset = () => {
    setTrainName('');
    setSelectedCountry('');
    setSelectedTrainClass('');
    setSelectedTrainRoute('');
    setSelectedTrainType('');
    setStatus('active')
  };

  const typeOptions = trainTypes.map((type) => ({
    value: type.id,
    label: type.name,
  }));

  const classOptions = trainClasses.map((trainclass) => ({
    value: trainclass.id,
    label: trainclass.name,
  }));
  
  const countriesOptions = countries.map((country) => ({
    value: country.id,
    label: country.name,
  }));

  const routesOptions = trainRoutes.map((route) => ({
    value: route.id,
    label: route.name,
  }));

  if (loadingTrainList) {
    return <StaticLoader />;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        {/* Train Name Input */}
        <div>
          <label className="block text-gray-700 mb-1">Train Name</label>
          <input
            type="text"
            value={trainName}
            onChange={(e) => setTrainName(e.target.value)}
            placeholder="Enter train name"
            className="input input-bordered w-full rounded-md focus:outline-none focus:ring-1 focus:ring-mainColor"
          />
        </div>

        {/* Type Select */}
        <div className="w-full">
        <label className="block text-gray-700 mb-1">Train Type</label>
        <Select
            options={typeOptions}
            value={typeOptions.find(option => option.value === selectedTrainType)}
            onChange={(option) => setSelectedTrainType(option?.value || '')}
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

        {/* Class Select */}
        <div className="w-full">
        <label className="block text-gray-700 mb-1">Train Class</label>
        <Select
            options={classOptions}
            value={classOptions.find(option => option.value === selectedTrainClass)}
            onChange={(option) => setSelectedTrainClass(option?.value || '')}
            placeholder="Select Class"
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

        {/* Country Select */}
        <div className="w-full">
        <label className="block text-gray-700 mb-1">Train Country</label>
        <Select
            options={countriesOptions}
            value={countriesOptions.find(option => option.value === selectedCountry)}
            onChange={(option) => setSelectedCountry(option?.value || '')}
            placeholder="Select Country"
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

        {/* Route Select */}
        <div className="w-full">
        <label className="block text-gray-700 mb-1">Train Route</label>
        <Select
            options={routesOptions}
            value={routesOptions.find(option => option.value === selectedTrainRoute)}
            onChange={(option) => setSelectedTrainRoute(option?.value || '')}
            placeholder="Select Route"
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

export default AddTrainsPage;
