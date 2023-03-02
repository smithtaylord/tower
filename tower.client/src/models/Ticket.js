import { Event } from "./Event.js"


export class Ticket extends Event {
    constructor(data) {
        super(data.event)
        this.id = data.id
        this.accountId = data.accountId
        this.eventId = data.eventId
        this.event = data.event
    }
}