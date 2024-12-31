"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../modules/user.controller");
const router = (0, express_1.Router)();
router.post('/signup', user_controller_1.createUser);
router.post('/login', user_controller_1.loginUser);
exports.default = router;
