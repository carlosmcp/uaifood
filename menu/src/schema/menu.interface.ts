
import { Document } from 'mongoose';
import { Exclude } from 'class-transformer';
import { ObjectId } from 'mongodb';

export interface MenuInterface extends Document {
    name:string
    restaurantId: ObjectId;
    itens: Object;
    description:string;
    price: Number;
    ingredients: [String];
    createdAt: number;
    updatedAt: number;
}