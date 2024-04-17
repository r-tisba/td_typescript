import mongoose, {Schema} from "mongoose"
import { IFilm } from './Film';

export interface ISession {
    film: IFilm;
    date: Date;
    time: string;
    availableSeats: number;
}

export const schemaSeance = new Schema({
    film: [{ type: Schema.Types.ObjectId, ref: 'Film' }],
    date: Date,
    time: String,
    availableSeats: Number,
})