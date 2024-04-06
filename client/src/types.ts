export interface ErrorObject {
    status: number | undefined;
    message: string;
}

export interface IUser {
    _id: string;
    email: string;
    password: string;
}

export interface INote {
    _id?: string;
    title: string;
    note: string;
    createdAt: Date;
    updatedAt: Date;
    is_deleted: boolean;
    user_id: string;
}