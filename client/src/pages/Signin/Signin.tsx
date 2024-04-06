import { useNavigate } from "react-router-dom";
import singinImg from "../../assets/signinImg.png";
import "./Signin.css";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { signin } from "../../service/authService";
import Loader from "../../components/Loader/Loader";
import { reset } from "../../features/authSlice";
import { resetNote } from "../../features/notesSlice";

export default function Signin() {
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
          dispatch(resetNote());
     // eslint-disable-next-line react-hooks/exhaustive-deps
     }, []);

     useEffect(() => {
          if (isError) {
               setError(errorMessage);
          }
          dispatch(reset());
     }, [isError, dispatch, isSuccess, errorMessage]);

     function handleSubmit() {
          if (userData.email && userData.password) {
               dispatch(signin(userData));
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
                                        Signin to your Account
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
                                        Signin
                                   </button>
                                   <div className="flex mt-5">
                                        <p>Don't have an account?</p> &nbsp;{" "}
                                        <button
                                             className="btn text-secondary"
                                             onClick={() => navigate("/signup")}
                                        >
                                             Register
                                        </button>
                                   </div>
                              </div>
                         </div>
                    </div>
               )}
          </>
     );
}
