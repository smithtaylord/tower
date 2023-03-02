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
                                        <span data-bs-toggle="modal" data-bs-target="#editEventForm" class="selectable">
                                            edit event<i class="mdi mdi-lead-pencil my-2"></i></span>
                                    </div>
                                    <div class="list-group">
                                        <span @click="cancelEvent(event)" class="selectable"> cancel event<i
                                                class="mdi mdi-cancel text-danger my-2"></i></span>
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
                <div v-if="!event.isCanceled" class="d-flex justify-content-between">
                    <h3 v-if="event.capacity > 0"> <span class="text-info"> {{ event.capacity }} </span> spots left</h3>
                    <h3 v-else> <span class="text-danger">0</span> spots left</h3>
                    <div>
                        <button v-if="event.capacity <= 0" class="btn bg-danger" :disabled="event.capacity <= 0">Event Sold
                            Out
                            <i class="mdi mdi-human"></i></button>
                        <button v-else-if="!foundTicket" @click="createTicket(event.id)"
                            class="btn bg-warning selectable">Attend
                            <i class="mdi mdi-human"></i></button>
                        <button v-else-if="foundTicket" @click="deleteTicket(foundTicket.id)"
                            class="btn bg-info selectable">Return
                            Ticket <i class="mdi mdi-human"></i> </button>
                    </div>
                </div>
                <div v-else>
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
import { ticketsService } from '../services/TicketsService.js'
import Pop from '../utils/Pop.js';

export default {
    setup() {
        return {
            event: computed(() => AppState.event),
            account: computed(() => AppState.account),
            attendee: computed(() => AppState.attendees),
            foundTicket: computed(() => AppState.attendees.find(a => a.profile.id == AppState.account.id)),

            async cancelEvent(event) {
                try {
                    if (await Pop.confirm('Are you sure you want to cancel this event?')) {
                        await eventsService.cancelEvent(event.id)
                    }
                } catch (error) {
                    Pop.error(error, '[cancelEvent]')
                }
            },
            async createTicket(eventId) {
                try {
                    await ticketsService.createTicket(eventId)
                } catch (error) {
                    Pop.error(error, '[create ticket]')
                }
            },
            async deleteTicket(ticketId) {
                try {
                    await ticketsService.deleteTicket(ticketId)
                } catch (error) {
                    Pop.error(error, '[delete ticket]')
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped></style>