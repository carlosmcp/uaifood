
import { Document } from 'mongoose';
import { Exclude } from 'class-transformer';
import { ObjectId } from 'mongodb';
import { FoodEnum } from '../enum/restaurant.food';

export interface RestaurantInterface extends Document {
    _id: string;
    name: string;
    email: string;
    password: string;
    address: string;
    number: number;
    cellphone: string;
    country: string;
    state: string;
    city: string;
    postalCode: string;
    location: {
        type: String,
        coordinates:Number[]
    };
    food:FoodEnum;
    createdAt: number;
    updatedAt: number;
}