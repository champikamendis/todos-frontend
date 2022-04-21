import axios from "axios";

export const retrieveAccessToken = () => {
  const bearerToken = localStorage.getItem("token");
  return bearerToken;
};
export const storeAccessToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const axiosClient = axios.create({
  baseURL: "http://localhost:8000/dev",
});

axiosClient.interceptors.request.use(function (config: any) {
    config.headers.Authorization = `Bearer ${retrieveAccessToken()}`;
    return config;
});
