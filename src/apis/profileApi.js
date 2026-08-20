import axiosInstance from './axiosInstance';



export const getAllergens = async () => {
  const response = await axiosInstance.get(
    '/api/v1/allergens',
  );

  return response.data;
};



export const createOnboarding = async (data) => {
  const response = await axiosInstance.post(
    '/api/v1/users/me/onboarding',
    data,
  );

  return response.data;
};


export const getProfile = async () => {
  const response = await axiosInstance.get(
    '/api/v1/users/me/profile',
  );

  return response.data;
};


export const updateProfile = async (profileData) => {
  const response = await axiosInstance.patch(
    '/api/v1/users/me/profile',
    profileData,
  );

  return response.data;
};