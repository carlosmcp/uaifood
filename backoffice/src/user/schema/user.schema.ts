import * as mongoose from 'mongoose';
import { Exclude } from 'class-transformer';
import { ObjectId } from 'mongodb';

export const schema = new mongoose.Schema({
    name: String,
    email: String,
    role: String,
    restaurantId: String,    
    password: String,    
    createdAt: Number,
    updatedAt: Number
}); 

export const name = "User";
