import mongoose, { Schema, model, models } from "mongoose";

const TeamSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        position: {
            type: String,
            required: true,
            default: "Praxis Team",
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },   
    },
    {
        timestamps: true,
    }
);

export default models.Team || model("Team", TeamSchema);
