import { apiRequest } from "../../apis/client";

export const login = async (id) => {
  return apiRequest("/auth/login", {
    method: "POST",
    body: {
      id,
    },
  });
};

export const signup = async (signupData) => {
  return apiRequest("/auth/signup", {
    method: "POST",
    body: signupData,
  });
};