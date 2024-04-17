import { Router, Request, Response } from "express";
import mongoose from 'mongoose';
import { IFilm, schemaFilm } from "../models/Film";

const Film = mongoose.model('Film', schemaFilm);
const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const films = await Film.find();
    res.status(200).json(films);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors du read all');
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const film = await Film.findById(req.params.id);
    if (!film) {
      return res.status(404).send('Film non trouvé');
    }
    res.status(200).json(film);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors du read');
  }
});

router.post("/", async (req: Request, res: Response) => {
    const filmData: IFilm = req.body;
    try {
      const newFilm = new Film(filmData);
      const savedFilm = await newFilm.save();
      res.status(201).json(savedFilm);
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur lors du input');
    }
  });

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const updatedFilm = await Film.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedFilm) {
      return res.status(404).send('Film non trouvé');
    }
    res.status(200).json(updatedFilm);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors du update');
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const deletedFilm = await Film.findByIdAndDelete(req.params.id);
    if (!deletedFilm) {
      return res.status(404).send('Film non trouvé');
    }
    res.status(200).json({ message: 'Film supprimé avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors du delete');
  }
});

export default router;
