"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// // @ts-ignore
// const express = require('express');
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const { getWeather, } = require('@controllers/weather.controller');
const { authMiddleware, isAdmin } = require('@middleware/authMiddleware');
router.get("/get-weather", getWeather);
module.exports = router;
