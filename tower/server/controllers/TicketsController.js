import { Auth0Provider } from "@bcwdev/auth0provider";
import { ticketsService } from "../services/TicketsService.js";
import BaseController from "../utils/BaseController.js";

export class TicketsController extends BaseController {
    constructor() {
        super('api/tickets')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTicket)
            .delete('/:ticketId', this.deleteTicket)

    }
    async createTicket(req, res, next) {
        try {
            const ticketData = req.body
            ticketData.accountId = req.userInfo.id
            const ticket = await ticketsService.createTicket(ticketData)
            return res.send(ticket)
        } catch (error) {
            next(error)
        }
    }
    async deleteTicket(req, res, next) {
        try {
            const ticketId = req.params.ticketId
            const requestorId = req.userInfo.id
            const ticket = await ticketsService.deleteTicket(ticketId, requestorId)
            return res.send(ticket)

        } catch (error) {
            next(error)
        }
    }
}