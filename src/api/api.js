import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Alert } from 'react-native';


const API_URL = 'http://192.168.0.102:5000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        console.log("Attempting refresh with token:", refreshToken);
        if (!refreshToken) throw new Error("No refresh token available");

        const response = await axios.post(`${API_URL}/refresh-token`, { refreshToken });
        const { accessToken, refreshToken: newRefreshToken } = response.data;

        await AsyncStorage.setItem('accessToken', accessToken);
        await AsyncStorage.setItem('refreshToken', newRefreshToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError?.response?.data || refreshError);
        
        // Clear tokens and log out user
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('refreshToken');
        await AsyncStorage.setItem('isLoggedIn', 'false');

        Alert.alert("Session Expired", "Please log in again.");
        navigation.replace('Login'); // Ensure `navigation` is passed correctly
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);


// Register User
export const registerUser = async (userData) => {
  try {
    const response = await apiClient.post('/register', userData);
    return response.data;
  } catch (error) {
    console.error('Registration Error:', error?.response?.data);
    throw new Error(error.response?.data?.message || 'Something went wrong');
  }
};

// Verify OTP
export const verifyOtp = async (email, otp) => {
  try {
    const response = await apiClient.post('/verify-otp', { email, otp });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Something went wrong';
  }
};

export const loginUser = async (userData) => {
  try {
    console.log("Attempting login with:", userData);
    const response = await apiClient.post('/login', userData);
    const { accessToken, refreshToken, user } = response.data;
    console.log("rep=>", response.data);
    
    await AsyncStorage.setItem('accessToken', accessToken);
    await AsyncStorage.setItem('refreshToken', refreshToken);
    await AsyncStorage.setItem('isLoggedIn', JSON.stringify(user.isLoggedIn));
    await AsyncStorage.setItem('userId', user.userId); 
    await AsyncStorage.setItem('email', user.email); 
    await AsyncStorage.setItem('name', user.name); 
    await AsyncStorage.setItem('mobile', user.mobile); 
    console.log("Login Successful. Tokens Stored.");
    
    return response.data;
  } catch (error) {
    console.error('Login Error:', error?.response?.data);
    if (error.response?.status === 400) {
      throw new Error("Invalid email or password.");
    } else if (error.response?.status === 403) {
      throw new Error("Please verify your email before logging in.");
    } else {
      throw new Error(error.response?.data?.message || 'Something went wrong. Try again.');
    }
  }
};


// Logout User
export const logoutUser = async (navigation) => {
  try {
    const userId = await AsyncStorage.getItem('userId'); // Get userId
    const accessToken = await AsyncStorage.getItem('accessToken');

    console.log("Logging out... User ID:", userId);

    if (userId && accessToken) {
      try {
        await apiClient.post('/logout', { userId }); // Send userId to backend
      } catch (error) {
        console.warn("Backend logout failed, proceeding with local logout.");
      }
    }

    // Clear AsyncStorage
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
    await AsyncStorage.setItem('isLoggedIn', 'false');
    await AsyncStorage.removeItem('userId');

    Alert.alert("Success", "You have been logged out.");
    navigation.replace('Login');
  } catch (error) {
    console.error("Logout Error:", error);
    Alert.alert("Logout Failed", "Something went wrong. Redirecting to login.");
    navigation.replace('Login');
  }
};

