// import express from "express";
// import Groq from "groq-sdk";

// const app = express();
// app.use(express.json());

// const PORT = process.env.PORT || 3000;
// const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// function getGroqChatCompletion(message) {
//   return groq.chat.completions.create({
//     messages: [
//       {
//         role: "user",
//         content: message, // SERÁ DINÂMICO CONFORME O USUÁRIO PASSE
//       },
//     ],
//     model: "llama-3.3-70b-versatile",
//   });
// }

// app.post("/api/chat", async (req, res) => {
//   // Corrigido parêntese incorreto
//   const { message } = req.body;

//   // AQUI EU VERIFICO SE HÁ UMA MENSAGEM DO USUÁRIO
//   if (!message) {
//     return res.status(400).json({ error: "Mensagem não fornecida ☹" });
//   }

//   try {
//     const responseGroq = await getGroqChatCompletion(message);
//     return res.json({
//       response: responseGroq.choices[0]?.message?.content || "",
//     });
//   } catch (error) {
//     return res.status(500).json({ error: "Erro ao consultar a API da Groq" });
//   }
// }); // Corrigido fechamento do bloco try/catch

// app.listen(PORT, () => {
//   console.log(`Servidor rodando na porta ${PORT} 🚀`);
// });

// // FIM SERVIDOR FOI CONFIGURADO

import express from "express";
import Groq from "groq-sdk";
import path from "path";
import dotenv from "dotenv";

dotenv.config(); // VAI CARREGAR O .ENV

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Servir arquivos estáticos da pasta 'public'
app.use(express.static("public"));

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

function getGroqChatCompletion(message) {
  return groq.chat.completions.create({
    messages: [{ role: "user", content: message }],
    model: "llama-3.3-70b-versatile",
  });
}

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Mensagem não fornecida ☹" });
  }

  try {
    const responseGroq = await getGroqChatCompletion(message);
    return res.json({
      response: responseGroq.choices[0]?.message?.content || "",
    });
  } catch (error) {
    console.error("Erro na API da Groq:", error);
    return res.status(500).json({ error: "Erro ao consultar a API da Groq" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT} 🚀`);
});
