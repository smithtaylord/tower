<template>
    <div class="bg-secondary p-3 tower-box-shadow mb-5">
        <div v-if="account.id || !event.isCanceled && account.id">
            <h5 class="text-end text-success">Join the converstaion</h5>
            <form @submit.prevent="createComment">
                <div class="py-3">
                    <textarea required v-model="editable.body" class="form-control p-2" placeholder="Tell the people..."
                        style="height: 100px" maxlength="2500" minlength="2"></textarea>
                    <div class="d-flex justify-content-end py-3">
                        <button class="btn bg-success text-dark fw-bold" type="submit">post comment</button>
                    </div>
                </div>
            </form>
        </div>

        <div class="row d-flex align-items-center" v-for="c in comments">
            <div class="col-3 col-md-2 col-xl-1 py-2 text-center">
                <img class="rounded-circle comment-pic img-fluid tower-box-shadow" :src="c.creator.picture"
                    :alt="c.creator.name">
            </div>
            <div class="col-9 col-md-10 col-xl-11 py-2 ">
                <div class="bg-info comment-area rounded p-2 tower-box-shadow">
                    <div class="d-flex justify-content-between">
                        <div>
                            <span>
                                <b>{{ c.creator.name }}</b>
                                <b v-if="attendees.find(a => a.accountId == c.creator.id)" class="text-secondary"><i
                                        class="mdi mdi-check ms-4"></i>
                                    Attending
                                </b>
                            </span>
                        </div>
                        <div>
                            <i v-if="c.creator.id == account.id" @click="deleteComment(c)"
                                class="mdi mdi-close-circle-outline text-danger text-end rounded fs-4 selectable"
                                title="delete-comment"></i>
                        </div>
                    </div>
                    <p>{{ c.body }}</p>
                </div>
            </div>
        </div>

        <div v-if="!account.id || (event.isCanceled && comments.length == 0)" class="p-3">
            <h5>There are no comments for this event...</h5>
        </div>
    </div>
</template>


<script>
import { AppState } from '../AppState.js';
import { watchEffect, computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { commentsService } from '../services/CommentsService.js';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';

export default {
    setup() {
        const route = useRoute();
        const editable = ref({})

        async function getComments() {
            try {
                const eventId = route.params.eventId
                await commentsService.getComments(eventId)
            } catch (error) {
                Pop.error(error, '[get comments]')
            }
        }
        watchEffect(() => {
            if (route.params.eventId) {
                getComments()
            }
        })
        return {
            editable,
            comments: computed(() => AppState.comments),
            account: computed(() => AppState.account),
            event: computed(() => AppState.event),
            attendees: computed(() => AppState.attendees),
            async createComment() {
                try {
                    // TODO Is this the right way to do this? Or is there an easier way to attach the eventId?
                    let formData = editable.value
                    const eventId = route.params.eventId
                    formData.eventId = eventId
                    // logger.log(formData, eventId)
                    await commentsService.createComment(formData)
                    editable.value = {}

                } catch (error) {
                    Pop.error(error, '[create comment]')
                }
            },
            async deleteComment(comment) {
                try {
                    if (await Pop.confirm('Are you sure you want to delete this comment?')) {
                        const commentId = comment.id
                        await commentsService.deleteComment(commentId)
                    }
                } catch (error) {
                    Pop.error(error, '[delete comment]')
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped>
.comment-pic {
    width: 60px;
    height: 60px;
    object-fit: cover;
    display: block;
}

.comment-area {
    min-height: 7vh;

}

.text-shadow {
    text-shadow: 1px 1px 2px black;
    color: whitesmoke;
}
</style>