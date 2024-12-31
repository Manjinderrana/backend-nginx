"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateAccessToken = (user) => {
    try {
        return jsonwebtoken_1.default.sign({ userId: user === null || user === void 0 ? void 0 : user._id, email: user === null || user === void 0 ? void 0 : user.email }, process.env.ACCESS_SECRET_KEY || '', { expiresIn: '10m' });
    }
    catch (error) {
        throw error;
    }
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (user) => {
    try {
        return jsonwebtoken_1.default.sign({ userId: user === null || user === void 0 ? void 0 : user._id }, process.env.REFRESH_SECRET_KEY || '', { expiresIn: '10h' });
    }
    catch (error) {
        throw error;
    }
};
exports.generateRefreshToken = generateRefreshToken;
