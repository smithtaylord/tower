<template>
  <div class="">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <h3 class="text-success"> My Events</h3>
          <div class="row scroll-y">
            <!-- TODO This is where MY EVENTS WILL GO IN THE FUTURE -->
            <div class="col-3" v-for="event in myEvents">
              <SmEventCard :event="event" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <h3 class="text-success">Upcoming events</h3>
          <div class="row">
            <div class="col-9 m-auto" v-for="ticket in myTickets">
              <TicketCard :ticket="ticket" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import SmEventCard from '../components/SmEventCard.vue';
import TicketCard from '../components/TicketCard.vue';
import { eventsService } from '../services/EventsService.js';
import { ticketsService } from '../services/TicketsService.js';
import Pop from '../utils/Pop.js';
export default {
  setup() {

    async function getEvents() {
      try {
        await eventsService.getEvents();
      }
      catch (error) {
        Pop.error(error, "[error getting events]");
      }
    }

    async function getMyTickets() {
      try {
        await ticketsService.getMyTickets()
      } catch (error) {
        Pop.error(error, '[get my tickets]')
      }
    }
    onMounted(() => {
      getMyTickets()
      getEvents()
    })

    return {
      account: computed(() => AppState.account),
      myTickets: computed(() => AppState.myTickets),
      myEvents: computed(() => AppState.events.filter(e => e.creator.id == AppState.account.id))
    };
  },
  components: { SmEventCard, TicketCard }
}
</script>

<style scoped>
img {
  max-width: 100px;
}

.scroll-y {
  overflow-y: auto;
  white-space: nowrap;
  height: 30vh;
}

.scroll-y .col-3 {
  display: inline-block;
  vertical-align: top;
}
</style>
