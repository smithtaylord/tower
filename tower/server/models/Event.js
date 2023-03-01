import { Schema } from "mongoose";
import { basicStringType, defaultSchemaOptions } from "../db/Constants.js";

export const EventSchema = new Schema({
    name: basicStringType,
    description: basicStringType,
    coverImg: basicStringType,
    location: basicStringType,
    capacity: { type: Number, required: true },
    startDate: { type: Date, required: true },
    isCanceled: { type: Boolean, default: false, required: true },
    type: { ...basicStringType, enum: ['concert', 'convention', 'sport', 'digital'] },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
}, defaultSchemaOptions)

EventSchema.virtual('creator', {
    ref: 'Account',
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true
})