require('dotenv').config();
const { getHeadlines } = require('./scraper');
const { sendEmail } = require('./mailer');

(async () => {
  try {
    const headlines = await getHeadlines();
    const content = headlines.join('\n');
    await sendEmail('Manchetes do NE10', content);
    console.log('Email enviado com sucesso!');
  } catch (error) {
    console.error('Erro ao executar o script:', error);
  }
})();