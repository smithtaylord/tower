<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="m-3 p-3 bg-dark">
          <p>Get ahead of the scalpers. <br> Reserve your seat now with <br> real events for real people. </p>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <div class="m-3 p-3 bg-dark d-flex justify-content-around">
          <button class="btn bg-success">All</button>
          <button class="btn bg-success">Concert</button>
          <button class="btn bg-success">Convention</button>
          <button class="btn bg-success">Sport</button>
          <button class="btn bg-success">Digital</button>
          <button class="btn bg-success">Misc.</button>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-3" v-for="event in events">
        <SmEventCard :event="event" />
      </div>
    </div>

  </div>
</template>

<script>
import { onMounted, computed } from 'vue';
import { eventsService } from '../services/EventsService.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';
import SmEventCard from '../components/SmEventCard.vue';

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

    onMounted(() => {
      getEvents();
    });
    return {
      events: computed(() => AppState.events),
      myTickets: computed(() => AppState.myTickets)
    };
  },
  components: { SmEventCard }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }

  .event-card {
    height: 20vh;
    width: 20vh;
  }

  .event-img {
    min-height: 15vh;
    width: 20vh;
    object-fit: cover;
  }

  .event-body {
    height: 5vh;
  }

}
</style>
