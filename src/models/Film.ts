import mongoose, {Schema} from "mongoose"
import { IDirector } from './Realisateur';

export interface IFilm {
    title: string; 
    releaseYear: number; 
    genre: string; 
    directors: IDirector[];
}

export const schemaFilm = new Schema({
    title: String, 
    releaseYear: Number,
    genre: String,
    directors: [{ type: Schema.Types.ObjectId, ref: 'Realisateur' }]
})