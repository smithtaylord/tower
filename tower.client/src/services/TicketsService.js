import { AppState } from "../AppState.js"
import { Attendee } from "../models/Attendee.js"
import { Ticket } from "../models/Ticket.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class TicketsService {
    async createTicket(eventId) {
        const res = await api.post('api/tickets', { eventId })
        logger.log(res.data, '[creating ticket]')
        AppState.event.capacity--
        this.getAttendees(eventId)
    }

    async getMyTickets() {
        const res = await api.get('account/tickets')
        logger.log(res.data, '[getting my tickets]')
        AppState.myTickets = res.data.map(t => new Ticket(t))

    }

    async getAttendees(eventId) {
        const res = await api.get(`api/events/${eventId}/tickets`)
        logger.log(res.data, '[getting attendees]')
        AppState.attendees = res.data.map(a => new Attendee(a))
    }

    async deleteTicket(ticketId) {
        const res = await api.delete('api/tickets/' + ticketId)
        logger.log(res.data, '[delete ticket]')
        let attendeeIndex = AppState.attendees.findIndex(a => a.id == ticketId)
        AppState.attendees.splice(attendeeIndex, 1)
        let ticketIndex = AppState.myTickets.findIndex(t => t.id == ticketId)
        AppState.myTickets.splice(ticketIndex, 1)
        if (AppState.event) {
            AppState.event.capacity++
        }

    }
}

export const ticketsService = new TicketsService()