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
}

export const ticketsService = new TicketsService()