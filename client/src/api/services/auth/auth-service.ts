import CONFIG_KEYS from "../../../config";
import { AdminLoginInfo } from "../../types/admin/auth-interface";
import authInstanceAxios from "../../middlewares/interceptor";

export const login = async (
  endpoint: string,
  adminLoginInfo: AdminLoginInfo
) => {
  console.log("API_BASE_URL:", CONFIG_KEYS.API_BASE_URL); // Debug line
  console.log("Constructed URL:", `${CONFIG_KEYS.API_BASE_URL}/${endpoint}`);
  const response = await authInstanceAxios.post(
    `${CONFIG_KEYS.API_BASE_URL}/${endpoint}`,
    adminLoginInfo
  );
  return response;
};
