import { Comment } from "../models/Comment.js"
import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class CommentsService {
    async getComments(eventId) {
        const res = await api.get(`api/events/${eventId}/comments`)
        logger.log(res.data, '[get comments]')
        AppState.comments = res.data.map(c => new Comment(c))
    }

    async createComment(formData) {
        const res = await api.post('api/comments', formData)
        logger.log(res.data, '[create comment]')
        AppState.comments.push(new Comment(res.data))
    }


}

export const commentsService = new CommentsService()