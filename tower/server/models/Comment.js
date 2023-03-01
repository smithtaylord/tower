import { Schema } from "mongoose";
import { basicStringType, defaultSchemaOptions } from "../db/Constants.js";

export const CommentSchema = new Schema({
    body: basicStringType,
    isAttending: { type: Boolean, default: false, required: true },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
    eventId: { type: Schema.Types.ObjectId, required: true, ref: 'Event' }

}, defaultSchemaOptions)

CommentSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true,
    ref: 'Account'

})