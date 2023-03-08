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
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.signup = void 0;
const user_1 = require("../models/user");
const auth_1 = require("../utils/auth");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    const hashedPassword = yield (0, auth_1.hashPassword)(password);
    const maxAge = 3 * 24 * 60 * 60;
    try {
        const createdUser = yield user_1.User.create({ username: username, email: email, password: hashedPassword });
        const token = (0, auth_1.createToken)(createdUser._id, maxAge);
        //res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000, sameSite: 'strict', secure: true });
        res.status(201).json({ msg: 'User created successfully!', token });
    }
    catch (e) {
        const errors = (0, auth_1.handleErrors)(e);
        res.status(400).json({ errors });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const maxAge = 3 * 24 * 60 * 60;
    try {
        const user = yield user_1.User.login(email, password);
        const token = (0, auth_1.createToken)(user._id, maxAge);
        //res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000, sameSite: 'strict', secure: true });
        res.status(200).json({ msg: 'User logged in successfully!', token });
    }
    catch (e) {
        const errors = (0, auth_1.handleErrors)(e);
        res.status(400).json({ errors });
    }
});
exports.login = login;
const logout = (req, res) => {
    //res.cookie('jwt', '', { maxAge: 1 });
    //res.redirect('/');
    res.send('User logged out..Bye!');
};
exports.logout = logout;
