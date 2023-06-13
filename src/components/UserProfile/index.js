import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Bookings from "../Bookings";
import { getProfileApi } from "../../Routes";
import AuthCheck from "../AuthCheck";

const UserProfile = () => {
  const [data, setData] = useState(null);
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProfileApi(token);
        setData(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, [token]);

  return <AuthCheck>{data && <Bookings username={data.username} />}</AuthCheck>;
};

export default UserProfile;
