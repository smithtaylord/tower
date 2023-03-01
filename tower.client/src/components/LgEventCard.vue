<template>
    <div class="m-3 p-3 mt-5">
        <div class="row">
            <div class="col-4">
                <img class="img-fluid" :src="event.coverImg" :alt="event.name">
            </div>
            <div class="col-8">
                <div class="row">
                    <div class="col-3 offset-9">
                        <div v-if="event.creatorId == account.id && event.isCanceled == false" class="text-end">
                            <div class="dropdown">
                                <div type="button" class="selectable" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="text-primary mdi mdi-dots-horizontal fs-1 "></i>
                                </div>
                                <div class="dropdown-menu text-center fs-5">
                                    <div class="list-group">
                                        <span @click="" class="selectable"> edit event<i class="mdi mdi-lead-pencil my-2"
                                                data-bs-toggle="modal" data-bs-target="#exampleModal"></i></span>
                                    </div>
                                    <div class="list-group">
                                        <span @click="cancelEvent(event)" class="selectable"> cancel event<i
                                                class="mdi mdi-trash-can-outline text-danger my-2"></i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-between">
                    <div>
                        <h3>{{ event.name }}</h3>
                        <h4>{{ event.location }}</h4>
                    </div>
                    <div>
                        <h3>{{ event.date }}</h3>
                        <h4>{{ event.time }}</h4>
                        <h4></h4>
                    </div>
                </div>
                <div>
                    <p>
                        {{ event.description }}
                    </p>
                </div>
                <div class="d-flex justify-content-between">
                    <h3>{{ event.capacity }} spots left</h3>
                    <button class="btn bg-warning selectable">Attend <i class="mdi mdi-human"></i></button>
                </div>
                <div v-if="event.isCanceled == true">
                    <h1 class="text-danger">EVENT IS CANCELED</h1>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { computed } from 'vue';
import { AppState } from '../AppState.js';
import { eventsService } from '../services/EventsService.js';
import Pop from '../utils/Pop.js';

export default {
    setup() {
        return {
            event: computed(() => AppState.event),
            account: computed(() => AppState.account),

            async cancelEvent(event) {
                try {
                    if (await Pop.confirm('Are you sure you want to cancel this event?')) {
                        await eventsService.cancelEvent(event.id)
                    }
                } catch (error) {
                    Pop.error(error, '[cancelEvent]')
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped></style>