import { Document, ObjectId } from "mongoose";

export interface IUser extends Document {
    ObjectId: ObjectId;
    email: string;
    password?: string;
    createdAt?: Date;
}
export interface INote extends Document {
    _id: ObjectId;
    note: string,
    is_deleted: boolean;
    user_id: string;
    title: string,
    createdAt: Date,
    updatedAt: Date
}