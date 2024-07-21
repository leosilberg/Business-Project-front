// import axios from "axios";

// const api = axios.create({
//   baseURL:
//     process.env.NODE_ENV === "production" ? "/api" : "//localhost:3000/api",
// });

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("userToken");
//     if (token) config.headers.Authorization = `Bearer ${token}`;
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response) {
//       // Server responded with a status other than 2xx
//       console.error("Error response:", error.response);
//     } else if (error.request) {
//       // No response was received
//       console.error("Error request:", error.request);
//     } else {
//       if (error.name === "CanceledError") {
//         throw error;
//       }
//       // Something else triggered the error
//       console.error("Error message:", error.message);
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;
import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "production" ? "/api" : "//localhost:3000/api",
});

api.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("jwt-taskify");
    if (token) {
      token = token?.slice(1, -1);
    }

    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
