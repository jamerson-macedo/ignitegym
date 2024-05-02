import { SignIn } from "@screens/SignIn";
import { storageAuthTokenGet } from "@storage/storageAuthToken";
import { AppError } from "@utils/AppError";
import axios, { AxiosInstance, AxiosError } from "axios";
type SignOut = () => void
type PromisseType = {
    onSucess: (token: string) => void
    onFailure: (message: AxiosError) => void
}
type APIInstanceProps = AxiosInstance & {
    registerInterceptTokenManager: (signOut: SignOut) => () => void

}

const api = axios.create({
    baseURL: "http://192.168.18.4:3333",


}) as APIInstanceProps;
let failedQueue: Array<PromisseType> = [];
let isRefreshing = false
api.registerInterceptTokenManager = SignOut => {
    const InterceptTokenManager = api.interceptors.response.use(response => response, async (requestError) => {
        // se for esse erro entao o token expirou
        if (requestError?.response?.status === 401) {
            if (requestError.response.data?.message === 'token.expired' || requestError.response.data?.message === 'token.invalid') {
                const refresh_token = await storageAuthTokenGet();
                if (!refresh_token) {
                    SignOut();
                    return Promise.reject(requestError)
                }
                const originalRequestConfig = requestError.config;
                if (isRefreshing) {
                    return new Promise((resolve, reject) => {
                        failedQueue.push({
                            onSucess: (token: string) => {
                                originalRequestConfig.headers = { 'Authorizartion': `Bearer ${token}` }
                                resolve(api(originalRequestConfig));
                            },
                            onFailure: (error: AxiosError) => {
                                reject(error)
                            }
                        })
                    });

                }
                isRefreshing = true;
            }
            SignOut();
        }
        if (requestError.response && requestError.response.data) {
            return Promise.reject(new AppError(requestError.response.data.message));
        } else {
            return Promise.reject(requestError);
        }
    });
    return () => {
        api.interceptors.response.eject(InterceptTokenManager)
    };
};


/*
api.interceptors.request.use((config) => {
    console.log(config.data)
    return config;
}, (error) => {
    return Promise.reject(error);
})
*/


export { api };