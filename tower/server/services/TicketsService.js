import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"
import { eventsService } from "./EventsService.js"

class TicketsService {
    async createTicket(ticketData) {
        const event = await eventsService.getEventById(ticketData.eventId)
        if (event.isCanceled) {
            throw new Forbidden('This Event is cancelled')
        }

        // TODO IS THIS CORRECT???? IT PASSED THE TEST!
        event.capacity = event.capacity - 1
        await event.save()
        const ticket = await dbContext.Tickets.create(ticketData)
        await ticket.populate('profile', 'name picture')
        await ticket.populate('event')
        return ticket
    }

}

export const ticketsService = new TicketsService()