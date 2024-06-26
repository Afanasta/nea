import {jwtDecode} from "jwt-decode";

export function isTokenExpired(token) {
    const jwtPayload = jwtDecode(token);
    const expiredTime = new Date(jwtPayload.exp * 1000);
    const currentTime = new Date()
    return expiredTime < currentTime;
}