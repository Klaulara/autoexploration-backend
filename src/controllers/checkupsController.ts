import type { Request, Response } from 'express';
import { prisma } from "../lib/prisma.js";

const getAllCheckups = async (req: Request, res: Response) => {
  try {
    const checkups = await prisma.checkup.findMany();
    res.json(checkups);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve checkups" });
  }
};

const getCheckupsByUserId = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }
  try {
    const checkups = await prisma.checkup.findMany({
      where: { userId: userId },
    });
    res.json(checkups);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve checkups" });
  }
};

const addCheckup = async (req: Request, res: Response) => {
  const { userId, date, notes, pain, lumpDetected, asymmetry, temperature } = req.body;
  if (!userId || !date || pain === undefined || lumpDetected === undefined || asymmetry === undefined || temperature === undefined) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const newCheckup = await prisma.checkup.create({
      data: {
        userId: userId,
        date: date,
        notes: notes,
        pain: pain,
        lumpDetected: lumpDetected,
        asymmetry: asymmetry,
        temperature: temperature,
      },
    });
    res.status(201).json(newCheckup);
  } catch (error) {
    res.status(500).json({ error: "Failed to add checkup" });
  }
};

export { getAllCheckups, getCheckupsByUserId, addCheckup };