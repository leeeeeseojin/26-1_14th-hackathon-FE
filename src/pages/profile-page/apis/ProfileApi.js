import AxiosInstance from '../../../apis/axios';

export const getAllergens = async () => {
  const response = await AxiosInstance.get(
    "/api/v1/allergens"
  );

  return response.data;
};