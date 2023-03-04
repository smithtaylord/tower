<template>
    <div class="bg-secondary my-4 tower-box-shadow">
        <div class="row align-items-center">
            <div class="col-4">
                <router-link :to="{ name: 'EventDetails', params: { eventId: ticket.eventId } }">
                    <img class="img-fluid ticket-pic" :src="ticket.coverImg" alt="">
                </router-link>
            </div>
            <div class="col-lg-5 col-xxl-6 d-flex justify-content-between flex-column">
                <div class="p-3 fancy-text">
                    <h5 class="fs-4 text-body-bg text-shadow">{{ ticket.name }}</h5>
                    <h5 class="text-info text-shadow">{{ ticket.location }}</h5>
                    <h5 class="text-info text-shadow">{{ ticket.date }}</h5>
                </div>
                <div class="text-end ps-5 py-5">
                    <button @click="deleteTicket(ticket.id)"
                        class="btn bg-danger text-dark fw-bold selectable not-going">not
                        going</button>
                </div>
            </div>
            <div class="col-2">
                <div class="bg-dark punch d-none d-lg-block"></div>
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
                    if (await Pop.confirm("Are you sure you want to delete this ticket?")) {
                        await ticketsService.deleteTicket(ticketId)
                    }
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
    height: 30vh;
    width: 30vh;
    object-fit: cover;
}

.punch {
    height: 16vh;
    width: 16vh;
    border-radius: 50%;
    transform: translateX(10vh);
    box-shadow: -1px 0px 1px 0px #171920;
    // box-shadow: -30px 0px -30px 0px #171920;
}

.fancy-text {
    font-family: 'Inter', sans-serif
}

.text-shadow {
    text-shadow: 1px 1px 2px black;
}

.not-going {
    width: 10vw;
    transform: translateX(5vw);
}
</style>