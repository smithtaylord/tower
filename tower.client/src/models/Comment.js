export class Comment {

    constructor(data) {
        this.id = data.id
        this.body = data.body
        this.creator = data.creator
        this.isAttending = data.isAttending
    }
}