import React, { useState ,useEffect } from "react";
import { usePost } from "../../../../Hooks/usePostJson";
import { useAuth } from "../../../../Context/Auth";
import StaticLoader from "../../../../Components/StaticLoader";
import { useGet } from '../../../../Hooks/useGet';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import AcceptPayment from '../../../../Assets/Images/AcceptPayment.png'
import Error from '../../../../Assets/Images/Error.png'

const PayoutRequestPage = ({ update, setUpdate }) => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const { postData, loadingPost, response ,error} = usePost({ url: `${apiUrl}/agent/payout/request` });
  const { refetch: refetchPayout, loading: loadingPayout, data: payoutData } =useGet({ url:`${apiUrl}/agent/payout` });
  const auth = useAuth();
  const [payoutsCurrancy, setPayoutsCurrancy] = useState([])
  const [selectedCurrancy, setSelectedCurrancy] = useState('')
  const [payoutsPaymentMethod, setPayoutsPaymentMethod] = useState([])
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  
  const location = useLocation();
  const wallet = location.state?.wallet;

  useEffect(() => {
      refetchPayout();
      console.log('wallet',wallet)
    }, [refetchPayout, update]);

  useEffect(() => {
      if (payoutData && payoutData.currency) {
              // console.log("car Data:", carData);
              setPayoutsCurrancy(payoutData.currency);
              setPayoutsPaymentMethod(payoutData.payment_methods);
      }
  }, [payoutData]); 


useEffect(() => {
    // Check when loading is complete and response or error is set
    if (!loadingPost && response) {
        console.log("reer", response);
        setIsSuccess(true);
        handleReset();
        // Set interval for navigation (e.g., 500ms delay for demo)
        const interval = setInterval(() => {
            navigate(-1);
            clearInterval(interval); 
        }, 500);
    } else if (!loadingPost && error) {
        setIsError(true);
        handleReset();
        const interval = setInterval(() => {
            setIsError(false); 
            clearInterval(interval); 
        }, 3000);
    }
}, [loadingPost, response, error, navigate]); // Dependency array includes the necessary states and navigate


  const handleReset = () => {
    setAmount('');
    setDescription('')
    setSelectedPaymentMethod('')
    // setIsSuccess(false)
    // setIsError(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount) {
      auth.toastError("Please enter an amount");
      return;
    }
    if (!selectedPaymentMethod) {
      auth.toastError("Please select a payment method");
      return;
    }
    const data = {
        currency_id: wallet.currency_id,
        amount: amount,
        description: description,
        payment_method_id: selectedPaymentMethod,
    };
    await postData(data, "Payout request submitted successfully");
  };

  // Optionally show a loader if your post hook is loading
  if (loadingPayout || loadingPost) return <StaticLoader />;

  return (
    <div className="p-2 md:p-6">

      <div className="w-full flex flex-col gap-5 mb-5">
        <div className="w-full py-6 px-6 flex itrms-center bg-mainColor rounded-lg text-white text-xl md:text-2xl">
            <h1>Wallet Balance: <span className="font-semibold">{wallet.total} {wallet.currency?.name}</span></h1>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="py-6 px-6 flex itrms-center bg-[#FDE9D7] rounded-lg text-secoundColor">
              <h1 className="text-lg">Due Amount: <span className="font-semibold text-xl">{wallet.amount} {wallet.currency?.name}</span></h1>
          </div>

          <div className="py-6 px-6 flex itrms-center bg-[#FDE9D7] rounded-lg text-secoundColor">
              <h1 className="text-lg">Pending Amount: <span className="font-semibold text-xl">{wallet.pending_amount} {wallet.currency?.name}</span></h1>
          </div>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 p-4 md:p-6 bg-white rounded-lg shadow-lg">
          {/* Left Side - Form */}
          <form
            onSubmit={handleSubmit}
            className="w-full space-y-6"
          >
            {/* Header and Available Amount */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">Payout Request</h2>
              <p className="text-gray-600 mt-1">
                Available For Payout: <span className="text-2xl font-bold text-orange-500">{wallet?.amount || '0'} {wallet.currency?.name || '-'}</span>
              </p>
            </div>

            {/* Amount and Description */}
            <div className="w-full gap-4">
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter Amount"
                min="1"
                className="input input-bordered text-lg w-full py-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* Payment Method */}
            <div>
          <p className="text-xl font-bold text-[#1A1A1A] mb-4">
            Select Payment Method
          </p>
          <div className="space-y-2">
            {payoutsPaymentMethod.map((method) => {
              const isSelected = selectedPaymentMethod === method.id;

              return (
                <label
                  key={method.id}
                  htmlFor={`method-${method.id}`}
                  className={`
                    flex items-center gap-3 
                    h-10 w-full px-4 
                    cursor-pointer 
                    ${isSelected ? 'bg-[#FDE6D2] rounded-lg' : ''}
                  `}
                >
                  {/* custom radio icon */}
                  <span
                    className={`
                      flex-shrink-0 w-4 h-4 
                      ${isSelected
                        ? 'bg-[#F47100] rounded-full'
                        : 'border-2 border-[#F47100] rounded-full'}
                    `}
                  />

                  {/* visually‑hidden native input */}
                  <input
                    id={`method-${method.id}`}
                    type="radio"
                    name="paymentMethod"
                    value={method.id}
                    checked={isSelected}
                    onChange={() => setSelectedPaymentMethod(method.id)}
                    className="sr-only"
                  />

                  {/* label text */}
                  <span className="text-base font-medium text-[#1A1A1A]">
                    {method.name}
                  </span>
                </label>
              );
            })}
          </div>
            </div>

            {
              selectedPaymentMethod && (
                <div className="w-full gap-4">
                <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter Payment Method Description"
                className="input input-bordered w-full rounded-lg py-6 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              </div>
              )
            }

            {/* Buttons */}
            <div className="w-full pt-4 flex justify-between">
              <button
                type="reset"
                onClick={handleReset}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
              >
                Reset
              </button>
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition"
              >
                Payout Request
              </button>
            </div>
          </form>

          {(isError || isSuccess )&& (
          <div className="w-full p-6 lg:hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="relative bg-white p-4 rounded-lg">
              <button
                onClick={() => {
                  setIsSuccess(false);  // Reset success state
                  setIsError(false);    // Close the error state
                }}
                className="absolute top-2 right-2 text-black text-3xl"
              >
                ×
              </button>
              {/* Show content based on success or error */}
              {isSuccess && (
                <div className="flex flex-col items-center">
                  <img
                    src={AcceptPayment}
                    alt="Payment Accepted"
                    className="max-w-full h-auto"
                  />
                  <p className="text-center mt-4">Payment Accepted</p>
                </div>
              )}
              {isError && !isSuccess && (
                <div className="flex flex-col items-center">
                  <img
                    src={Error}
                    alt="Payment Error"
                    className="max-w-full h-auto"
                  />
                  <p className="text-center mt-4">Payment Error</p>
                </div>
              )}
            </div>
          </div>
          )}


        {/* Regular flex container for large screens */}
        <div className="w-full hidden lg:flex items-center justify-center">
          {isSuccess && (
            <img
              src={AcceptPayment}
              alt="Payment Accepted"
              className="max-w-full h-auto"
            />
          )}
          {isError && (
            <img
              src={Error}
              alt="Payment Error"
              className="max-w-full h-auto"
            />
          )}
        </div>
    </div>
    </div>
  );
};

export default PayoutRequestPage;
