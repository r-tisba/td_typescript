import express, { Router, Request, Response } from "express";
import { IDirector, schemaReal } from "../models/Realisateur";
import mongoose from "mongoose";

const router: Router = express.Router();
const Realisateur = mongoose.model("Realisateur", schemaReal);

router.get("/", async (req: Request, res: Response) => {
  try {
    const directors: IDirector[] = await Realisateur.find();
    res.status(200).json(directors);
  } catch (error) {
    console.log(error);
    res.status(500).send('Erreur lors du read all');
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  const id: string = req.params.id;
  try {
    const director: IDirector | null = await Realisateur.findById(id);
    if (director) {
      res.status(200).json(director);
    } else {
      res.status(404).json({ message: "Director not found" });
    }
  } catch (error) {
    res.status(500).send('Erreur lors du read');
  }
});

router.post("/", async (req: Request, res: Response) => {
  const directorData: IDirector = req.body;
  try {
    const newDirector = new Realisateur(directorData);
    const savedDirector = await newDirector.save() as IDirector;
    res.status(201).json(savedDirector);
  } catch (error) {
    console.log(error)
    res.status(500).send('Erreur lors du input');
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const directorData: IDirector = req.body;
  try {
    const updatedDirector: IDirector | null = await Realisateur.findByIdAndUpdate(
      id,
      directorData,
      { new: true }
    );
    if (updatedDirector) {
      res.status(200).json(updatedDirector);
    } else {
      res.status(404).json({ message: "Director not found" });
    }
  } catch (error) {
    res.status(500).send('Erreur lors du update');
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  const id: string = req.params.id;
  try {
    const deletedDirector: IDirector | null = await Realisateur.findByIdAndDelete(
      id
    );
    if (deletedDirector) {
      res.status(200).json(deletedDirector);
    } else {
      res.status(404).json({ message: "Director not found" });
    }
  } catch (error) {
    res.status(500).send('Erreur lors du delete');
  }
});

export default router;
