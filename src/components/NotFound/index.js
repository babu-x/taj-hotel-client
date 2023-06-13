import Header from "../Header";
import "./index.css";

const NotFound = () => {
  return (
    <>
      <Header />
      <div className="not-found-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
          alt="not-found"
        />
        <h1>Not Found</h1>
      </div>
    </>
  );
};

export default NotFound;
