import axios from "axios";
import config from "../Config/config";

const url = `${config.API_BASE_URL}`;

export const loginApi = (data) => {
  return axios.post(`${url}/login`, data);
};

export const registerApi = (data) => {
  return axios.post(`${url}/register`, data);
};

export const getProfileApi = (token) => {
  return axios.get(`${url}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const roomBookingApi = (
  checkInDate,
  checkOutDate,
  price,
  city,
  hotelType,
  token
) => {
  return axios.post(
    `${url}/book-room`,
    {
      checkInDate,
      checkOutDate,
      price,
      city,
      hotelType,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const getBookingsApi = (token) => {
  return axios.get(`${url}/bookings`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteBookedRoom = (bookingId, token) => {
  return axios.delete(`${url}/bookings/${bookingId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
