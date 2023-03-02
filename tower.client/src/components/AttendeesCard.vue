<template>
    <div class="p-2">
        <div class="bg-secondary p-2" v-for="a in attendees">
            <img class="rounded-circle attendee-pic" :src="a.profile.picture" :alt="a.profile.name" :title="a.profile.name">
        </div>
    </div>
</template>


<script>
import { computed } from 'vue';
import { AppState } from '../AppState.js';

export default {
    setup() {
        return {
            attendees: computed(() => AppState.attendees)
        }
    }
}
</script>


<style lang="scss" scoped>
.attendee-pic {
    height: 5vh;
    width: 5vh;
    object-fit: cover
}
</style>