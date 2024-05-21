import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt'; // Certifique-se de instalar o bcrypt

const router = Router();
const prisma = new PrismaClient();

// Create a new user
router.post('/', async (req, res) => {
  const { nome, login, email, senha, local_assoc } = req.body;
  try {
    // Verificar se o email já está em uso
    const emailExists = await prisma.usuario.findUnique({
      where: { email: email.toLowerCase() },
    });

    // Verificar se o login já está em uso
    const loginExists = await prisma.usuario.findUnique({
      where: { login: login.toLowerCase() },
    });

    if (emailExists && loginExists) {
      res.status(400).json({ error: 'Nome de usuário e email já cadastrados! Por favor, escolha outras credenciais.' });
    } else if (emailExists) {
      res.status(400).json({ error: 'Email já existente! Por favor, escolha outro email.' });
    } else if (loginExists) {
      res.status(400).json({ error: 'Login já existente! Por favor, escolha outro login.' });
    } else {
      const hashedPassword = await bcrypt.hash(senha, 10); // Hash a senha
      const newUser = await prisma.usuario.create({
        data: {
          nome,
          login: login.toLowerCase(),
          email: email.toLowerCase(),
          senha: hashedPassword,
          local_assoc,
        },
      });
      res.json(newUser);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: 'Error creating user: ' + error.message });
    } else {
      res.status(400).json({ error: 'Unknown error' });
    }
  }
});

// Login
router.post('/login', async (req, res) => {
  const { login, senha } = req.body;

  try {
    const user = await prisma.usuario.findUnique({
      where: { login: login.toLowerCase() },
    });

    if (user && bcrypt.compareSync(senha, user.senha)) {
      res.json({ message: 'Login successful', user });
    } else {
      res.status(401).json({ error: 'Invalid login or password' });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: 'Error during login: ' + error.message });
    } else {
      res.status(400).json({ error: 'Unknown error' });
    }
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await prisma.usuario.findMany();
    res.json(users);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: 'Error fetching users: ' + error.message });
    } else {
      res.status(400).json({ error: 'Unknown error' });
    }
  }
});

// Get a single user by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.usuario.findUnique({
      where: { id_usuario: Number(id) },
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: 'Error fetching user: ' + error.message });
    } else {
      res.status(400).json({ error: 'Unknown error' });
    }
  }
});

// Update a user
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, login, email, senha, local_assoc } = req.body;
  try {
    const updatedUser = await prisma.usuario.update({
      where: { id_usuario: Number(id) },
      data: { nome, login, email, senha, local_assoc },
    });
    res.json(updatedUser);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: 'Error updating user: ' + error.message });
    } else {
      res.status(400).json({ error: 'Unknown error' });
    }
  }
});

// Delete a user
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.usuario.delete({
      where: { id_usuario: Number(id) },
    });
    res.json({ message: 'User deleted' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: 'Error deleting user: ' + error.message });
    } else {
      res.status(400).json({ error: 'Unknown error' });
    }
  }
});

export default router;
