import type { AuthReponseType } from '../auth.type';
import api from '../../../configs/axios.config';

const baseUrl = '/auth';

export async function postForgetPassword(email: string) {
  try {
    const { data } = await api.post(`${baseUrl}/forget-password`, { email });
    return data;
  } catch (error: any) {
    return error
  }
}

export async function postOtpVerification(payload: { email: string, otpToken: string }):Promise<AuthReponseType | any> {
  try {
    const { data } = await api.post(`${baseUrl}/verify-otp`, payload);
    return data;
  } catch (error: any) {
    return error
  }
}