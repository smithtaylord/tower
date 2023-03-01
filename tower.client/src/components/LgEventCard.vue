<template>
    <div class="m-3 p-3 mt-5">
        <div class="row">
            <div class="col-4">
                <img class="img-fluid" :src="event.coverImg" :alt="event.name">
            </div>
            <div class="col-8">
                <div class="row">
                    <div class="col-3 offset-9">
                        <div class="text-end">
                            <div class="dropdown">
                                <div type="button" class="selectable" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="text-primary mdi mdi-dots-horizontal fs-1 "></i>
                                </div>
                                <div class="dropdown-menu text-center fs-5">
                                    <div class="list-group">
                                        <span> edit event<i @click="" type="button" class="mdi mdi-lead-pencil my-2"
                                                data-bs-toggle="modal" data-bs-target="#exampleModal"></i></span>
                                    </div>
                                    <div class="list-group">
                                        <span> cancel event<i @click="" type="button"
                                                class="mdi mdi-trash-can-outline text-danger my-2"></i></span>
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
                <div class="d-flex justify-content-between">
                    <h3>{{ event.capacity }} spots left</h3>
                    <button class="btn bg-warning">Attend <i class="mdi mdi-human"></i></button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { computed } from 'vue';
import { AppState } from '../AppState.js';

export default {
    setup() {
        return {
            event: computed(() => AppState.event)
        }
    }
}
</script>


<style lang="scss" scoped></style>