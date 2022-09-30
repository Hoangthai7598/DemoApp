import { ApiClient, ApiClientNoKey } from "../Network/ApiService"

export interface ListUserParamsProp {
    page?: number,
    limit?: number
}

export const requestGetUserInfo = (payload: ListUserParamsProp) =>
    ApiClient.get(`/user`, { params: payload });

export const requestGetUserInfoNoKey = (payload: ListUserParamsProp) =>
    ApiClientNoKey.get(`/user`, { params: payload });