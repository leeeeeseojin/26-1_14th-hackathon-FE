import AxiosInstance from '../../../apis/axiosInstance'

export const getDashboard = async () => {
  const response = await AxiosInstance.get(
    '/api/dashboard'
  );

  return response.data;
};


export const getRecommendedRecipes = async () => {
  const response = await AxiosInstance.get(
    '/api/recommendations/recipes'
  );

  return response.data;
};


export const createGlucoseReading = async (data) => {
  const response = await AxiosInstance.post(
    '/api/glucose-readings',
    data
  );

  return response.data;
};