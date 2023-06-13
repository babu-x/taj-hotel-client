import "./index.css";
import Header from "../Header";
import AuthCheck from "../AuthCheck";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const renderBannerSection = () => {
    return (
      <div className="banner-sec-container">
        <h1 className="home-page-title">
          Discover the Perfect Sanctuary for Your Stay
        </h1>
        <p className="home-page-des">
          Discover the perfect sanctuary for your stay, where luxury meets
          serenity. Immerse yourself in a haven of tranquility, designed to
          provide a memorable and rejuvenating experience.
        </p>
        <button className="home-page-button" onClick={() => navigate("/rooms")}>
          Book Now
        </button>
      </div>
    );
  };

  const renderFooterSection = () => {
    return (
      <div className="footer-section">
        <h1 className="footer-sec-title">Taj Hotel</h1>
        <p className="footer-sec-contact">
          Contact Us for Booking - bookings@tajhotel.com
        </p>
        <p className="footer-sec-privacy">privacy.copyright @2023</p>
      </div>
    );
  };
  return (
    <AuthCheck>
      <Header />
      {renderBannerSection()}
      {renderFooterSection()}
    </AuthCheck>
  );
};

export default Home;
