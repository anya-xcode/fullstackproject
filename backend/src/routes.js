import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.post('/genres', async (req, res) => {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }          
    const genre = await prisma.genre.create({
      data: { name }
    });
    res.status(201).json(genre);
  } 
);


router.get('/genres', async (req, res) => {
    const genres = await prisma.genre.findMany({
      include: {
        books: {
          include: {
            book: true
          }
        }
      }
    });
    res.status(200).json(genres);
});

router.get('/genres/:id', async (req, res) => {
    const { id } = req.params;
    const genre = await prisma.genre.findUnique({
      where: { id: parseInt(id) },
      include: {
        books: {
          include: {
            book: true
          }
        }
      }
    });
    if (!genre) {
      return res.status(404).json({ error: 'Genre not found' });
    }
    res.status(200).json(genre);
  }
);


router.put('/genres/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    const genre = await prisma.genre.update({
      where: { id: parseInt(id) },
      data: { name }
    });
    res.status(200).json(genre);
});


router.delete('/genres/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.genre.delete({
      where: { id: parseInt(id) }
    });

    res.status(200).json({ message: 'Genre deleted successfully' });
  } 
);

export default router;
