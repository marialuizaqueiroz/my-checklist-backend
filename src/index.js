// Importa os pacotes usando require, o padrão do Node.js
const express = require('express');
const cors = require('cors');

// Inicia o aplicativo Express
const app = express();

// Define a porta do servidor. Vercel nos dará uma, ou usaremos 3001 localmente.
const PORT = process.env.PORT || 3001;

// Middlewares: ensinam nosso servidor a entender JSON e a usar as regras do CORS
app.use(cors({origin:[ 'https://my-checklist-frontend.vercel.app', 'http://localhost:5173/', 'https://hook-customizado.vercel.app']})); // libera só o frontend"}));
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

// ROTA DELETE: /tasks
app.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.task.delete({ where: { id: Number(id) } }); // ou equivalente no banco
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: "Task not found" });
  }
});


// ----------------------------

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Exporta o app para a Vercel
module.exports = app;