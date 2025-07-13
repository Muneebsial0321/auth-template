
import api from '../../configs/axios.config';
import type { AuthReponseType } from './auth.type';

const baseUrl = '/auth/login/google';

export async function googleAuthentication(authCode: string): Promise<AuthReponseType | any> {
    try {
        if (!authCode) throw new Error("Token was not provied")
        const { data } = await api.post(baseUrl, { authCode });
        return data;
    } catch (error: any) {
        return error
    }

}
