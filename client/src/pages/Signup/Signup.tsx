import { useNavigate } from "react-router-dom";
import singinImg from "../../assets/signinImg.png";
import "./Signup.css";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { signup } from "../../service/authService";
import Loader from "../../components/Loader/Loader";
import { reset } from "../../features/authSlice";

export default function Signup() {
     const navigate = useNavigate();
     const [error, setError] = useState("");
     const { user, isLoading, isSuccess, isError, errorMessage } =
          useAppSelector((state) => state.auth);
     const dispatch = useAppDispatch();
     const [userData, setUser] = useState({
          email: "",
          password: "",
     });

     useEffect(() => {
          if (isError) {
               setError(errorMessage);
          }
          dispatch(reset());
     }, [isError, dispatch, isSuccess, errorMessage]);

     function handleSubmit() {
          if (userData.email && userData.password.length >= 6) {
               console.log(userData);
               dispatch(signup(userData));
          }
     }

     useEffect(() => {
          if (user) {
               navigate("/");
          }
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [user]);

     function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
          const { value, name } = e.target;
          setUser({ ...userData, [name]: value });
     }
     return (
          <>
               {isLoading ? (
                    <Loader />
               ) : (
                    <div className="grid grid-cols-12">
                         <div className="left-section hidden h-screen sm:col-span-7 sm:flex justify-center items-center">
                              <img
                                   src={singinImg}
                                   alt="img"
                                   className="w-1/2"
                              />
                         </div>
                         <div className="left-section h-screen col-span-12 sm:col-span-5 bg-white">
                              <div className="form flex flex-col justify-center items-center h-full">
                                   <h1 className="text-2xl font-medium mb-20">
                                        Signup to your Account
                                   </h1>
                                   {error && (
                                        <span className="text-red-700 text-sm w-72 mb-2">
                                             {error}
                                        </span>
                                   )}
                                   <div className="form-group flex flex-col mb-5">
                                        <label htmlFor="">Email</label>
                                        <input
                                             type="email"
                                             name="email"
                                             className="input-box py-1 ps-5"
                                             placeholder="email"
                                             onChange={handleChange}
                                        />
                                   </div>
                                   <div className="form-group flex flex-col">
                                        <label htmlFor="">Password</label>
                                        <input
                                             type="password"
                                             name="password"
                                             className="input-box py-1 ps-5"
                                             placeholder="Password"
                                             onChange={handleChange}
                                        />
                                   </div>

                                   <button
                                        className="bg-secondary text-white py-2 px-4 rounded-md mt-5"
                                        onClick={handleSubmit}
                                   >
                                        Register
                                   </button>
                                   <div className="flex mt-5">
                                        <p>Already have an account?</p> &nbsp;{" "}
                                        <button
                                             className="btn text-secondary"
                                             onClick={() => navigate("/signin")}
                                        >
                                             Login
                                        </button>
                                   </div>
                              </div>
                         </div>
                    </div>
               )}
          </>
     );
}
