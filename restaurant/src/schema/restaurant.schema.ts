import * as mongoose from 'mongoose';
import * as pointSchema from './point.schema'

export const schema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    address: String,
    number: Number,
    cellphone: String,
    country: String,
    state: String,
    city: String,
    postalCode: String,
    food: String,
    location: {
        type: pointSchema.schema,
        required: true
    },
    createdAt: Number,
    updatedAt: Number
});

export const name = "Restaurant";