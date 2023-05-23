import axios from "axios";
let BaseAPIConfig = axios.create({ baseURL: "https://localhost:44338/api/v1/" }); 

BaseAPIConfig.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error && error.response && error.response.status == 401) {
      console.log("expired");
    }
    return Promise.reject(error);
  }
);



export default BaseAPIConfig;