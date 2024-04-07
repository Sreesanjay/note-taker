import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import Signin from "./pages/Signin/Signin";
import Signup from "./pages/Signup/Signup";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { reset } from "./features/notesSlice";
import Loader from "./components/Loader/Loader";
const Home = lazy(() => import("./pages/Home/Home"));
const EditNote = lazy(() => import("./components/EditNote/EditNote"));

export default function App() {
     const { isSuccess } = useAppSelector((state) => state.notes);
     const dispatch = useAppDispatch();
     useEffect(() => {
          if (isSuccess) {
               dispatch(reset());
          }
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [isSuccess]);
     return (
          <div className="body">
               <Suspense fallback={<Loader />}>
                    <Router>
                         <Routes>
                              <Route path="/signup" element={<Signup />} />
                              <Route path="/signin" element={<Signin />} />
                              <Route path="/" element={<ProtectedRoute />}>
                                   <Route path="/" element={<Home />} />
                                   <Route
                                        path="/edit/:id"
                                        element={<EditNote />}
                                   />
                              </Route>
                         </Routes>
                    </Router>
               </Suspense>
          </div>
     );
}
