<template>
    <div class="container-fluid" v-if="event.id">
        <div class="row">
            <div class="col-12">
                <LgEventCard />
            </div>
        </div>

        <div class="row">
            <div class="col-12">
                <h5 class="text-secondary p-2">See who is attending</h5>
                <AttendeesCard />
            </div>
        </div>

        <div class="row">
            <div class="col-9 m-auto">
                <h5 class="text-secondary">What are people saying</h5>
                <CommentCard />
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
import { ticketsService } from '../services/TicketsService.js';
import AttendeesCard from '../components/AttendeesCard.vue';
import CommentCard from '../components/CommentCard.vue';

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

        async function getAttendees() {
            try {
                const eventId = route.params.eventId
                await ticketsService.getAttendees(eventId)
            } catch (error) {
                Pop.error(error, '[message]')
            }

        }
        watchEffect(() => {
            if (route.params.eventId) {
                getEventById();
                getAttendees()
            }
        });
        return {
            event: computed(() => AppState.event),
            foundTicket: computed(() => AppState.myTickets.find(t => t.accountId == AppState.account.id))
        };
    },
    components: { LgEventCard, AttendeesCard, CommentCard }
}
</script>


<style lang="scss" scoped></style>