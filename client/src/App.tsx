import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Home from "./pages/Home/Home";
import Signin from "./pages/Signin/Signin";
import Signup from "./pages/Signup/Signup";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import EditNote from "./components/EditNote/EditNote";

export default function App() {
     return (
          <div className="body">
               <Router>
                    <Routes>
                         <Route path="/signup" element={<Signup />} />
                         <Route path="/signin" element={<Signin />} />
                         <Route path="/" element={<ProtectedRoute />}>
                              <Route path="/" element={<Home />} />
                              <Route path="/edit/:id" element={<EditNote />} />
                         </Route>
                    </Routes>
               </Router>
          </div>
     );
}
