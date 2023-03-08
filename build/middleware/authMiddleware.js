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
exports.checkCurrentUser = exports.requireAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
require('dotenv').config();
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/auth');
            }
            else {
                console.log(decodedToken);
                next();
            }
        });
    }
    else {
        res.redirect('/auth');
    }
};
exports.requireAuth = requireAuth;
const checkCurrentUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (err, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            }
            else {
                console.log(decodedToken);
                let user = yield user_1.User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        }));
    }
    else {
        res.locals.user = null;
        next();
    }
};
exports.checkCurrentUser = checkCurrentUser;
