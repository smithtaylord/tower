import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import { ticketsService } from '../services/TicketsService.js'
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/tickets', this.getMyTickets)
    // .put('', this.editAccount)
  }

  // FIXME THIS IS WHERE TO EDIT ACCOUNT INFO. 
  // async editAccount(req, res, next) {
  //   try {
  //     const accountData = req.body
  //     const userId = req.userInfo.id
  //     const account = await accountService.updateAccount(userId, accountData)
  //     return res.send(account)
  //   } catch (error) {
  //     next(error)
  //   }
  // }
  async getMyTickets(req, res, next) {
    try {
      const accountId = req.userInfo.id
      const tickets = await ticketsService.getMyTickets(accountId)
      return res.send(tickets)
    } catch (error) {
      next(error)
    }
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }
}
