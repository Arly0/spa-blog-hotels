<template>
  <div class="filt">
    <select @change="editFilterHandler" name="filter" id="filter">
      <option value="0" selected>All</option>
      <option value="1">Low price</option>
      <option value="2">Hight price</option>
      <option value="3">Low raiting</option>
      <option value="4">Hight raiting</option>
      <option value="5">With photo</option>
      <option value="6">Without photo</option>
    </select>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  methods: {
    ...mapMutations({
      filterEdit: 'FILTER_POSTS'
    }),
    editFilterHandler ($event) {
      this.filterEdit($event.target.value);
    }
  }
}
</script>

<style lang="scss">

</style>