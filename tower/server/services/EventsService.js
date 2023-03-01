import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class EventsService {

    async editEvent(eventData, eventId, requestorId) {
        const event = await this.getEventById(eventId)
        if (event.isCanceled) {
            throw new BadRequest('This event has already been canceled')
        }
        // TODO FORBIDDEN REQUEST GOES HERE, has to authenticate user information.
        if (event.creatorId.toString() != requestorId) {
            throw new Forbidden('You are not allowed to perform this action, this is not your event to cancel')
        }
        event.name = eventData.name || event.name
        event.description = eventData.description || event.description
        await event.save()
        return event

    }
    async getAllEvents() {
        const events = await dbContext.Events.find()
            .populate('creator', 'name picture')
        return events
    }
    async getEventById(eventId) {
        const event = await dbContext.Events.findById(eventId).populate('creator', 'name picture')
        if (!event) {
            throw new BadRequest('Invalid Event Id')
        }
        return event
    }
    async createEvent(eventData) {
        const event = await dbContext.Events.create(eventData)
        await event.populate('creator', 'name picture')
        return event
    }
    // TODO I need to ask about this as to why it is not passing both tests?
    async cancelEvent(eventId, requestorId) {
        const event = await this.getEventById(eventId)
        if (event.isCanceled) {
            throw new BadRequest('This event has already been canceled')
        }
        if (event.creatorId.toString() != requestorId) {
            throw new Forbidden('You are not allowed to perform this action, this is not your event to cancel')
        }
        event.isCanceled = true
        await event.save()
        return event
    }

}

export const eventsService = new EventsService()