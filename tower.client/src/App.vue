<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <footer class="bg-dark text-light">
    Made with 💖 by CodeWorks
  </footer>
  <Modal id="createEventForm">
    <CreateEventForm />
  </Modal>
  <Modal id="editEventForm">
    <EditEventForm />
  </Modal>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import CreateEventForm from './components/CreateEventForm.vue'
import EditEventForm from './components/EditEventForm.vue'
import Modal from './components/Modal.vue'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar, Modal, CreateEventForm, EditEventForm }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
