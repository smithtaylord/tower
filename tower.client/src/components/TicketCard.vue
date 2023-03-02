<template>
    <div class="bg-secondary my-3">
        <div class="row align-items-center">
            <div class="col-4">
                <router-link :to="{ name: 'EventDetails', params: { eventId: ticket.eventId } }">
                    <img class="img-fluid ticket-pic" :src="ticket.coverImg" alt="">
                </router-link>
            </div>
            <div class="col-6 d-flex justify-content-between flex-column">
                <div class="p-3">
                    <h4 class="text-light">{{ ticket.name }}</h4>
                    <h5 class="text-info">{{ ticket.location }}</h5>
                    <h5 class="text-info">{{ ticket.date }}</h5>
                </div>
                <div class="text-end p-5">
                    <button @click="deleteTicket(ticket.id)" class="btn bg-danger text-dark selectable">not going</button>
                </div>
            </div>
            <div class="col-2">
                <div class="bg-dark punch"></div>
            </div>
        </div>
    </div>
</template>


<script>
import { Ticket } from '../models/Ticket.js';
import { ticketsService } from '../services/TicketsService.js';
import Pop from '../utils/Pop.js';

export default {
    props: {
        ticket: {
            type: Ticket,
            required: true
        }
    },
    setup() {
        return {
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
.ticket-pic {
    height: 25vh;
}

.punch {
    height: 15vh;
    width: 15vh;
    border-radius: 50%;
    transform: translateX(5vh);
}
</style>