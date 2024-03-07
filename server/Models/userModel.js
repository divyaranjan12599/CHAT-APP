import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

const userModel = Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
}, { timestamps: true });

userModel.methods.matchPassword = async function(enteredPass) {
    return await bcrypt.compare(enteredPass, this.password);
}

userModel.pre("save", async function(next) {
    if (this.isModified("password")) { // Check if password field is modified
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next(); // Call next to proceed with saving the document
});

const User = model("User", userModel);
export default User;
