import { AppState } from "../AppState.js"
import { Ticket } from "../models/Ticket.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class TicketsService {
    async createTicket(eventId) {
        const res = await api.post('api/tickets', { eventId })
        logger.log(res.data, '[creating ticket]')
        AppState.event.capacity--
    }

    async getMyTickets() {
        const res = await api.get('account/tickets')
        logger.log(res.data, '[getting my tickets]')
        AppState.myTickets = res.data.map(t => new Ticket(t))
    }
}

export const ticketsService = new TicketsService()