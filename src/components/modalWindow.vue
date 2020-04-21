<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <h3>
              <slot name="header">
                Remove note
              </slot>
            </h3>
          </div>

          <div class="modal-body">
            <slot name="body">
              Do you want remove this note?
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button" @click="$emit('agree')">
                Yes
              </button>
              <button class="modal-default-button" @click="$emit('disagree')">
                No
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'modalWindow'
  }
</script>

<style lang="scss" >

</style>