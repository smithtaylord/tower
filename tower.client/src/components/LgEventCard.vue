<template>
    <div :style="event.isCanceled ? { filter: 'grayscale(50%)' } : { backgroundImage: 'url(' + event.coverImg + ')', backgroundSize: 'cover' }"
        class="tower-box-shadow">
        <div class="px-3 mt-5 bg-card pt-4">
            <div class="row">
                <div class="col-3 offset-9">
                    <div v-if="event.creatorId == account.id && event.isCanceled == false" class="text-end">
                        <div class="dropdown">
                            <div type="button" class="" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="selectable text-primary mdi mdi-dots-horizontal fs-3 "
                                    title="edit/delete menu"></i>
                            </div>
                            <div class="dropdown-menu text-center fs-5">
                                <div class="list-group">
                                    <span data-bs-toggle="modal" data-bs-target="#editEventForm"
                                        class="selectable no-shadow">
                                        <i class="mdi mdi-lead-pencil my-2  pe-3">
                                        </i>edit event</span>
                                </div>
                                <div class="list-group">
                                    <span @click="cancelEvent(event)" class="selectable no-shadow">
                                        <i class="mdi mdi-cancel text-danger my-2  pe-2">
                                        </i> cancel event</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-4 pb-5">
                    <img class="img-fluid event-pic border" :src="event.coverImg" :alt="event.name"
                        :style="event.isCanceled ? { filter: 'grayscale(100%)' } : {}">
                </div>
                <div class="col-8">

                    <div class="d-flex justify-content-between ">
                        <div>
                            <h4 class="pb-3 fs-2">{{ event.name }}</h4>
                            <h4 class="text-info">{{ event.location }}</h4>
                        </div>
                        <div>
                            <h4 class="text-info pb-3 text-end pe-3 fs-3">{{ event.date }}</h4>
                            <h4 class="text-info text-end pe-3">{{ event.time }}</h4>
                        </div>
                    </div>
                    <div>
                        <p class="event-body pt-3">
                            {{ event.description }}
                        </p>
                    </div>
                    <div v-if="!event.isCanceled" class="d-flex justify-content-between">
                        <h4 v-if="event.capacity > 0"> <span class="text-info"><b class="fs-2 pe-2">{{ event.capacity
                        }}</b>
                            </span> spots left
                        </h4>
                        <h4 v-else> <span class="text-danger fs-3">0</span> spots left</h4>
                        <div class="px-3">

                            <!-- FIXME THESE BUTTONS NEED SOME IF AND OR STATMENTS -->
                            <button v-if="event.capacity <= 0" class="btn bg-danger sold-out me-5"
                                :disabled="event.capacity <= 0">Event
                                Sold
                                Out
                                <i class="mdi mdi-human"></i></button>
                            <button v-if="!foundTicket && event.capacity > 0 && account.id" @click="createTicket(event.id)"
                                class="btn bg-warning selectablem fs-5 p-2 tower-box-shadow hover" title="attend">Attend
                                <i class="mdi mdi-human"></i></button>
                            <button v-if="(foundTicket && event.capacity <= 0) || foundTicket"
                                @click="deleteTicket(foundTicket.id)"
                                class="btn bg-info selectable fs-5  p-2 tower-box-shadow hover" title="return ticket">Return
                                Ticket <i class="mdi mdi-human"></i> </button>
                        </div>
                    </div>
                    <div v-else>
                        <h1 class="">EVENT IS CANCELED</h1>
                    </div>
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
import { logger } from '../utils/Logger.js';
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
                    logger.log(error.message)
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


<style lang="scss" scoped>
.bg-card {
    backdrop-filter: blur(7px);
    background-color: #246c8e72;
    width: 100%;
    text-shadow: 1px 1px 2px black;
}

.event-pic {
    height: 35vh;
    width: 35vh;
    object-fit: cover;
}

.event-body {
    height: 20vh;
    overflow-y: auto;
}

.hover:hover {
    text-shadow: 1px 1px 2px black;
}

.no-filter {
    filter: grayscale(0%);
    color: #FF5977;
}

.no-shadow {
    text-shadow: none;
}

.sold-out {
    width: 20vw;
}
</style>