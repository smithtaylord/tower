<template>
    <div class="p-3">
        <div class="event-card">
            <div class="card position-relative">
                <router-link :to="{ name: 'EventDetails', params: { eventId: event.id } }">
                    <img class="img-fluid event-img selectable" :src="event.coverImg" :alt="event.name">
                    <div class="position-absolute bottom-0 start-0 glass-card rounded">
                        <h5 class="ps-2 pt-3"><b>{{ event.name }}</b></h5>
                        <h6 class="ps-2">{{ event.location }}</h6>
                        <h6 class="ps-2 pb-3"><b>{{ event.capacity }} spots left</b></h6>
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
.event-card {
    height: 27vh;
    width: 100%;
}

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
    background-color: #CCF3FD33;
    width: 100%;
}
</style>