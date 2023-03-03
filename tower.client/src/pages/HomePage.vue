<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="m-3 p-3 bg-dark fancy-text fs-3 background-image blue-border tower-box-shadow text-info"
          style="background-image: url(unsplash_kcJsQ3PJrYU.jpg); background-size: cover;">
          <p class="p-4">Get ahead of the scalpers. <br> Reserve your seat now with <br> real events for real people.
          </p>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-22">
        <div class="m-3 pt-2 bg-secondary rounded tower-box-shadow">
          <div class="row">
            <div class="col-2 ">
              <h4 @click="changeFilterCategory('')"
                class="fancy-hover text-center  fancy-text fs-4 align-items-center p-3 bottom-border-hover">All</h4>

            </div>
            <div class="col-2">
              <h4 @click="changeFilterCategory('concert')"
                class="text-center fancy-hover fancy-text fs-4 align-items-center p-3 bottom-border-hover">Concert
              </h4>

            </div>
            <div class="col-2">
              <h4 @click="changeFilterCategory('convention')"
                class="text-center fancy-hover fancy-text fs-4 align-items-center p-3 bottom-border-hover">
                Convention
              </h4>

            </div>
            <div class="col-2">
              <h4 @click="changeFilterCategory('sport')"
                class="text-center fancy-hover fancy-text fs-4 align-items-center p-3 bottom-border-hover">Sport
              </h4>

            </div>
            <div class="col-2">
              <h4 @click="changeFilterCategory('digital')"
                class="text-center fancy-hover fancy-text fs-4 align-items-center p-3 bottom-border-hover">Digital
              </h4>

            </div>
            <div class="col-2">
              <h4 @click="changeFilterCategory('misc')"
                class="text-center fancy-hover fancy-text fs-4 align-items-center p-3 bottom-border-hover">Misc.
              </h4>

            </div>
          </div>



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

  .blue-border {
    border: 5px solid #56C7FB;
  }

}
</style>
