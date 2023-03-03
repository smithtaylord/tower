<template>
  <header>

  </header>
  <main class="bg-dark">
    <div>
      <Navbar />
      <router-view />
    </div>
  </main>
  <footer class="py-4 bg-dark bg-gradient footer">
    <Login />
  </footer>
  <Modal id="createEventForm">
    <CreateEventForm />
  </Modal>
  <Modal id="editEventForm">
    <EditEventForm />
  </Modal>
  <Modal id="editAccountForm">
    <EditAccountForm />
  </Modal>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import CreateEventForm from './components/CreateEventForm.vue'
import EditAccountForm from './components/EditAccountForm.vue'
import EditEventForm from './components/EditEventForm.vue'
import Login from './components/Login.vue'
import Modal from './components/Modal.vue'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar, Modal, CreateEventForm, EditEventForm, Login, EditAccountForm }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}
</style>
