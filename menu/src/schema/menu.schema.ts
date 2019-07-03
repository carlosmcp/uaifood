import * as mongoose from 'mongoose';
import { Exclude } from 'class-transformer';
import { ObjectId } from 'mongodb';

export const schema = new mongoose.Schema({
    name: String,
    restaurantId: ObjectId,
    ingredients: [String],
    description: String,
    price: Number,
    createdAt: Number,
    updatedAt: Number
});

export const name = "Menu";
