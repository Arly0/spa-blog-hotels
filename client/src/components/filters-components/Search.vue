<template>
  <div class="search">
    <input :value="searchResult" type="text" name="search" class="search__field" placeholder="Search" @keyup="searchHandler" >
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      searchResult: 'GET_SEARCH'
    })
  },
  methods: {
    ...mapMutations({
      search: 'SEARCH_POSTS'
    }),
    searchHandler ($event) {
      this.search($event.target.value);
    }
  }
}
</script>

<style lang="scss">

</style>