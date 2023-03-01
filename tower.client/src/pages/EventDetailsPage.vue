<template>
    <div class="container-fluid" v-if="event.id">
        <div class="row">
            <div class="col-12">
                <LgEventCard />
            </div>
        </div>

        <div class="row">
            <div class="col-12">
                <div class="bg-dark mt-5">
                    <h1 class="text-light">See who is attending goes here!</h1>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-9 m-auto">
                <div class="bg-dark mt-5">
                    <h1 class="text-light">COMMENTS GO HERE!!</h1>
                </div>
            </div>
        </div>



    </div>
</template>


<script>
import { watchEffect, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { eventsService } from '../services/EventsService.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';
import LgEventCard from '../components/LgEventCard.vue';

export default {
    setup() {
        const route = useRoute();
        const router = useRouter();
        async function getEventById() {
            try {
                const eventId = route.params.eventId;
                await eventsService.getEventById(eventId);
            }
            catch (error) {
                Pop.error(error, "[getting event by id]");
            }
        }
        watchEffect(() => {
            if (route.params.eventId) {
                getEventById();
            }
        });
        return {
            event: computed(() => AppState.event)
        };
    },
    components: { LgEventCard }
}
</script>


<style lang="scss" scoped></style>