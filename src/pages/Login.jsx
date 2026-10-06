import React, { useContext, useState } from 'react'
import {   Link,useNavigate } from 'react-router-dom';
import { LoaderCircle } from "lucide-react";
import { assets } from './../assets/assets';
import Input from '../components/TakeInput';
import axiosConfig from '../util/axiosConfig';
import { validateEmail } from '../util/validate';
import { API_ENDPOINTS } from '../util/apiEndPoints';
import { AppContext } from '../context/AppContext';

const Login = () => {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
 const {user, setUser} = useContext(AppContext);


  const navigate = useNavigate();

  const handleSubmit =async(e) =>{
    e.preventDefault();
     setIsLoading(true);

    // basic validation

    if (!validateEmail(email)) {
          setError("Please enter your valid email address");
          setIsLoading(false);
          return;
        }
    
        if (!password.trim()) {
          setError("Please enter your password");
          setIsLoading(false);
          return;
        }
    
        setError("");

        //Login api call
        try {
        const response = await axiosConfig.post(API_ENDPOINTS.LOGIN, {
            email,
            password,
        });
        const {token,user} = response.data;
        if (token) {
          localStorage.setItem("token", token);
          setUser(user);
          navigate("/dashboard");
        }
        } catch (error) {
          if(error.response && error.response.data.message){
              setError(error.response.data.message);
          } else{
            console.error("something went wrong",error);
            setError(error.message);
          }
          
        } finally{
          setIsLoading(false);
        }
  }

      return (
    <div className='h-screen w-full relative flex items-center justify-center overflow-hidden'>
      {/* Background image with blur*/}
      {/* <img src={assets.login_bg} alt="Background" className='absolute inset-0 w-full h-full object-cover filter blur-sm' /> */}

      <div className='relative z-10 w-full max-w-lg px-6'>

        <div className='bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl p-8 max-h-[90vh] overflow-y-auto'>
          <h3 className='text-2xl font-semibold text-black text-center mb-2'>
            Welcome Back
          </h3>
          <p className='text-sm text-slate-700 text-center mb-8'>
            Please enter your details to login in.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
                          

              <Input type="text"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)} 
                     label = "Email Address"
                     placeholder='name@example.com'
              />

              
                <Input type="password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)} 
                     label = "Password"
                     placeholder='********'
              />
              
            

            {error && (
              <p className='text-red-800 text-sm text-center bg-red-50 p-2 rounded'>
                {error}
              </p>
            )}

            <button disabled={isLoading} className={`bg-purple-700 hover:bg-purple-800 rounded-lg text-white w-full py-3 text-lg font-medium flex items-center-safe justify-center-safe gap-2 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`} type="submit">
              {isLoading ? (
                  <>
                      <LoaderCircle className='animate-spin w-5 h-5'/>
                       Logining in...
                       </>
                       ) : ("LOGIN")}
            </button>
              
            <p className='text-sm text-slate-800 text-center mt-6'>
              Don't have an account?
              <Link to="/signup" className='font-medium text-primary underline hover:text-primary-dark transition-colors'>Signup</Link>
            </p>
            
          </form>
        </div>

      </div>
    </div>
  )
}

export default Login