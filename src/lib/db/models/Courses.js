import mongoose, { Schema, model, models } from "mongoose";

const CourseSchema = new Schema(
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
        smallDescription: {
            type: String,
            default: "General",
        },
        image: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default models.Course || model("Course", CourseSchema);
