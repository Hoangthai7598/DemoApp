export interface UserItemResponseProps {
    firstName: string,
    id: string,
    lastName: string,
    picture: string,
    title: string
}

export interface ListUserResponse {
    data: Array<UserItemResponseProps | any>,
    limit: number,
    page: number,
    total: number
}

export interface UserItemFullResponseProps {
    dateOfBirth: Date,
    email: string
    firstName: string,
    gender: string,
    id: string,
    lastName: string,
    location: {
        city: string,
        country: string,
        state: string,
        street: string,
        timezone: string
    },
    phone: string,
    picture: string,
    registerDate: Date,
    title: string,
    updatedDate: Date
}