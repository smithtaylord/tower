<template>
  <div class="">
    <button class="btn selectable text-success lighten-30 text-uppercase my-2 my-lg-0" @click="login"
      v-if="!user.isAuthenticated">
      Login
    </button>
    <div type="button" class=" my-3 p-2 text-center">
      <div v-if="account.picture || user.picture">
        <img :src="account.picture || user.picture" alt="account photo" height="40" class="rounded account-pic selectable"
          :title="account.name || user.name" />
      </div>
    </div>
    <router-link class="" :to="{ name: 'Home' }">
      <div class="text-center">
        <button class="btn-width p-3 btn bg-secondary text-info mb-3 fs-5 selectable"> home </button>
      </div>
    </router-link>
    <router-link :to="{ name: 'Account' }">
      <div class="text-center">
        <button class="btn-width p-3 btn bg-secondary text-info mb-3 fs-5 selectable"> Account </button>
      </div>
    </router-link>
    <div class="text-center p-1">
      <button type="button" class="btn-width btn bg-success text-secondary mb-3 px-2 py-3 fs-5 selectable"
        data-bs-toggle="modal" data-bs-target="#createEventForm">
        new event
      </button>
    </div>
    <div class="text-center p-1">
      <button class="btn-width p-3 btn bg-secondary text-info mb-3 fs-5 selectable" @click="logout">
        logout
      </button>
    </div>
  </div>



  <!-- <span class="navbar-text">
    <button class="btn selectable text-success lighten-30 text-uppercase my-2 my-lg-0" @click="login"
      v-if="!user.isAuthenticated">
      Login
    </button>
    <div v-else>
      <div class="dropdown dropstart my-2 my-lg-0">
        <div type="button" class="bg-dark border-0 selectable no-select" data-bs-toggle="dropdown" aria-expanded="false">
          <div v-if="account.picture || user.picture">
            <img :src="account.picture || user.picture" alt="account photo" height="40" class="rounded" />
          </div>
        </div>
        <div class="dropdown-menu dropdown-menu-lg-left p-0" aria-labelledby="authDropdown">
          <div class="list-group">
            
            <div class="list-group-item dropdown-item list-group-item-action text-danger selectable" @click="logout">
              <i class="mdi mdi-logout"></i>
              logout
            </div>
          </div>
        </div>
      </div>
    </div>
  </span> -->
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.account-pic {
  height: 10vh;
  width: 10vh;
  border: 1px solid #56C7FB;
  box-shadow: 1px 1px 1px #171920;
}

.btn-width {
  width: 8vw;
  box-shadow: 1px 1px 1px #171920;
}
</style>
