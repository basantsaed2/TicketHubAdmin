import React, { useEffect, useState,useRef } from 'react';
import StaticLoader from '../../../../Components/StaticLoader';
import { useGet } from '../../../../Hooks/useGet';
import { usePost } from '../../../../Hooks/usePostJson';
import { useAuth } from '../../../../Context/Auth';
import { useNavigate, useParams } from 'react-router-dom';
import { IoCloudUpload } from 'react-icons/io5';
import Select from 'react-select';

const EditTripsPage = ({ update, setUpdate }) => {
  const { tripId } = useParams();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const { refetch: refetchTripData, loading: loadingTripData, data: TripData } = useGet({ url:`${apiUrl}/agent/trip/item/${tripId}` });
  const { refetch: refetchTripList, loading: loadingTripList, data: tripList } = useGet({ url: `${apiUrl}/agent/trip` });
  const { postData, loadingPost, response } = usePost({ url: `${apiUrl}/agent/trip/update/${tripId}` });
  const auth = useAuth();
  const navigate = useNavigate();

  // Drop-down data (populated from tripList)
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [stations, setStations] = useState([]);
  const [zones, setZones] = useState([]);
  const [buses, setBuses] = useState([]);
  const [trains, setTrains] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [hiaces, setHiaces] = useState([]);

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
  const [scheduleType, setScheduleType] = useState("one_time");
    const [selectedDay, setSelectedDay] = useState([]); // State for selected days
  
    const [selectedDays, setSelectedDays] = useState([]); // State for selected days
    
      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
      // Map days of the week to the format that react-select expects
      const dayOptions = daysOfWeek.map((day) => ({
        value: day,
        label: day,
      }));
       // Handle change when days are selected (allowing multiple selections)
  const handleDayChange = (selectedOptions) => {
    setSelectedDays(selectedOptions ? selectedOptions.map(option => option.value) : []); // Update selected days
  };

  // Form state – keys as required by endpoint
  const [tripName, setTripName] = useState('');
  const [busId, setBusId] = useState('');
  const [trainId, setTrainId] = useState('');
  const [hiaceId, setHiaceId] = useState('');
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
  const [startDate, setStartDate] = useState("");
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
    refetchTripData();
  }, [refetchTripList, update]);

  useEffect(() => {
    if (tripList && tripList.countries && tripList.cities && tripList.stations && tripList.zones && tripList.buses && tripList.currency) {
      console.log("tripList:", tripList);
      setCountries(tripList.countries);
      setCities(tripList.cities);
      setStations(tripList.stations);
      setZones(tripList.zones);
      setBuses(tripList.buses);
      setTrains(tripList.trains);
      setCurrencies(tripList.currency);
      setHiaces(tripList.hiaces)
    }
  }, [tripList]);

  useEffect(() => {
    // Populate form fields when TripData is available
    if (TripData?.trip) {
      const trip = TripData.trip;
      setTripName(trip.trip_name || '');
      setTripType(trip.trip_type || 'hiace');
      setBusId(trip.bus_id || '');
      setTrainId(trip.train_id || '');
      setHiaceId(trip.bus_id || '');
      setPickupStationId(trip.pickup_station_id || '');
      setDropoffStationId(trip.dropoff_station_id || '');
      setAvalibleSeats(trip.avalible_seats || '');
      setCountryId(trip.country_id || '');
      setCityId(trip.city_id || '');
      setZoneId(trip.zone_id || '');
      setToCountryId(trip.to_country_id || '');
      setToCityId(trip.to_city_id || '');
      setToZoneId(trip.to_zone_id || '');
      // setDate(trip.date || '');
      setDeputreTime(trip.deputre_time || '');
      setArrivalTime(trip.arrival_time || '');
      setMaxBookDate(trip.max_book_date || '');
      // setType(trip.type || 'unlimited');
      // setFixedDate(trip.fixed_date || '');
      setPrice(trip.price || '');
      setMinCost(trip.min_cost || '');
      setCurrencyId(trip.currency_id || '');
      setCancellationPolicy(trip.cancellation_policy || '');
      setCancelationPayAmountFixed(trip.cancelation_pay_amount === 'fixed');
      setCancelationPayValue(trip.cancelation_pay_value || '');
      setCancelationDate(trip.cancelation_hours || '');
      setStatus(trip.status || 'active');

      if(trip.date){
        setDate(trip.date || '');
        setScheduleType("one_time")
      }
      else {
        setScheduleType("recurrent")
        if (trip.start_date && trip.fixed_date){
          setStartDate(trip.start_date)
          setFixedDate(trip.fixed_date)
          setType('limited');
          setSelectedDay(trip.days)
        }else { 
          setStartDate(trip.start_date)
          setType('unlimited');
          setSelectedDay(trip.days)
        }
      }
    }
  }, [TripData]);

  useEffect(() => {
    if (!loadingPost && response) {
      navigate(-1);
    }
  }, [loadingPost, response, navigate]);

  const formatTime = (time) => {
    const date = new Date(`1970-01-01T${time}Z`);
    return date.toISOString().substring(11, 16); // Extract "HH:mm" format
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Format the times to match HH:mm
    const formattedDeputreTime = formatTime(deputreTime);
    const formattedArrivalTime = formatTime(arrivalTime);
  
    // Prepare the base data
    let data = {
      trip_name: tripName,
      trip_type: tripType, // "hiace", "bus", "train"
      bus_id: busId || hiaceId,
      train_id: trainId,
      pickup_station_id: pickupStationId,
      dropoff_station_id: dropoffStationId,
      avalible_seats: avalibleSeats,
      country_id: countryId,
      city_id: cityId,
      zone_id: zoneId,
      to_country_id: toCountryId,
      to_city_id: toCityId,
      to_zone_id: toZoneId,
      deputre_time: formattedDeputreTime,
      arrival_time: formattedArrivalTime,
      max_book_date: maxBookDate,
      price: price,
      min_cost: minCost,
      currency_id: currencyId,
      cancellation_policy: cancellationPolicy,
      cancelation_pay_amount: cancelationPayAmountFixed ? "fixed" : "percentage",
      cancelation_pay_value: cancelationPayValue,
      cancelation_hours: cancelationDate,
      status: status, // "active" or "inactive"
    };
  
    // Add condition for `scheduleType`
    if (scheduleType === "one_time") {
      // For one-time schedule, send only the `date`.
      data = {
        ...data,
        date: date,
      };
    } else if (scheduleType === "recurrent" && type === "limited") {
      // For recurring and limited, send `start_date` and `fixed_date`.
      data = {
        ...data,
        type: "limited", // "limited" or "unlimited"
        days: selectedDays, // Send selected days as an array
        start_date: startDate, // Assuming `date` is the start date for recurring schedule
        fixed_date: fixedDate, // Fixed end date for limited recurring schedule
      };
    } else if (scheduleType === "recurrent" && type === "unlimited") {
      // For recurring and unlimited, send only the `start_date`.
      data = {
        ...data,
        days: selectedDays, // Send selected days as an array
        type: "unlimited",
        start_date: startDate, // Assuming `date` is the start date for recurring schedules
      };
    }
  
    // Post the data (e.g., API call)
    postData(data, 'Trip Added Success');
  };  

  const handleReset = () => {
    setTripName('');
    setBusId('');
    setTrainId('');
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
    setScheduleType('one_time')
    setType('unlimited');
    setSelectedDays('')
    setStartDate('')
    setFixedDate('');
    setCancellationPolicy('');
    setCancelationPayAmountFixed(true);
    setCancelationPayValue('');
    setMinCost('');
    setTripType('hiace');
    setCurrencyId('');
    setCancelationDate('');
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? '#1E1E2F' : '#e5e7eb',
      boxShadow: state.isFocused ? '0 0 0 1px #1E1E2F' : 'none',
      '&:hover': {
        borderColor: '#1E1E2F',
      },
    }),
  };

  if (loadingTripList || loadingTripData) {
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
            <h2 className="text-xl font-bold text-gray-800 mb-4">PickUp & DropOff Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  
              {tripType === "bus" && (
                <div>
                  <label className="block text-gray-700 mb-1">Select Bus</label>
                  <Select
                    options={buses.map((bus) => ({
                      value: bus.id,
                      label: bus.bus_number,
                    }))}
                    value={busId ? { value: busId, label: buses.find((b) => b.id === busId)?.bus_number } : null}
                    onChange={(option) => setBusId(option?.value || '')}
                    placeholder="Select Bus"
                    isClearable
                    classNamePrefix="react-select"
                    styles={customStyles}
                  />
                </div>
              )}
  
              {tripType === "train" && (
                <div>
                  <label className="block text-gray-700 mb-1">Select Train</label>
                  <Select
                    options={trains.map((train) => ({
                      value: train.id,
                      label: train.name,
                    }))}
                    value={trainId ? { value: trainId, label: trains.find((t) => t.id === trainId)?.name } : null}
                    onChange={(option) => setTrainId(option?.value || '')}
                    placeholder="Select Train"
                    isClearable
                    classNamePrefix="react-select"
                    styles={customStyles}
                  />
                </div>
              )}
  
              {tripType === "hiace" && (
                <div>
                  <label className="block text-gray-700 mb-1">Select Hiace</label>
                  <Select
                    options={hiaces.map((hiace) => ({
                      value: hiace.id,
                      label: hiace.bus_type?.name,
                    }))}
                    value={hiaceId ? { value: hiaceId, label: hiaces.find((h) => h.id === hiaceId)?.bus_type?.name } : null}
                    onChange={(option) => setHiaceId(option?.value || '')}
                    placeholder="Select Hiace"
                    isClearable
                    classNamePrefix="react-select"
                    styles={customStyles}
                  />
                </div>
              )}
  
              <div>
                <label className="block text-gray-700 mb-1">Pickup Station</label>
                <Select
                  options={stations.map((station) => ({
                    value: station.id,
                    label: station.name,
                  }))}
                  value={pickupStationId ? { value: pickupStationId, label: stations.find((s) => s.id === pickupStationId)?.name } : null}
                  onChange={(option) => setPickupStationId(option?.value || '')}
                  placeholder="Select Pickup Station"
                  isClearable
                  classNamePrefix="react-select"
                  styles={customStyles}
                />
              </div>
  
              <div>
                <label className="block text-gray-700 mb-1">Dropoff Station</label>
                <Select
                  options={stations.map((station) => ({
                    value: station.id,
                    label: station.name,
                  }))}
                  value={dropoffStationId ? { value: dropoffStationId, label: stations.find((s) => s.id === dropoffStationId)?.name } : null}
                  onChange={(option) => setDropoffStationId(option?.value || '')}
                  placeholder="Select Dropoff Station"
                  isClearable
                  classNamePrefix="react-select"
                  styles={customStyles}
                />
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
                <Select
                  options={countries.map(country => ({
                    value: country.id,
                    label: country.name
                  }))}
                  value={countryId ? { value: countryId, label: countries.find(c => c.id === countryId)?.name } : null}
                  onChange={option => setCountryId(option?.value || '')}
                  placeholder="Select Country"
                  isClearable
                  classNamePrefix="react-select"
                  styles={customStyles}
                />
              </div>
  
              <div>
                <label className="block text-gray-700 mb-1">City (From)</label>
                <Select
                  options={cities.map(city => ({
                    value: city.id,
                    label: city.name
                  }))}
                  value={cityId ? { value: cityId, label: cities.find(c => c.id === cityId)?.name } : null}
                  onChange={option => setCityId(option?.value || '')}
                  placeholder="Select City"
                  isClearable
                  classNamePrefix="react-select"
                  styles={customStyles}
                />
              </div>
  
              <div>
                <label className="block text-gray-700 mb-1">Zone (From)</label>
                <Select
                  options={zones.map(zone => ({
                    value: zone.id,
                    label: zone.name
                  }))}
                  value={zoneId ? { value: zoneId, label: zones.find(z => z.id === zoneId)?.name } : null}
                  onChange={option => setZoneId(option?.value || '')}
                  placeholder="Select Zone"
                  isClearable
                  classNamePrefix="react-select"
                  styles={customStyles}
                />
              </div>
  
              <div>
                <label className="block text-gray-700 mb-1">To Country</label>
                <Select
                  options={countries.map(country => ({
                    value: country.id,
                    label: country.name
                  }))}
                  value={toCountryId ? { value: toCountryId, label: countries.find(c => c.id === toCountryId)?.name } : null}
                  onChange={option => setToCountryId(option?.value || '')}
                  placeholder="Select To Country"
                  isClearable
                  classNamePrefix="react-select"
                  styles={customStyles}
                />
              </div>
  
              <div>
                <label className="block text-gray-700 mb-1">To City</label>
                <Select
                  options={cities.map(city => ({
                    value: city.id,
                    label: city.name
                  }))}
                  value={toCityId ? { value: toCityId, label: cities.find(c => c.id === toCityId)?.name } : null}
                  onChange={option => setToCityId(option?.value || '')}
                  placeholder="Select To City"
                  isClearable
                  classNamePrefix="react-select"
                  styles={customStyles}
                />
              </div>
  
              <div>
                <label className="block text-gray-700 mb-1">To Zone</label>
                <Select
                  options={zones.map(zone => ({
                    value: zone.id,
                    label: zone.name
                  }))}
                  value={toZoneId ? { value: toZoneId, label: zones.find(z => z.id === toZoneId)?.name } : null}
                  onChange={option => setToZoneId(option?.value || '')}
                  placeholder="Select To Zone"
                  isClearable
                  classNamePrefix="react-select"
                  styles={customStyles}
                />
              </div>
  
            </div>
          </div>
  
         {/* Section: Schedule */}
         <div className="border p-4 rounded-lg">
    <h2 className="text-xl font-bold text-gray-800 mb-4">Schedule</h2>
  
    {/* Radio: Schedule Type */}
    <div className="mb-4 flex items-center gap-6">
      <label className="text-gray-700 font-medium">Schedule Type:</label>
      <label className="flex items-center gap-2">
        <input
          type="radio"
          value="one_time"
          checked={scheduleType === "one_time"}
          onChange={(e) => setScheduleType(e.target.value)}
        />
        One Time
      </label>
      <label className="flex items-center gap-2">
        <input
          type="radio"
          value="recurrent"
          checked={scheduleType === "recurrent"}
          onChange={(e) => setScheduleType(e.target.value)}
        />
        Recurrent
      </label>
    </div>
  
    {/* One Time Fields */}
    {scheduleType === "one_time" && (
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
            type="number"
            placeholder="Enter Max Book Day"
            value={maxBookDate}
            min={1}
            onChange={(e) => setMaxBookDate(e.target.value)}
            className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-1 focus:ring-mainColor"
          />
        </div>
      </div>
    )}
  
    {/* Recurrent Fields */}
    {scheduleType === "recurrent" && (
      <>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 mb-1">Recurrent Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="select select-bordered w-full rounded-lg focus:outline-none focus:ring-1 focus:ring-mainColor"
            >
              {typeOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Start Date</label>
            <input
              type="date"
              value={startDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setStartDate(e.target.value)}
              className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-1 focus:ring-mainColor"
            />
          </div>
          {type === "limited" && (
            <div>
              <label className="block text-gray-700 mb-1">Fixed Date</label>
              <input
                type="date"
                value={fixedDate}
                min={startDate || new Date().toISOString().split("T")[0]}
                onChange={(e) => setFixedDate(e.target.value)}
                className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-1 focus:ring-mainColor"
              />
            </div>
          )}
            {/* Days of the Week Selection */}
            <div>
          <label className="block text-gray-700 mb-1">Select Days</label>
          <Select
            options={dayOptions} // Options for the days
            value={dayOptions.filter(option => selectedDays.includes(option.value))} // Display the selected days
            onChange={handleDayChange} // Update selected days
            placeholder="Select Days"
            isMulti // Enable multi-select
            classNamePrefix="react-select"
            styles={customStyles} // Custom styles (if defined)
          />
        </div>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              type="number"
              placeholder="Enter Max Book Day"
              value={maxBookDate}
              min={1}
              onChange={(e) => setMaxBookDate(e.target.value)}
              className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-1 focus:ring-mainColor"
            />
          </div>
        </div>
      </>
    )}
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
              <label className="block text-gray-700 mb-1">Select Currency</label>
              <Select
                options={currencies.map((currency) => ({
                  value: currency.id,
                  label: currency.name,
                }))}
                value={
                  currencyId
                    ? { value: currencyId, label: currencies.find((c) => c.id === currencyId)?.name }
                    : null
                }
                onChange={(option) => setCurrencyId(option?.value || '')}
                placeholder="Select Currency"
                isClearable
                classNamePrefix="react-select"
                styles={customStyles}
              />
            </div>
  
              <div>
              <label className="block text-gray-700 mb-1">Cancelation Hours</label>
                <input
                  type="number"
                  placeholder="Enter cancellation hours"
                  value={cancelationDate}
                  onChange={(e) => setCancelationDate(e.target.value)}
                  className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-1 focus:ring-mainColor"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="block text-gray-700 mb-1">Cancelation Pay Amount</label>
                <label className="cursor-pointer flex items-center mt-3">
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

export default EditTripsPage;
