<template>
  <div class="error">
    <div @click="removeErrorHandler" class="error__close">x</div>
    <p class="error__text">
      {{error}}
    </p>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  methods: {
    ...mapMutations({
      removeError: 'REMOVE_ERROR'
    }),
    removeErrorHandler () {
      this.removeError(this.error);
    }
  },
  props: {
    error: {
      Type: String,
      required: true,
    }
  }
}
</script>

<style lang="scss">
.error{
  position: absolute;
  top: 10px;
  right: 10px;
  border-radius: 10px;
  width: 200px;
  min-height: 40px;
  padding: 10px 40px;
  background-color: #d53f3f;
  &__text{
    color: white;
    margin: 0px;
    text-align: center;
  }
  &__close{
    position: absolute;
    top: 5px;
    right: 15px;
    font-size: 16px;
    cursor: pointer;
  }
}
</style>