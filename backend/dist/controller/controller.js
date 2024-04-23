"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const util_1 = require("../utils/util");
const model_1 = __importDefault(require("../db/model"));
const Controller = {
    registerUser: (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { firstname, lastname, email, password, contactmode } = req.body;
        try {
            let salt = yield (0, util_1.generateSalt)();
            let userPassword = yield (0, util_1.generatePassword)(password, salt);
            let Otp = (0, util_1.generateOTP)();
            const emailExists = yield model_1.default.findOne({ email });
            if (emailExists) {
                res.status(400);
                throw new Error('User already exists');
            }
            const user = yield model_1.default.create({
                firstname,
                lastname,
                email,
                password: userPassword,
                contactmode,
                Otp,
                salt
            });
            const otpResponse = yield (0, util_1.sendOTP)(email, Otp);
            yield (0, util_1.generateToken)(res, user._id);
            const response = {
                Id: user.id,
                otpResponse: otpResponse,
            };
            res.json(response);
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    })),
    VerifyOtp: (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { otp, id } = req.body;
        try {
            const user = yield model_1.default.findById(id);
            if (!user) {
                res.status(404).json({ status: false, message: 'User not found' });
                return;
            }
            if (otp === user.Otp) {
                const response = yield model_1.default.findByIdAndUpdate(id, { isVerified: true }, { new: true });
                if (!response) {
                    res.status(500).json({ status: false, message: 'Failed to update user' });
                }
                res.json(response);
            }
            else {
                res.status(400).json({ status: false, message: 'Invalid OTP' });
            }
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    })),
    authUser: (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            const existingUser = yield model_1.default.findOne({ email });
            if (!existingUser) {
                res.status(401).json('Invalid email or password');
                return;
            }
            if (!existingUser.isVerified) {
                res.status(403).json('You are not verified');
                return;
            }
            const validPassword = yield (0, util_1.validatePassword)(password, existingUser.salt, existingUser.password);
            if (!validPassword) {
                res.status(401).json('Invalid email or password');
                return;
            }
            yield (0, util_1.generateToken)(res, existingUser._id);
            res.json({ id: existingUser._id, email: existingUser.email });
            return;
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }))
};
exports.Controller = Controller;
