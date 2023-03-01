import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { eventsService } from "./EventsService.js"

class TicketsService {
    async getEventTickets(eventId) {
        const tickets = await dbContext.Tickets.find({ eventId })
            .populate('profile', 'name picture')
        return tickets
    }
    async getMyTickets(accountId) {
        const tickets = await dbContext.Tickets.find({ accountId })
            .populate('event')
        return tickets
    }
    async createTicket(ticketData) {
        const event = await eventsService.getEventById(ticketData.eventId)
        if (event.isCanceled) {
            throw new Forbidden('This Event is cancelled')
        } if (event.capacity <= 0) {
            throw new BadRequest('This event is sold out')
        }

        event.capacity = event.capacity - 1
        await event.save()
        const ticket = await dbContext.Tickets.create(ticketData)
        await ticket.populate('profile', 'name picture')
        await ticket.populate('event')
        return ticket
    }

    async deleteTicket(ticketId, requestorId) {
        const ticket = await dbContext.Tickets.findById(ticketId)
        if (!ticket) {
            throw new BadRequest('Invald Id')
        }
        if (ticket.accountId.toString() !== requestorId) {
            throw new Forbidden('You are not allowed to delete this ticket')
        }
        await ticket.remove()

        const event = await dbContext.Events.findById(ticket.eventId)
        // @ts-ignore
        event.capacity = event.capacity + 1
        // @ts-ignore
        await event.save()


        // event.capacity = event.capacity + 1
        // await event.save()
        return ticket
    }
}

export const ticketsService = new TicketsService()