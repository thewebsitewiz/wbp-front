// // @ts-ignore
const express = require("express");
const router = express.Router();

const {
  getWeather,
  getMarine,
  getAstro,
  getMoonPhase,
} = require("../controllers/weather.controller");

router.get(`/forecast`, async (req, res) => {
  try {
    const data = await getWeather(req, res);
    return res.status(200).send(data);
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: `error in catch for forcast: ${e}`,
    });
  }
});

router.get(`/marine`, async (req, res) => {
  try {
    const data = await getMarine(req, res);
    return res.status(200).send(data);
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: `error in catch for getMarine: ${e}`,
    });
  }
});

router.get(`/astro`, async (req, res) => {
  try {
    const data = await getAstro(req, res);
    return res.status(200).send(data);
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: `error in catch for getAstro: ${e}`,
    });
  }
});

router.get(`/moon`, async (req, res) => {
  try {
    const data = await getMoonPhase(req, res);
    return res.status(200).send(data);
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: `error in catch for getAstro: ${e}`,
    });
  }
});

module.exports = router;
