<template>
    <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="ModalLabel">Create an Event</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">

            <form @submit.prevent="createEvent">

                <div class="row">
                    <div class="col-6">
                        <div class="form-floating mb-3">
                            <input required v-model="editable.name" type="text" class="form-control" id="floatingInput"
                                placeholder="name..." maxlength="100" minlength="2">
                            <label for="floatingInput">Name</label>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="form-floating mb-3">
                            <input required v-model="editable.coverImg" type="text" class="form-control" id="floatingInput"
                                placeholder="cover image..." maxlength="1000" minlength="2">
                            <label for="floatingInput">Cover Image</label>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <div class="form-floating mb-3">
                            <input required v-model="editable.location" type="text" class="form-control" id="floatingInput"
                                placeholder="location..." maxlength="100" minlength="2">
                            <label for="floatingInput">Location</label>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="form-floating mb-3">
                            <input required v-model="editable.startDate" type="datetime-local" class="form-control"
                                id="floatingInput" placeholder="location...">
                            <label for="floatingInput">Event Date</label>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <div class="form-floating mb-3">
                            <input required v-model="editable.capacity" type="number" class="form-control"
                                id="floatingInput" placeholder="name..." min="0">
                            <label for="floatingInput">Capacity</label>
                        </div>
                    </div>
                    <div class="col-6">

                        <div class="form-floating mb-3">
                            <select required v-model="editable.type" class="form-select"
                                aria-label="Default select example">
                                <option selected value="misc">Misc.</option>
                                <option value="concert">Concert</option>
                                <option value="convention">Convention</option>
                                <option value="sport">Sport</option>
                                <option value="digital">Digital</option>
                            </select>
                            <label for="type">Event Type</label>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <div class="form-floating">
                            <textarea required v-model="editable.description" class="form-control"
                                placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px"
                                maxlength="2500" minlength="2"></textarea>
                            <label for="floatingTextarea2">Event Description</label>
                        </div>
                    </div>
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { AppState } from '../AppState.js';
import { eventsService } from '../services/EventsService.js';
import Pop from '../utils/Pop.js';

export default {
    setup() {
        const router = useRouter()

        const editable = ref({})
        return {
            editable,
            async createEvent() {
                try {
                    const formData = editable.value
                    await eventsService.createEvent(formData)
                    editable.value = {}
                    router.push({ name: 'EventDetails', params: { eventId: AppState.event.id } })
                } catch (error) {
                    Pop.error(error, '[create event]')
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped></style>