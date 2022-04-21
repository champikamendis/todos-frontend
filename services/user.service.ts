import { axiosClient, storeAccessToken } from "./axios-client"

export const login = async (username: string, password: string) => {
    const res: any = await axiosClient.post('/auth/login', {
        username,
        password
    });
    storeAccessToken(res.data.token);
    
    return res.data._doc;
}
export const register = async (username: string, password: string) => {
    const res: any = await axiosClient.post('/auth/newUser', {
        username,
        password
    });
    storeAccessToken(res.data.token);

    return res.data._doc;
}
export const userRecognition = async () => {
    const res: any = await axiosClient.get('/auth/recognizeUser');

    return res.data;
}