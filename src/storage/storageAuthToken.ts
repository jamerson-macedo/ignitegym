import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_TOKEN_STORAGE } from "./storageConfig";


type storageAuthTokenProps = {
    token: string;
    refresh_token: string;
}
export async function storageAuthTokenSave({token,refresh_token}:storageAuthTokenProps) {
    try {
        await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, JSON.stringify({ token, refresh_token }));
    } catch (e) {
        console.log(e);
    }


}
export async function storageAuthTokenGet() {
    try {
        const response = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE);

        const { token, refresh_token }: storageAuthTokenProps = response ? JSON.parse(response) : {};
        return { token, refresh_token }
    } catch (e) {
        console.log(e);
    }
}
export async function storageAuthTokenRemove() {
    await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE);

}