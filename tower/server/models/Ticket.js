import { Schema } from "mongoose";
import { defaultSchemaOptions } from "../db/Constants.js";

export const TicketSchema = new Schema({
    eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
    accountId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
}, defaultSchemaOptions)

TicketSchema.virtual('profile', {
    localField: 'accountId',
    foreignField: '_id',
    justOne: true,
    ref: 'Account'
})

TicketSchema.virtual('event', {
    localField: 'eventId',
    foreignField: '_id',
    justOne: true,
    ref: 'Event'
})

TicketSchema.index({ eventId: 1, account: 1 }, { unique: true })