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
    isPinned: {
        type: "boolean",
        default: false
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

export default mongoose.model<INote>("Note", noteSchema);