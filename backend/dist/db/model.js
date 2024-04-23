"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    contactmode: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    Otp: {
        type: String,
    },
    salt: { type: String },
}, { timestamps: true });
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
