import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    highestQualification: {
        type: String,
        required: true
    },
    experience: {
        type: Number, // Storing experience in years
        required: true
    },
    topSkills: {
        type: [String], // Array of strings to store sk1, sk2, sk3
        validate: [arrayLimit, 'You can only add up to 3 skills.'],
        required: true
    }
});

// Custom validator to ensure the array has exactly 3 skills
function arrayLimit(val: any) {
    return val.length === 3;
}

export const User = mongoose.models.User || mongoose.model("User", userSchema);
