import mongoose, { Schema } from "mongoose";
import { INote } from "../interface";

const noteSchema: Schema<INote> = new Schema<INote>({
    note: {
        type: "string",
        required: true
    },
    title: {
        type: "string",
    },
    is_deleted: {
        type: "boolean",
        default: false
    },
    user_id: { type: "string", required: true }
}, { timestamps: true })

export default mongoose.model<INote>("Note", noteSchema);