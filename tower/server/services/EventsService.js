import { dbContext } from "../db/DbContext.js"

class EventsService {
    async createEvent(eventData) {
        const event = await dbContext.Events.create(eventData)
        await event.populate('creator', 'name picture')
    }

}

export const eventsService = new EventsService()