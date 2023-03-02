<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="m-3 p-3 bg-dark fancy-text fs-3">
          <p>Get ahead of the scalpers. <br> Reserve your seat now with <br> real events for real people. </p>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <div class="m-3 p-3 bg-dark d-flex justify-content-around">
          <button @click="changeFilterCategory('')" class="btn bg-success fancy-text fs-3">All</button>
          <button @click="changeFilterCategory('concert')" class="btn bg-success fancy-text fs-3">Concert</button>
          <button @click="changeFilterCategory('convention')" class="btn bg-success fancy-text fs-3">Convention</button>
          <button @click="changeFilterCategory('sport')" class="btn bg-success fancy-text fs-3">Sport</button>
          <button @click="changeFilterCategory('digital')" class="btn bg-success fancy-text fs-3">Digital</button>
          <button @click="changeFilterCategory('misc')" class="btn bg-success fancy-text fs-3">Misc.</button>
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
import { onMounted, computed, ref } from 'vue';
import { eventsService } from '../services/EventsService.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';
import SmEventCard from '../components/SmEventCard.vue';

export default {
  setup() {
    const filterCategory = ref('')
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
      events: computed(() => {
        if (!filterCategory.value) {
          return AppState.events
        } else {
          return AppState.events.filter(e => e.type == filterCategory.value)
        }
      }),
      myTickets: computed(() => AppState.myTickets),

      changeFilterCategory(category) {
        filterCategory.value = category
      }
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

  .fancy-text {
    font-family: 'Alegreya Sans', sans-serif
  }

}
</style>
