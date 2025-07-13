
import api from '../../configs/axios.config';
import type { AuthReponseType } from './auth.type';

const baseUrl = '/auth/login/google';

export async function googleAuthentication(access_token: string):Promise<AuthReponseType> {
    if (!access_token) throw new Error("Token was not provied")
    const { data } = await api.post(baseUrl, { access_token });
    return data;
}
