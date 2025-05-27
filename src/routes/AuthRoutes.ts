import express from 'express';


const router = express.Router();

router.post('/cadastro', (req, res) => {  
  // Lógica para cadastro de usuário
  res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
});