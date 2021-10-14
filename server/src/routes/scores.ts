import express from 'express';
import { useImperativeHandle } from 'react';
import { prisma } from '../common';

export const scoresRoutes = express.Router();

scoresRoutes.get('/', async (req, res) => {
  const scores = await prisma.user.findMany()

  res.status(200).json(scores)
})

scoresRoutes.post('/', async (req, res) => {
  const { score, uuid } = req.body

  const createdScore = await prisma.user.update({
    where: {
      uuid
    },
    data: {
      score
    }
  })

  res.status(201).json(createdScore)
})

scoresRoutes.patch('/:id', async (req, res) => {
  const { score } = req.body

  const userId = req.params.id

  const currentScore = await prisma.user.findFirst({
    where: {
      id: parseInt(userId as string)
    }
  })

  if (score > currentScore!) {
    const updatedScore = await prisma.user.update({
      where: {
        id: parseInt(userId as string)
      },
      data: {
        score
      }
    })

    res.status(200).json(updatedScore)
  }

  res.status(200).end()
})

scoresRoutes.delete('/:id', async (req, res) => {
  const userId = req.params.id

  const deletedScore = await prisma.user.delete({
    where: {
      id: parseInt(userId as string)
    }
  })

  res.send(204).end()
})