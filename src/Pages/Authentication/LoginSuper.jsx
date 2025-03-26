import React, { useState ,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from 'react-toastify';
import { useAuth } from '../../Context/Auth';
import Loading from '../../Components/Loading';
import MainImage from'../../Assets/Images/MainImage.png'
import { usePost } from '../../Hooks/usePostJson';
import axios from 'axios';
import bgButton from "../../Assets/Images/bgButton.png";
const LoginSuper = () => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const [userData, setUserData] = useState('');
    const [userType, setUserType] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const auth = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

   useEffect(() => {
    if (userData) {
           console.log('Calling auth.login with data:', userData);
           auth.login(userData);
           setIsLoading(false);

            if (userType === "admin") {
                  navigate("/dashboard_admin", { replace: true });
           }
            else{
              navigate("/", { replace: true });     
     }
    }
  }, [userData]);     
 
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!email) {
      auth.toastError('Please Enter the Email.');
      return;
    }
    if (!password) {
      auth.toastError('Please Enter the Password.');
      return;
    }
  
    // Set loading state to true when submission begins
    setIsLoading(true);
  
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
  
    try {
      const response = await axios.post(`${apiUrl}/api/login`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 200 || response.status === 201) {
        console.log('Response:', response.data);
        const userData = {
          ...response.data.user,
          roles: [response.data.user.role],
        };
        setUserData(userData);
        setUserType(response.data.user.role);
        console.log("response role", response.data.user.role);
        // You can set isLoading to false here, but if your useEffect already handles it on userData update, it's optional.
        setIsLoading(false);
      } else {
        toast.error('Unexpected error occurred during login.');
        setIsLoading(false);
      }
    } catch (error) {
      if (error?.response?.data?.errors === "The provided credentials are incorrect") {
        toast.error("Email or Password is incorrect");
      } else {
        console.error('Error submitting form:', error);
        toast.error(error?.response?.data?.error || 'Network error');
      }
      setIsLoading(false);
    }
  };
  
  return (
    <div className="sign-up-page flex flex-col items-center justify-center lg:justify-around w-full xl:h-screen lg:h-full text-secoundColor">

         <div className='w-full flex flex-col-reverse md:flex-row items-center lg:justify-around w-full'>
            <div className="xl:w-1/2 h-screen flex flex-col w-full justify-center bg-white rounded-lg p-6">
              {/* Welcome Back Header */}
              <h2 className="text-3xl text-black font-bold">Welcome Back 👋</h2>
              <p className="text-fourthColormt-2 mb-6">Login To Your Account</p>

              {/* Form */}
              <form className="w-full xl:w-3/4" onSubmit={handleSubmit}>
                <section className="flex flex-col gap-5">
                  {/* Email Input */}
                  <div className="w-full">
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="text-black text-lg input input-bordered w-full border-secoundColor focus:outline-none focus:ring-2 focus:ring-secoundColor transition-all duration-200"
                    />
                  </div>

                  {/* Password Input with Eye Icon */}
                  <div className="w-full relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="text-black text-lg input input-bordered w-full border-secoundColor focus:outline-none focus:ring-2 focus:ring-secoundColor pr-10 transition-all duration-200"
                    />
                    {/* Eye Icon */}
                    <span
                      className="absolute top-3 right-4 text-gray-500 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                    </span>
                  </div>

                  {/* Login Button */}
                  <button
                    type="submit"
                    className="btn btn-lg w-full text-white transform transition-all duration-150 hover:scale-105 active:scale-95"
                    style={{
                      backgroundImage: `url(${bgButton})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    {isLoading ? "Loading..." : "Login"}
                  </button>

                  {/* Sign Up Link */}
                  <p className="text-gray-600 text-center">
                    Don't have an account?{" "}
                    <Link to="/auth/sign_up" className="text-orange-500 font-semibold hover:underline">
                      Sign Up
                    </Link>
                  </p>
                </section>
              </form>

            </div>

            <div className="xl:w-1/2 w-full md:flex justify-center hidden">
            <img src={MainImage} className='h-screen w-full'/>
            </div>
        </div>
  
    </div>
  );
};

export default LoginSuper;

