import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://api.example.com", // baseURL
  timeout: 60000, // timeout (10 giây)
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
    // 'Authorization': `Bearer ${localStorage.getItem('token')}`, // Nếu có token
  },
});

// Interceptor trước khi gửi request
axiosInstance.interceptors.request.use(
  (config) => {
    // Cập nhật token vào headers
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor sau khi nhận phản hồi
axiosInstance.interceptors.response.use(
  (response) => {
    // Xử lý dữ liệu phản hồi thành công
    return response;
  },
  async (error) => {
    // Xử lý lỗi khi phản hồi có vấn đề, ví dụ: 401, 403...
    const originalRequest = error.config;

    // Nếu gặp lỗi 401 và chưa retry, thực hiện refresh token (nếu cần)
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");

      // Gửi yêu cầu để refresh token
      const { data } = await axiosInstance.post("/auth/refresh", {
        token: refreshToken,
      });

      // Lưu lại token mới
      localStorage.setItem("token", data.accessToken);

      // Thêm token mới vào header Authorization
      axiosInstance.defaults.headers[
        "Authorization"
      ] = `Bearer ${data.accessToken}`;

      // Gửi lại yêu cầu gốc
      return axiosInstance(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
