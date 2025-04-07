import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BookingDetailsPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // If no booking data is found, navigate back
  if (!state?.booking) {
    return (
      <div className="p-6">
        <h2 className="text-red-500">No booking data found.</h2>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  const booking = state.booking;

  return (
    <div className="p-6 w-full mx-auto bg-white shadow rounded-md">
      {/* Header */}
      <div className="bg-[#1E1E2F] text-white rounded-t-md px-6 py-4 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">
            {booking.trip.city.name} To {booking.trip.to_city.name}
          </h2>
          <p className="text-sm">Booking ID: BW3479858</p>
        </div>
        <div className="text-right">
          <p className="font-bold text-xl">
            Price: {booking.amount}.00 {booking.currency.name}
          </p>
          <p className="text-xs">
            Travel Date: {booking.travel_date} — {booking.trip.arrival_time}
          </p>
        </div>
      </div>

      {/* Operator Info */}
      <div className="p-4 border-b">
        <h3 className="text-md font-semibold mb-2">🧾 Operator Information</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <p>Country: Egypt</p>
          <p>Supplier: Arab Travel Agency</p>
          <p>Operator: Super Jet</p>
          <p>Line Name: VIP Bus-21855</p>
          <p>Line Type: {booking.trip.trip_type}</p>
        </div>
      </div>

      {/* Departure Info */}
      <div className="p-4 bg-orange-100 border-b">
        <h3 className="text-md font-semibold mb-2">🚌 Departure Information</h3>
        <div className="text-sm space-y-1">
          <p>Departure Location: {booking.trip.pickup_station.name}</p>
          <p>Departure Time: {booking.travel_date} — {booking.trip.deputre_time}</p>
          <p>Arrival Location: {booking.trip.dropoff_station.name}</p>
          <p>Arrival Time: {booking.travel_date} — {booking.trip.arrival_time}</p>
        </div>
      </div>

      {/* Passenger Info */}
      <div className="p-4">
        <h3 className="text-md font-semibold mb-2">👤 Passenger Details ({booking.travelers} Passenger)</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <p>Name: {booking.user.name}</p>
          <p>Gender: {booking.user.gender}</p>
          <p>Email: {booking.user.email}</p>
          <p>Phone: {booking.user.phone}</p>
          <p>Country of Residence: {booking.user.country}</p>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsPage;
