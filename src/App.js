import "./App.css";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Bookings from "./components/Bookings";
import Rooms from "./components/Rooms";
import NotFound from "./components/NotFound";
import UserProfile from "./components/UserProfile";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/bookings" element={<UserProfile />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<LoginForm />} />
        <Route exact path="/register" element={<RegisterForm />} />
        <Route exact path="/bookings" element={<Bookings />} />
        <Route exact path="/rooms" element={<Rooms />} />
        <Route path="*" element={<NotFound to="/not-found" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
