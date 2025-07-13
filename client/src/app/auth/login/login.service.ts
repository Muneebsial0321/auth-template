
import type { LoginSchemaType } from './login.schema';
import type { AuthReponseType } from '../auth.type';
import api from '../../../configs/axios.config';

const baseUrl = '/auth/login';

export async function loginUser(payload: LoginSchemaType): Promise<AuthReponseType> {
  try {
    const { data } = await api.post(baseUrl, payload);
    return data;
  } catch (error: any) {
    return error
  }
}