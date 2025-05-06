import AddCar from "./pages/Admin/AddCar";
import AddOwner from "./pages/Admin/AddOwner";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AllBookings from "./pages/Admin/AllBookings";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Cars from "./pages/Cars";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import GetAllCar from "./pages/Admin/GetAllCar";
import UpdateCar from "./pages/Admin/UpdateCar";
import AdminRegister from "./pages/Admin/AdminRegister";
import AdminLogin from "./pages/Admin/AdminLogin";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./components/NotFound";
import CarDetails from "./pages/CarDetails";
import AddInsurance from "./pages/Admin/AddInsurance";
import ExtraServices from "./pages/Admin/ExtraServices";
import Checkout from "./pages/Checkout";
import Services from "./pages/Services";



function App() {

  const { role } = useSelector((state) => state.admin);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/explore-cars" element={<Cars/>}/>
          <Route path="/checkout" element={<Checkout/>}>
            <Route path="services" element={<Services/>}/>
          </Route>
          <Route path="/adminRegister" element={<AdminRegister />} />
          <Route path="/car-details/:id" element={<CarDetails/>} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route
            path="/admindashboard"
            element={
              role === "admin" ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/adminlogin" replace />
              )
            }
          >
            <Route path="add-owner" element={<AddOwner />} />
            <Route path="add-car" element={<AddCar />} />
            <Route path="add-insurance" element={<AddInsurance />} />
            <Route path="extra-services" element={ <ExtraServices/>} />
            <Route path="allbookings" element={<AllBookings />} />
            <Route path="allcars" element={<GetAllCar />} />
            <Route path="edit/:id" element={<UpdateCar />} />
            <Route path="*" element={<NotFound/>} />
          </Route>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App
