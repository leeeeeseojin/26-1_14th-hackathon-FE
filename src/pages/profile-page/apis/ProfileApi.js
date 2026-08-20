import AxiosInstance from '../../../apis/axiosInstance';

export const getAllergens = async () => {
  const response = await AxiosInstance.get(
    "/api/allergens"
  );

  return response.data;
};