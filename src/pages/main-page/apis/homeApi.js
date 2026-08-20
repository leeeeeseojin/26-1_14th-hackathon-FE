import AxiosInstance from '../../../apis/axiosInstance'

export const getDashboard = async () => {
  const response = await AxiosInstance.get(
    '/api/v1/dashboard'
  );

  return response.data;
};


export const getRecommendedRecipes = async () => {
  const response = await AxiosInstance.get(
    '/api/v1/recommendations/recipes'
  );

  return response.data;
};


export const createGlucoseReading = async (data) => {
  const response = await AxiosInstance.post(
    '/api/v1/glucose-readings',
    data
  );

  return response.data;
};