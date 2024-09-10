import axiosInstance from "../utils/axiosConfig";


interface LoginResponse {
  user: { username: string; role: string };
  token: string;
}
interface RegisterResponse {
  user: { username: string; role: string };
  token: string;
}

interface UserProfile {
  username: string;
  role: string;
}

export const loginUser = async (credentials: { username: string; password: string }): Promise<LoginResponse> => {
  const response = await axiosInstance.post('/auth/login', credentials);
  return response.data;
};
export const registerUser = async (credentials: { username: string; password: string;passwordConfirm: string }): Promise<RegisterResponse> => {
  const response = await axiosInstance.post('/auth/register', credentials);
  return response.data;
};

export const fetchUserProfile = async (): Promise<UserProfile> => {
  const response = await axiosInstance.get('/api/user/profile');
  return response.data;
};

export const updateUserProfile = async (profileData: UserProfile): Promise<UserProfile> => {
  const response = await axiosInstance.put('/api/user/profile', profileData);
  return response.data;
};


// import { fakeUsers, User } from '../mocks/users';

// export const loginUser = async (credentials: { username: string; password: string }) => {
//   // Simulate a successful login
// //   const user = fakeUsers.find(user => user.username === credentials.username);
//   const user = fakeUsers.find(user => user.username === "adminUser");
//   if (!user) throw new Error('Invalid credentials');
  
//   return {
//     user,
//     token: 'fakeToken123', // Mock token
//   };
// };

// export const fetchUserProfile = async () => {
//   // Simulate fetching user profile
//   return fakeUsers[0]; // For testing, return the first user
// };

// export const updateUserProfile = async (profileData: User) => {
//   // Simulate updating user profile
//   const userIndex = fakeUsers.findIndex(user => user.id === profileData.id);
//   if (userIndex === -1) throw new Error('User not found');
  
//   fakeUsers[userIndex] = profileData;
//   return profileData;
// };
