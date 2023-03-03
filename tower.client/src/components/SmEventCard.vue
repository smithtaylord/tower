<template>
    <div class="p-3">
        <div class="event-card tower-box-shadow card-border  rounded">
            <div class="card position-relative card-border rounded">
                <router-link :to="{ name: 'EventDetails', params: { eventId: event.id } }">
                    <img class="img-fluid event-img selectable" :src="event.coverImg" :alt="event.name"
                        :style="event.isCanceled ? { filter: 'grayscale(100%)' } : {}">
                    <div class="position-absolute bottom-0 start-0 glass-card rounded">
                        <h5 class="ps-2 pt-3 text-body-bg"><b>{{ event.name }}</b></h5>
                        <h6 class="ps-2 text-info">{{ event.location }}</h6>
                        <div v-if="!event.isCanceled">
                            <h6 v-if="event.capacity >= 1" class="ps-2 pb-1 text-info text-end"><b class="text-primary">{{
                                event.capacity }}</b> spots left</h6>
                            <h6 v-if="event.capacity <= 0" class="ps-2 pb-1 text-info text-end"><b class="text-danger">{{
                                event.capacity }}</b> spots left</h6>
                        </div>
                        <div v-else>
                            <h5 class="bg-danger w-100  no-shadow text-center"><b> Canceled</b></h5>
                        </div>

                    </div>
                </router-link>
                <!-- <div class="card-body"> -->
                <!-- </div> -->
            </div>
        </div>
    </div>
</template>


<script>
import { Event } from '../models/Event.js';

export default {
    props: {
        event: {
            type: Event,
            required: true
        }
    },
    setup() {
        return {}
    }
}
</script>


<style lang="scss" scoped>
.event-img {
    height: 27vh;
    width: 100%;
    object-fit: cover;
}

.event-body {
    height: 5vh;
}

.glass-card {
    color: white;
    text-shadow: 1px 1px 2px black;
    background-color: #404a4e6b;
    width: 100%;
    backdrop-filter: blur(7px)
}

.card-border {
    border: 3px solid #474C61;
}

.no-shadow {
    text-shadow: none;
    font-weight: 800;
    color: black;
}
</style>