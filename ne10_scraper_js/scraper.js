const axios = require('axios');
const cheerio = require('cheerio');

async function getHeadlines() {
  const url = 'https://ne10.uol.com.br/';
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);
  const headlines = [];

  $('h1, h2, h3').each((i, elem) => {
    const text = $(elem).text().trim();
    if (text.length > 20) headlines.push(text);
    if (headlines.length >= 10) return false;
  });

  return headlines;
}

module.exports = { getHeadlines };