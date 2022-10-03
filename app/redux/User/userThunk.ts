import { createAsyncThunk } from "@reduxjs/toolkit";
import { LIMIT_ITEM_PER_PAGE } from "../../constant";
import { ListUserResponse, UserItemFullResponseProps } from "../../models/User_Models";
import { requestGetUserInfo, requestGetUserInfoFull } from "../../service/API/userAPI";

export const fetchListUserAsync = createAsyncThunk(
    'user/fetchAllUsers',
    async () => {
        try {
            const response: ListUserResponse = await requestGetUserInfo({ page: 1, limit: LIMIT_ITEM_PER_PAGE });
            if (response.data.length > 0) {
                for (let i = 0; i < response.data.length; i++) {
                    const responseFull: UserItemFullResponseProps = await requestGetUserInfoFull(response.data[i].id);
                    response.data[i].enable = true;
                    response.data[i].email = responseFull.email;
                }
            }
            return {
                totalPage: Math.ceil(response.total / LIMIT_ITEM_PER_PAGE),
                listUsers: response.data
            }
        } catch (error) {
            if (__DEV__) {
                console.log('error fetch all user', error);
            }
            return {
                totalPage: 1,
                listUsers: []
            }
        }
    }
);

export const fetchListUserMoreAsync = createAsyncThunk(
    'user/fetchAllUsersMore',
    async (page: number) => {
        try {
            const response: ListUserResponse = await requestGetUserInfo({ page, limit: LIMIT_ITEM_PER_PAGE });
            if (response.data.length > 0) {
                for (let i = 0; i < response.data.length; i++) {
                    const responseFull: UserItemFullResponseProps = await requestGetUserInfoFull(response.data[i].id);
                    response.data[i].enable = true;
                    response.data[i].email = responseFull.email;
                }
            }
            return {
                totalPage: Math.ceil(response.total / LIMIT_ITEM_PER_PAGE),
                listUsers: response.data
            }
        } catch (error) {
            if (__DEV__) {
                console.log('error fetch all user More', error);
            }
            return {
                totalPage: 1,
                listUsers: []
            }
        }
    }
);