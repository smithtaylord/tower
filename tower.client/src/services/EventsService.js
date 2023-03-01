import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { AppState } from "../AppState.js"
import { Event } from "../models/Event.js"

class EventsService {
    async getEvents() {
        const res = await api.get('api/events')
        logger.log(res.data, '[events]')
        AppState.events = res.data.map(e => new Event(e))
    }

    async getEventById(eventId) {
        AppState.event = {}
        const res = await api.get('api/events/' + eventId)
        logger.log(res.data, '[getting event by id')
        AppState.event = new Event(res.data)
    }

    async createEvent(formData) {
        const res = await api.post('api/events', formData)
        logger.log(res.data, '[creating event]')
        AppState.events.push(new Event(res.data))
    }

    async cancelEvent(eventId) {
        const res = await api.delete('api/events/' + eventId)
        logger.log(res.data, '[canceled event]')
        AppState.event.isCanceled = true
    }
}

export const eventsService = new EventsService()