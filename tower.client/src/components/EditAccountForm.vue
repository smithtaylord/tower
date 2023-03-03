<template>
    <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="ModalLabel">Edit Account</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <form @submit.prevent="editAccount">


                <div class="form-floating mb-3">
                    <input required v-model="editable.name" type="text" class="form-control" id="floatingInput"
                        placeholder="name..." maxlength="100" minlength="2">
                    <label for="floatingInput">Name</label>
                </div>
                <div class="form-floating mb-3">
                    <input required v-model="editable.picture" type="text" class="form-control" id="floatingInput"
                        placeholder="cover image..." maxlength="1000" minlength="2">
                    <label for="floatingInput">Account Picture </label>
                </div>
                <div class="modal-footer">
                    <button type="reset" class="btn bg-secondary selectable" data-bs-dismiss="modal">Close</button>
                    <button type="submit" data-bs-dismiss="modal" class="btn bg-primary selectable">Submit</button>
                </div>
            </form>

        </div>
    </div>
</template>


<script>
import { ref, watchEffect } from 'vue';
import { AppState } from '../AppState.js';
import { accountService } from '../services/AccountService.js';
import Pop from '../utils/Pop.js';

export default {
    setup() {
        const editable = ref({})
        watchEffect(() => {
            if (AppState.account != null) {
                editable.value = { ...AppState.account }
            } else {
                editable.value = {}
            }
        })
        return {
            editable,

            async editAccount() {
                try {
                    const formData = editable.value
                    await accountService.editAccount(formData)
                } catch (error) {
                    Pop.error(error, '[edit account]')
                }

            }
        }
    }
}
</script>


<style lang="scss" scoped></style>