<template>
    <div class="p-2">
        <div class="bg-secondary p-2">
            <span v-for="a in attendees">
                <img class="rounded-circle attendee-pic img-fluid p-1" :src="a.profile.picture" :alt="a.profile.name"
                    :title="a.profile.name">
            </span>
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
    height: 6vh;
    width: 6vh;
    object-fit: cover
}
</style>