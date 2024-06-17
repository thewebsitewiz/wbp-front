import { scrapeMoonPhase, getAstro } from "../src/controllers/weatherController.js";



const startDate = new Date();

for (let i = 0; i < 1000; i++) {
  const date = new Date(startDate);
  date.setDate(date.getDate() + i);
  const moonPhase = scrapeMoonPhase(date);
  const astro = scrapeAstro(date);
  console.log(date, moonPhase, astro);
}
