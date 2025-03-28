import React, { useEffect, useState, useRef } from 'react'; 
import StaticLoader from '../../../../Components/StaticLoader';
import { useGet } from '../../../../Hooks/useGet';
import { usePost } from '../../../../Hooks/usePostJson';
import { useAuth } from '../../../../Context/Auth';
import { useNavigate } from 'react-router-dom';
import { IoCloudUpload } from 'react-icons/io5';

const AddTripsPage = ({ update, setUpdate }) => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const { refetch: refetchTripList, loading: loadingTripList, data: tripList } = useGet({ url: `${apiUrl}/agent/trip` });
  const { postData, loadingPost, response } = usePost({ url: `${apiUrl}/agent/trip/add` });
  const auth = useAuth();
  const navigate = useNavigate();

  // Drop-down data (populated from tripList)
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [stations, setStations] = useState([]);
  const [zones, setZones] = useState([]);
  const [buses, setBuses] = useState([]);
  const [currencies, setCurrencies] = useState([]);

  // Hardcoded options for some selects/switches
  const tripTypes = [
    { id: "hiace", name: "Hiace" },
    { id: "bus", name: "Bus" },
    { id: "train", name: "Train" },
  ];
  const typeOptions = [
    { id: "limited", name: "Limited" },
    { id: "unlimited", name: "Unlimited" },
  ];

  // Form state – keys as required by endpoint
  const [tripName, setTripName] = useState('');
  const [busId, setBusId] = useState('');
  const [pickupStationId, setPickupStationId] = useState('');
  const [dropoffStationId, setDropoffStationId] = useState('');
  const [cityId, setCityId] = useState('');
  const [zoneId, setZoneId] = useState('');
  const [deputreTime, setDeputreTime] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [avalibleSeats, setAvalibleSeats] = useState('');
  const [countryId, setCountryId] = useState('');
  const [toCountryId, setToCountryId] = useState('');
  const [toCityId, setToCityId] = useState('');
  const [toZoneId, setToZoneId] = useState('');
  const [date, setDate] = useState('');
  const [price, setPrice] = useState('');
  const [maxBookDate, setMaxBookDate] = useState('');
  const [type, setType] = useState('unlimited'); // limited or unlimited
  const [fixedDate, setFixedDate] = useState('');
  const [cancellationPolicy, setCancellationPolicy] = useState('');
  // Using a switch for cancelation_pay_amount: true means "fixed", false means "percentage"
  const [cancelationPayAmountFixed, setCancelationPayAmountFixed] = useState(true);
  const [cancelationPayValue, setCancelationPayValue] = useState('');
  const [minCost, setMinCost] = useState('');
  const [tripType, setTripType] = useState('hiace'); // hiace, bus, train
  const [currencyId, setCurrencyId] = useState('');
  const [cancelationDate, setCancelationDate] = useState('');
  // Overall trip status: using a switch (active/inactive)
  const [status, setStatus] = useState('active');

  useEffect(() => {
    refetchTripList();
  }, [refetchTripList, update]);

  useEffect(() => {
    if (tripList && tripList.countries && tripList.cities && tripList.stations && tripList.zones && tripList.buses && tripList.currency) {
      console.log("tripList:", tripList);
      setCountries(tripList.countries);
      setCities(tripList.cities);
      setStations(tripList.stations);
      setZones(tripList.zones);
      setBuses(tripList.buses);
      setCurrencies(tripList.currency);
    }
  }, [tripList]);

  useEffect(() => {
    if (!loadingPost && response) {
      navigate(-1);
    }
  }, [loadingPost, response, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      trip_name: tripName,
      trip_type: tripType, // "hiace", "bus", "train"
      bus_id: busId,
      pickup_station_id: pickupStationId,
      dropoff_station_id: dropoffStationId,
      avalible_seats: avalibleSeats,
      country_id: countryId,
      city_id: cityId,
      zone_id: zoneId,
      to_country_id: toCountryId,
      to_city_id: toCityId,
      to_zone_id: toZoneId,
      date: date,
      deputre_time: deputreTime,
      arrival_time: arrivalTime,
      max_book_date: maxBookDate,
      type: type, // "limited" or "unlimited"
      fixed_date: fixedDate,
      price: price,
      min_cost: minCost,
      currency_id: currencyId,
      cancellation_policy: cancellationPolicy,
      cancelation_pay_amount: cancelationPayAmountFixed ? "fixed" : "percentage",
      cancelation_pay_value: cancelationPayValue,
      cancelation_date: cancelationDate,
      status: status, // "active" or "inactive"
    };

    // Optionally, you could handle image file upload here if needed.
    postData(data, 'Trip Added Success');
  };

  const handleReset = () => {
    setTripName('');
    setBusId('');
    setPickupStationId('');
    setDropoffStationId('');
    setCityId('');
    setZoneId('');
    setDeputreTime('');
    setArrivalTime('');
    setAvalibleSeats('');
    setCountryId('');
    setToCountryId('');
    setToCityId('');
    setToZoneId('');
    setDate('');
    setPrice('');
    setStatus('active');
    setMaxBookDate('');
    setType('unlimited');
    setFixedDate('');
    setCancellationPolicy('');
    setCancelationPayAmountFixed(true);
    setCancelationPayValue('');
    setMinCost('');
    setTripType('hiace');
    setCurrencyId('');
    setCancelationDate('');
  };

  if (loadingTripList) {
    return <StaticLoader />;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section: Trip Information */}
        <div className="border p-4 rounded-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Trip Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Trip Name</label>
              <input
                type="text"
                value={tripName}
                onChange={(e) => setTripName(e.target.value)}
                placeholder="Enter trip name"
                className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-1 focus:ring-mainColor"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Trip Type</label>
              <select
                value={tripType}
                onChange={(e) => setTripType(e.target.value)}
                className="select select-bordered w-full rounded-lg focus:outline-none focus:ring-1 focus:ring-mainColor"
              >
                {tripTypes.map((option) => (
                  <option key={option.id} value={option.id}>{option.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Section: Bus & Station Information */}
        <div className="border p-4 rounded-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Bus & Station Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Select Bus</label>
              <select
                value={busId}
                onChange={(e) => setBusId(e.target.value)}
                className="select select-bordered w-full rounded-lg focus:outline-none focus:ring-1 focus:ring-mainColor"
              >
                <option value="">Select Bus</option>
                {buses.map((bus) => (
                  <option key={bus.id} value={bus.id}>{bus.bus_number}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Pickup Station</label>
              <select
                value={pickupStationId}
                onChange={(e) => setPickupStationId(e.target.value)}
                className="select select-bordered w-full rounded-lg focus:outline-none focus:ring-1 focus:ring-mainColor"
              >
                <option value="">Select Pickup Station</option>
                {stations.map((station) => (
                  <option key={station.id} value={station.id}>{station.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Dropoff Station</label>
              <select
                value={dropoffStationId}
                onChange={(e) => setDropoffStationId(e.target.value)}
                className="select select-bordered w-full rounded-lg focus:outline-none focus:ring-1 focus:ring-mainColor"
              >
                <option value="">Select Dropoff Station</option>
                {stations.map((station) => (
                  <option key={station.id} value={station.id}>{station.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Available Seats</label>
              <input
                type="number"
                value={avalibleSeats}
                onChange={(e) => setAvalibleSeats(e.target.value)}
                placeholder="Enter available seats"
                min="1"
                className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-1 focus:ring-mainColor"
              />
            </div>
          </div>
        </div>

        {/* Section: Location Information */}
        <div className="border p-4 rounded-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Location Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Country (From)</label>
              <select
                value={countryId}
                onChange={(e) => setCountryId(e.target.value)}
                className="select select-bordered w-full rounded-lg focus:outline-none focus:ring-1 focus:ring-mainColor"
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country.id} value={country.id}>{country.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-1">City (From)</label>
              <select
                value={cityId}
                onChange={(e) => setCityId(e.target.value)}
                className="select select-bordered w-full rounded-lg focus:outline-none focus:ring-1 focus:ring-mainColor"
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>{city.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Zone (From)</label>
              <select
                value={zoneId}
                onChange={(e) => setZoneId(e.target.value)}
                className="select select-bordered w-full rounded-lg focus:outline-none focus:ring-1 focus:ring-mainColor"
              >
                <option value="">Select Zone</option>
                {zones.map((zone) => (
                  <option key={zone.id} value={zone.id}>{zone.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-1">To Country</label>
              <select
                value={toCountryId}
                onChange={(e) => setToCountryId(e.target.value)}
                className="select select-bordered w-full rounded-lg focus:outline-none focus:ring-1 focus:ring-mainColor"
              >
                <option value="">Select To Country</option>
                {countries.map((country) => (
                  <option key={country.id} value={country.id}>{country.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-1">To City</label>
              <select
                value={toCityId}
                onChange={(e) => setToCityId(e.target.value)}
                className="select select-bordered w-full rounded-lg focus:outline-none focus:ring-1 focus:ring-mainColor"
              >
                <option value="">Select To City</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>{city.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-1">To Zone</label>
              <select
                value={toZoneId}
                onChange={(e) => setToZoneId(e.target.value)}
                className="select select-bordered w-full rounded-lg focus:outline-none focus:ring-1 focus:ring-mainColor"
              >
                <option value="">Select To Zone</option>
                {zones.map((zone) => (
                  <option key={zone.id} value={zone.id}>{zone.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

       {/* Section: Schedule */}
        <div className="border p-4 rounded-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Schedule</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Date</label>
              <input
                type="date"
                value={date}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setDate(e.target.value)}
                className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-1 focus:ring-mainColor"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Departure Time</label>
              <input
                type="time"
                value={deputreTime}
                onChange={(e) => setDeputreTime(e.target.value)}
                className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-1 focus:ring-mainColor"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Arrival Time</label>
              <input
                type="time"
                value={arrivalTime}
                onChange={(e) => setArrivalTime(e.target.value)}
                className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-1 focus:ring-mainColor"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Max Book Date</label>
              <input
                type="date"
                value={maxBookDate}
                min={new Date().toISOString().split("T")[0]} 
                onChange={(e) => setMaxBookDate(e.target.value)}
                className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-1 focus:ring-mainColor"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="select select-bordered w-full rounded-lg focus:outline-none focus:ring-1 focus:ring-mainColor"
              >
                {typeOptions.map((option) => (
                  <option key={option.id} value={option.id}>{option.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Fixed Date</label>
              <input
                type="date"
                value={fixedDate}
                min={new Date().toISOString().split("T")[0]} 
                onChange={(e) => setFixedDate(e.target.value)}
                className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-1 focus:ring-mainColor"
              />
            </div>
          </div>
        </div>

        {/* Section: Pricing & Cancellation */}
        <div className="border p-4 rounded-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Pricing & Cancellation</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
                className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-1 focus:ring-mainColor"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Minimum Cost</label>
              <input
                type="number"
                value={minCost}
                onChange={(e) => setMinCost(e.target.value)}
                placeholder="Enter minimum cost"
                className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-1 focus:ring-mainColor"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Currency</label>
              <select
                value={currencyId}
                onChange={(e) => setCurrencyId(e.target.value)}
                className="select select-bordered w-full rounded-lg focus:outline-none focus:ring-1 focus:ring-mainColor"
              >
                <option value="">Select Currency</option>
                {currencies.map((currency) => (
                  <option key={currency.id} value={currency.id}>{currency.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Cancelation Date</label>
              <input
                type="date"
                min={new Date().toISOString().split("T")[0]} 
                value={cancelationDate}
                onChange={(e) => setCancelationDate(e.target.value)}
                className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-1 focus:ring-mainColor"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="block text-gray-700">Cancelation Pay Amount</label>
              <label className="cursor-pointer flex items-center">
                <span className="mr-2">{cancelationPayAmountFixed ? "Fixed" : "Percentage"}</span>
                <input
                  type="checkbox"
                  checked={cancelationPayAmountFixed}
                  onChange={(e) => setCancelationPayAmountFixed(e.target.checked)}
                  className="toggle toggle-primary"
                />
              </label>
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Cancelation Pay Value</label>
              <input
                type="number"
                value={cancelationPayValue}
                onChange={(e) => setCancelationPayValue(e.target.value)}
                placeholder="Enter cancelation pay value"
                className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-1 focus:ring-mainColor"
              />
            </div>
          </div>
          <div>
              <label className="block text-gray-700 mt-3">Cancellation Policy</label>
              <input
                type="text"
                value={cancellationPolicy}
                onChange={(e) => setCancellationPolicy(e.target.value)}
                placeholder="Enter cancellation policy"
                className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-1 focus:ring-mainColor"
              />
            </div>
        </div>

        {/* Section: Overall Status & Image */}
        <div className="border p-4 rounded-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Status Switch */}
            <div className="flex items-center gap-3">
              <label className="block text-gray-700">Status</label>
              <label className="cursor-pointer label">
                <input
                  type="checkbox"
                  checked={status === "active"}
                  onChange={(e) => setStatus(e.target.checked ? "active" : "inactive")}
                  className={`toggle ${status === "active" ? "bg-mainColor" : "toggle-primary"}`}
                />
                <span className={`label-text ml-2 ${status === "active" ? "text-green-600" : "text-gray-700"}`}>
                  {status}
                </span>
              </label>
            </div>
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

export default AddTripsPage;
