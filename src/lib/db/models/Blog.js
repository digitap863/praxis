import mongoose, { Schema, model, models } from "mongoose";

const BlogSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        author: {
            type: String,
            required: true,
            default: "Praxis Team",
        },
        category: {
            type: String,
            default: "General",
        },
        date: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        tags: [
            {
                type: String,
            },
        ],
    },
    {
        timestamps: true,
    }
);

export default models.Blog || model("Blog", BlogSchema);
