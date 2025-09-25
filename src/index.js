// Importa os pacotes usando require, o padrão do Node.js
const express = require('express');
const cors = require('cors');

// Inicia o aplicativo Express
const app = express();

// Define a porta do servidor. Vercel nos dará uma, ou usaremos 3001 localmente.
const PORT = process.env.PORT || 3001;

// Middlewares: ensinam nosso servidor a entender JSON e a usar as regras do CORS
app.use(cors());
app.use(express.json());

// --- NOSSO "BANCO DE DADOS" EM MEMÓRIA ---
let tasks = [
  { id: 1, title: "Configurar o projeto frontend" },
  { id: 2, title: "Criar o backend simples" },
  { id: 3, title: "Publicar tudo na Vercel" }
];
let nextId = 4;
// -----------------------------------------

// --- NOSSAS ROTAS DA API ---

// ROTA GET: /tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// ROTA POST: /tasks
app.post('/tasks', (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'O título é obrigatório' });
  }

  const newTask = { id: nextId++, title: title };
  tasks.push(newTask);
  
  res.status(201).json(newTask);
});
// ----------------------------

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Exporta o app para a Vercel
module.exports = app;