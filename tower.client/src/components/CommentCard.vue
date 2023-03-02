<template>
    <div class="bg-secondary p-3">
        <h5 class="text-end text-success">Join the converstaion</h5>
        <form action="">
            <div class="form-floating py-3">
                <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2"
                    style="height: 100px" maxlength="2500" minlength="2"></textarea>
                <label for="floatingTextarea2">Tell the people...</label>
                <div class="d-flex justify-content-end py-3">
                    <button class="btn bg-success text-dark fw-bold" type="submit">post comment</button>
                </div>
            </div>
        </form>

        <div class="row d-flex align-items-center" v-for="c in comments">
            <div class="col-4 col-md-2 col-xl-1 py-2 text-center">
                <img class="rounded-circle comment-pic " :src="c.creator.picture" :alt="c.creator.name">
            </div>
            <div class="col-8 col-md-10 col-xl-11 py-2 ">
                <div class="bg-info comment-area rounded p-2">
                    <span><b>{{ c.creator.name }}</b> <b v-if="c.isAttending" class="text-primary">Attending this
                            event</b></span>
                    <p>{{ c.body }}</p>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { AppState } from '../AppState.js';
import { watchEffect, computed } from 'vue';
import { useRoute } from 'vue-router';
import { commentsService } from '../services/CommentsService.js';
import Pop from '../utils/Pop.js';

export default {
    setup() {
        const route = useRoute();

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
            comments: computed(() => AppState.comments)
        }
    }
}
</script>


<style lang="scss" scoped>
.comment-pic {
    height: 7vh;
    width: 7vh;
}

.comment-area {
    min-height: 7vh;

}
</style>