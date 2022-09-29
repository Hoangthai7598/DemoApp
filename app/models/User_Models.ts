export interface UserItemResponseProps {
    firstName: string,
    id: string,
    lastName: string,
    picture: string,
    title: string
}

export interface ListUserResponse {
    data: Array<UserItemResponseProps>,
    limit: number,
    page: number,
    total: number
}