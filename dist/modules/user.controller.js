"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.loginUser = exports.createUser = void 0;
const userService = __importStar(require("./user.service"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwtUtils_1 = require("../utils/jwtUtils");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        if ([username, email, password].some((field) => (field === null || field === void 0 ? void 0 : field.trim) === "")) {
            throw new Error('All fields are required');
        }
        const existingUser = yield userService.getUser({ email }, "username email");
        if (existingUser) {
            throw new Error('User already exists');
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield userService.createUser({ username, email, password: hashedPassword });
        const createdUser = yield userService.getUser({ email: user === null || user === void 0 ? void 0 : user.email }, "-password");
        return res.status(201).json({ data: createdUser });
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if ([email, password].some((field) => (field === null || field === void 0 ? void 0 : field.trim()) === "")) {
            throw new Error('Email and password are required');
        }
        const existingUser = yield userService.getUser({ email }, "-password");
        console.log(existingUser, "user");
        if (!existingUser) {
            throw new Error('User not found');
        }
        const isPasswordCorrect = yield bcrypt_1.default.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            throw new Error('Password is incorrect');
        }
        const accessToken = (0, jwtUtils_1.generateAccessToken)(existingUser);
        const refreshToken = (0, jwtUtils_1.generateRefreshToken)(existingUser);
        const options = {
            httpOnly: true,
            secure: true,
        };
        return res
            .status(200)
            .cookie('accessToken', accessToken, options)
            .cookie('refreshToken', refreshToken, options)
            .json({ data: existingUser });
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.loginUser = loginUser;
