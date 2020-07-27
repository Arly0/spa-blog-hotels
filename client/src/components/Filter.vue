<template>
  <div class="filter">
    <div class="filter__container justify-content-between">
      <div class="filter__search">
        <Search />
      </div>
      <div class="filter__filt">
        <CustomFilter />
      </div>
    </div>
  </div>
</template>

<script>
import Search from '@/components/filters-components/Search';
import CustomFilter from '@/components/filters-components/CustomFilter'

export default {
  components: {
    Search,
    CustomFilter
  }
}
</script>

<style lang="scss">
  .filter{
    width: 100%;
    // border: 1px solid gray;
    height: 80px;
    border-radius: 10px;
    &__container{
      display: flex
    }
  }
  @media (max-width: 572px){
    .filter{
      &__container{
        margin: 10px 0;
        display: block;
      }
      &__filt{
        margin-top: 30px;
      }
    }
  }
</style>