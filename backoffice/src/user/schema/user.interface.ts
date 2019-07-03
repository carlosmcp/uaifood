import { Document, Type } from 'mongoose';
import { ObjectID } from 'bson';
    
export interface UserInterface extends Document {
    password: string;
    restaurantId: string;
    name: string;
    email: string;
    createdAt: number;
    updatedAt: number;
}