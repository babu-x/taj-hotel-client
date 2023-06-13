import { useEffect, useState } from "react";
import AuthCheck from "../AuthCheck";
import Header from "../Header";
import "./index.css";
import Cookies from "js-cookie";
import { getBookingsApi, deleteBookedRoom } from "../../Routes";
// import { Navigate } from "react-router-dom";

const Bookings = ({ username }) => {
  const [data, setData] = useState([]);
  const token = Cookies.get("token");
  // console.log(token);
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getBookingsApi(token);
        setData(response.data);
      } catch (error) {
        console.log(error);
        // alert(error.response.error);
      }
    };

    fetchBookings();
  }, [token]);

  const handleCancelBooking = async (bookingId) => {
    try {
      await deleteBookedRoom(bookingId, token);
      const bookingsResponse = await getBookingsApi(token);
      setData(bookingsResponse.data);
    } catch (error) {
      console.log(error);
      alert(error.response.error);
    }
  };

  const returnDate = (arg) => {
    const date = new Date(arg);
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);

    return formattedDate;
  };
  return (
    <AuthCheck>
      <Header />
      <div className="bookings-container">
        {data.length >= 1 && (
          <h1 className="user-title">
            Hey <span>{username}</span>, Know your bookings
          </h1>
        )}
        {data.length === 0 && (
          <h1 className="user-title">
            Hey <span>{username}</span>, currently you dont have any bookings
          </h1>
        )}
        {data.map((eachBooking) => (
          <div key={eachBooking._id} className="booking-card">
            <div>
              <h1 className="hotel-name">Taj Hotel</h1>
              <h1 className="hotel-city">{eachBooking.city}</h1>
            </div>
            <p className="hotel-price">
              {" "}
              Price : <span>Rs {eachBooking.price} / 24hrs</span>
            </p>
            <div className="dates-container">
              <p className="date">{returnDate(eachBooking.checkInDate)}</p>
              <p className="to">to</p>
              <p className="date">{returnDate(eachBooking.checkOutDate)}</p>
            </div>
            <div className="cancel-btn-container">
              <button
                onClick={() => {
                  handleCancelBooking(eachBooking._id);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </AuthCheck>
  );
};

export default Bookings;
