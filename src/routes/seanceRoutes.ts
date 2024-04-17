import { Router, Request, Response } from "express";
import mongoose from 'mongoose';
import { ISession, schemaSeance } from "../models/Seance";

const Seance = mongoose.model('Seance', schemaSeance);
const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const sessions = await Seance.find();
    res.status(200).json(sessions);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors du read all');  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const session = await Seance.findById(req.params.id);
    if (!session) {
      return res.status(404).send('Séance non trouvée');
    }
    res.status(200).json(session);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors du read');
  }
});

router.post("/", async (req: Request, res: Response) => {
    const sessionData: ISession = req.body;
    try {
      const newSession = new Seance(sessionData);
      const savedSession = await newSession.save();
      res.status(201).json(savedSession);
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur lors du input');
    }
  });

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const updatedSession = await Seance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSession) {
      return res.status(404).send('Séance non trouvée');
    }
    res.status(200).json(updatedSession);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors du update');
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const deletedSession = await Seance.findByIdAndDelete(req.params.id);
    if (!deletedSession) {
      return res.status(404).send('Séance non trouvée');
    }
    res.status(200).json({ message: 'Séance supprimée avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors du delete');
  }
});

export default router;
