import { apiRequest } from "../../apis/client";


export const login = async (loginId) => {
  return apiRequest("/api/auth/login", {
    method: "POST",
    body: {
      loginId,
    },
  });
};

export const signup = async (signupData) => {
  return apiRequest("/api/auth/signup", {
    method: "POST",
    body: {
      ...signupData,
    },
  });
};