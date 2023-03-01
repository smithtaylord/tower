<template>
    <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Create an Event</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">

            <form>

                <div class="row">
                    <div class="col-6">
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="floatingInput" placeholder="name...">
                            <label for="floatingInput">Name</label>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="floatingInput" placeholder="cover image...">
                            <label for="floatingInput">Cover Image</label>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="floatingInput" placeholder="location...">
                            <label for="floatingInput">Location</label>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="form-floating mb-3">
                            <input type="date" class="form-control" id="floatingInput" placeholder="location...">
                            <label for="floatingInput">Event Date</label>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <div class="form-floating mb-3">
                            <input type="number" class="form-control" id="floatingInput" placeholder="name...">
                            <label for="floatingInput">Capacity</label>
                        </div>
                    </div>
                    <div class="col-6"></div>
                </div>
                <div class="row">
                    <div class="col-12"></div>
                </div>


                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="floatingInput" placeholder="name...">
                    <label for="floatingInput">Name</label>
                </div>



                <button type="button" class="btn bg-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" class="btn bg-primary">Submit</button>
            </form>


        </div>
    </div>
</template>


<script>
export default {
    setup() {
        return {}
    }
}
</script>


<style lang="scss" scoped></style>