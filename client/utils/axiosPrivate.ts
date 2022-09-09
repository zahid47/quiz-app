import axios from "axios";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

const axiosPrivate = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL!,
  headers: {
    "Content-Type": "application/json",
  },
});

const privateInterceptor = axiosPrivate.interceptors.request.use(
  async (req) => {

    const accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");

    if (!accessToken) {
      const response = await axios.get(
        `http://localhost:8000/auth/refresh/${refreshToken}`
      );
      Cookies.set("accessToken", response.data.accessToken);
      return req;
    }

    //@ts-ignore-next-line
    const info = jwt_decode(accessToken);
    //@ts-ignore-next-line
    const isExpired = dayjs.unix(info.exp).diff(dayjs()) < 1;

    if (!isExpired) return req;

    const response = await axios.get(
      `http://localhost:8000/auth/refresh/${refreshToken}`
    );
    Cookies.set("accessToken", response.data.accessToken);
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

axios.interceptors.request.eject(privateInterceptor);

export default axiosPrivate;
