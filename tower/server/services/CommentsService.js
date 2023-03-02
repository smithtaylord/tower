import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { eventsService } from "./EventsService.js"

class CommentsService {
    async deleteComment(commentId, requestorId) {
        const comment = await dbContext.Comments.findById(commentId)
        if (!comment) {
            throw new BadRequest('Invalid Comment Id')
        }
        if (comment.creatorId.toString() !== requestorId) {
            throw new Forbidden('You must be the comment creator to delete')
        }
        await comment.remove()
        return comment
    }
    async getEventComments(eventId) {
        const comments = await dbContext.Comments.find({ eventId }).populate('creator', 'name picture')
        return comments

    }
    async createComment(commentData) {
        const event = await eventsService.getEventById(commentData.eventId)
        if (event.isCanceled) {
            throw new Forbidden('This event has been canceled')
        }
        const comment = await dbContext.Comments.create(commentData)
        await comment.populate('creator', 'name picture')

        return comment
    }

}

export const commentsService = new CommentsService()