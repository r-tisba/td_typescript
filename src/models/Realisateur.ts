import mongoose, {Schema} from "mongoose"

export interface IDirector {
    name: string; 
    birthDate: Date; 
    biography: string;
}

export const schemaReal = new Schema({
    name: String,
    birthDate: Date, 
    biography: String,
})