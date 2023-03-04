<template>
    <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="ModalLabel">Edit your Event</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <form @submit.prevent="editEvent">


                <div class="form-floating mb-3">
                    <input required v-model="editable.name" type="text" class="form-control" id="name" for="name"
                        placeholder="name..." maxlength="100" minlength="2">
                    <label for="floatingInput">Name</label>
                </div>
                <div class="form-floating mb-3">
                    <input required v-model="editable.capacity" type="number" class="form-control" id="event-capacity"
                        for="event-capacity" placeholder="name..." min="0">
                    <label for="floatingInput">Capacity</label>
                </div>
                <div class="form-floating mb-3">
                    <input required v-model="editable.location" type="text" class="form-control" id="location"
                        for="location" placeholder="location..." maxlength="100" minlength="2">
                    <label for="floatingInput">Location</label>
                </div>
                <div class="form-floating">
                    <textarea required v-model="editable.description" class="form-control"
                        placeholder="Leave a comment here" id="event-description" for="event-description"
                        style="height: 100px" maxlength="2500" minlength="2"></textarea>
                    <label for="floatingTextarea2">Event Description</label>
                </div>

                <div class="modal-footer">
                    <button type="reset" class="btn bg-secondary selectable" data-bs-dismiss="modal">Close</button>
                    <button type="submit" data-bs-dismiss="modal" class="btn bg-primary selectable">Submit</button>
                </div>
            </form>

        </div>
    </div>
</template>


<script>
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import { eventsService } from '../services/EventsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
    setup() {
        const route = useRoute()
        const editable = ref({})
        watchEffect(() => {
            if (AppState.event != null) {
                editable.value = { ...AppState.event }
            } else {
                editable.value = {}
            }
        })
        return {
            editable,

            async editEvent() {
                try {
                    // logger.log(editable.value)
                    const eventId = route.params.eventId
                    const formData = editable.value
                    await eventsService.editEvent(eventId, formData)
                } catch (error) {
                    Pop.error(error, '[edit event]')
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped></style>