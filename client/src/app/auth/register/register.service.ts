
import type { RegisterSchemaType } from './register.schema';
import type { AuthReponseType } from '../auth.type';
import api from '../../../configs/axios.config';

const baseUrl = '/auth/register';

export async function registerUser(payload: RegisterSchemaType): Promise<AuthReponseType> {
  try {
    const { data } = await api.post(baseUrl, payload);
    console.log({ "/auth/register": data })
    return data;
  } catch (error: any) {
    return error
  }
}
