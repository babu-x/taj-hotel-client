import "./index.css";
import Header from "../Header";
import AuthCheck from "../AuthCheck";
import { roomsData, cities } from "../../RoomsData";
import { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useNavigate } from "react-router-dom";
import { roomBookingApi } from "../../Routes";
import Cookies from "js-cookie";

const Rooms = () => {
  const [city, setCity] = useState("");
  const [initialRoomsData, setInitialRoomsData] = useState(roomsData);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const navigate = useNavigate();
  const token = Cookies.get("token");

  const renderSelectInput = () => {
    const handleSelectedInput = (e) => {
      const cityName = e.target.value;
      setCity(cityName);

      if (cityName === "All") {
        setInitialRoomsData(roomsData);
      } else {
        const filteredData = roomsData.filter(
          (each) => each.city === e.target.value
        );
        setInitialRoomsData(filteredData);
      }
    };

    const handleClearFilters = () => {
      setCity("");
      setInitialRoomsData(roomsData);
    };
    return (
      <div className="input-container">
        <h1>Find your next stay</h1>
        <select value={city} onChange={handleSelectedInput}>
          {cities.map((each) => (
            <option value={each.name} key={each.id}>
              {each.name}
            </option>
          ))}
        </select>
        {city && <p onClick={handleClearFilters}>clear filters</p>}
      </div>
    );
  };

  const renderRooms = () => {
    const handleConfirmBooking = async (price, city, hotelType) => {
      if (!checkInDate || !checkOutDate) {
        alert("select dates");
      } else {
        try {
          // Send a POST request to the server to save the booking
          await roomBookingApi(
            checkInDate,
            checkOutDate,
            price,
            city,
            hotelType,
            token
          );

          setCheckInDate("");
          setCheckOutDate("");
          alert("Booking confirmed");
          navigate("/bookings");
        } catch (error) {
          console.log(error);
          alert("Failed to save booking");
        }
      }
    };
    const handleCheckIn = (e) => {
      setCheckInDate(e.target.value);
    };
    const handleCheckOut = (e) => {
      setCheckOutDate(e.target.value);
    };
    return (
      <div className="rooms-container">
        {initialRoomsData.map((eachRoom) => (
          <div className="card" key={eachRoom.id}>
            <img
              className="carousel-image"
              src="https://res.cloudinary.com/dxnwg4dyz/image/upload/v1686546117/hotelroom_liumn6.jpg"
              alt="room"
            />
            <h2 className="card-title">{eachRoom.name}</h2>
            <p className="card-details">Bed Type: {eachRoom.bed_type}</p>
            <p className="card-details">
              Max Occupancy: {eachRoom.max_occupancy}
            </p>
            <p className="card-price">{`Rs ${eachRoom.price}`}</p>
            <div className="card-amenities">
              <ul>
                <li>TV</li>
                <li>Wifi</li>
                <li>Air Conditioning</li>
              </ul>
            </div>
            <div className="card-bottom">
              <p className="card-city">{eachRoom.city}</p>
              <Popup
                modal
                style={{ width: "200px" }}
                trigger={<button className="card-button">Book</button>}
              >
                {(close) => (
                  <div className="opened-popup">
                    <div className="details-container">
                      <p>
                        {" "}
                        <span>City :</span> {eachRoom.city}
                      </p>
                      <p>
                        {" "}
                        <span>Hotel Type : </span> {eachRoom.name}
                      </p>
                      <p>
                        {" "}
                        <span>Price : </span> {eachRoom.price}
                      </p>
                      <div className="check-in-container">
                        <p>Check In :</p>
                        <input
                          value={checkInDate}
                          type="date"
                          onChange={handleCheckIn}
                        />
                      </div>
                      <div className="check-in-container">
                        <p>Check Out :</p>
                        <input
                          value={checkOutDate}
                          type="date"
                          onChange={handleCheckOut}
                        />
                      </div>
                    </div>
                    <div className="popup-btns">
                      <button
                        id="close"
                        type="button"
                        className="trigger-button"
                        onClick={() => {
                          close();
                          setCheckInDate("");
                          setCheckOutDate("");
                        }}
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        id="confirm"
                        onClick={() => {
                          handleConfirmBooking(
                            eachRoom.price,
                            eachRoom.city,
                            eachRoom.name
                          );
                        }}
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                )}
              </Popup>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <AuthCheck>
      <Header />
      <div className="rooms-page">
        {renderSelectInput()}
        {renderRooms()}
      </div>
    </AuthCheck>
  );
};

export default Rooms;
