// // @ts-ignore
// const express = require('express');
import express from 'express';

const router = express.Router();
const {
  getWeather,
} = require('@controllers/weather.controller');

const { authMiddleware, isAdmin } = require('@middleware/authMiddleware');
router.get("/get-weather", getWeather);

module.exports = router;
