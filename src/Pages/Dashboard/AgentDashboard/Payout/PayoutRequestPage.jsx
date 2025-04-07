import React, { useState ,useEffect } from "react";
import { usePost } from "../../../../Hooks/usePostJson";
import { useAuth } from "../../../../Context/Auth";
import StaticLoader from "../../../../Components/StaticLoader";
import { useGet } from '../../../../Hooks/useGet';
import { useNavigate } from 'react-router-dom';

const PayoutRequestPage = ({ update, setUpdate }) => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const { postData, loadingPost, response } = usePost({ url: `${apiUrl}/agent/payout/request` });
  const { refetch: refetchPayout, loading: loadingPayout, data: payoutData } =useGet({ url:`${apiUrl}/agent/payout` });
  const auth = useAuth();
  const [payoutsCurrancy, setPayoutsCurrancy] = useState([])
  const [selectedCurrancy, setSelectedCurrancy] = useState('')
  const [payoutsPaymentMethod, setPayoutsPaymentMethod] = useState([])
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
      refetchPayout();
    }, [refetchPayout, update]);

  useEffect(() => {
      if (payoutData && payoutData.currency) {
              // console.log("car Data:", carData);
              setPayoutsCurrancy(payoutData.currency);
              setPayoutsPaymentMethod(payoutData.payment_methods);
      }
  }, [payoutData]); 

  useEffect(() => {
      if (!loadingPost && response) {
        navigate(-1); // Navigate back only when the response is successful
      }
    }, [loadingPost, response, navigate]);

  const handleReset = () => {
    setAmount('');
    setSelectedCurrancy('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !selectedCurrancy) {
      auth.toastError("Please enter an amount and select a currency");
      return;
    }
    if (!selectedPaymentMethod) {
      auth.toastError("Please select a payment method");
      return;
    }
    const data = {
        currency_id: selectedCurrancy,
        amount: amount,
        description: description,
        payment_method_id: selectedPaymentMethod,
    };
    await postData(data, "Payout request submitted successfully");
  };

  // Optionally show a loader if your post hook is loading
  if (loadingPayout || loadingPost) return <StaticLoader />;

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Description Input */}
          <div>
            <label className="block text-gray-700 mb-1">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter Description"
              className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-1 focus:ring-mainColor"
            />
          </div>
          {/* Amount Input */}
          <div>
            <label className="block text-gray-700 mb-1">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              min="1"
              className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-1 focus:ring-mainColor"
            />
          </div>
          {/* Currency Select */}
          <div>
            <label className="block text-gray-700 mb-1">Currency</label>
            <select
              value={selectedCurrancy}
              onChange={(e) => setSelectedCurrancy(e.target.value)}
              className="select select-bordered w-full rounded-lg focus:outline-none focus:ring-1 focus:ring-mainColor"
            >
              <option value="">Select Currency</option>
              {payoutsCurrancy.map((currency) => (
                <option key={currency.id} value={currency.id}>
                  {currency.name}
                </option>
              ))}
            </select>
          </div>
           {/* PaymentMethod Select */}
           <div>
            <label className="block text-gray-700 mb-1">Payment Method</label>
            <select
              value={selectedPaymentMethod}
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              className="select select-bordered w-full rounded-lg focus:outline-none focus:ring-1 focus:ring-mainColor"
            >
              <option value="">Select Payment Method</option>
              {payoutsPaymentMethod.map((method) => (
                <option key={method.id} value={method.id}>
                  {method.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Action Button */}
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

export default PayoutRequestPage;
