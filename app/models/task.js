import mongoose from "mongoose";
import { type } from "os";
import { text } from "stream/consumers";

const TaskSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
        },
    },
    {timestamps: true },
);
export default mongoose.models.Task || mongoose.model("Task", TaskSchema);