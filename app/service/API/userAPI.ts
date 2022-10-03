import { ApiClient } from "../Network/ApiService"

export interface ListUserParamsProp {
    page?: number,
    limit?: number
}

export const requestGetUserInfo = (payload: ListUserParamsProp) =>
    ApiClient.get(`/user`, { params: payload });

export const requestGetUserInfoFull = (id: string) =>
    ApiClient.get(`/user/${id}`, {});