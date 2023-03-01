<template>
    <div class="event-card">
        <router-link :to="{ name: 'EventDetails', params: { eventId: event.id } }">
            <img class="img-fluid event-img selectable" :src="event.coverImg" :alt="event.name">
        </router-link>
        <div class="event-body">
            <h5><b>{{ event.name }}</b></h5>
            <h6>{{ event.location }}</h6>
            <h6><b>{{ event.capacity }} spots left</b></h6>
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


<style lang="scss" scoped></style>