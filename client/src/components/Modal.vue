<template>
  <div class="mymodal">
    <div @click="cleanModal" class="mymodal__close">
      x
    </div>
    <div class="mymodal__container">
      <div class="mymodal__picture" :style="{ backgroundImage: `url(${require('@/assets/' + item.picture)})`}">
      </div>
      <div class="mymodal__info">
        <div class="mymodal__title">
          <h2>{{item.title}}</h2>
        </div>
        <div class="mymodal__text">
          <p>
            {{item.text}}
          </p>
        </div>
        <div class="d-flex justify-content-between">
          <div class="mymodal__raiting">
            {{item.raiting}}
          </div>
          <div class="mymodal__price">
            {{item.price}} <span class="currency">$</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      item: 'GET_MODAL_ITEM'
    })
  },
  methods: {
    ...mapMutations({
      modalStatus: 'TOGGLE_MODAL',
      modalItem: 'SET_MODAL_ITEM'
    }),
    cleanModal () {
      this.modalStatus(false);
      this.modalItem(false);
      this.$router.push('/');
    }
  }
}
</script>

<style lang="scss">
  .mymodal{
    position: fixed;
    top: 0px;
    bottom: 0px;
    right: 0px;
    left: 0px;
    margin: auto;
    display: block;
    width: 75%;
    height: 80vh;
    background-color: #fff;
    z-index: 2;
    padding: 30px 60px;
    &__close{
      position: absolute;
      top: 15px;
      right: 25px;
      font-size: 24px;
      cursor: pointer;
    }
    &__info{
      margin-left: 30px;
    }
    &__picture{
      width: 50%;
      height: 80%;
      margin: auto;
      background-position: center;
    }
    &__container{
      display: flex;
      height: 100%;
      align-items: center;
    }
  }
  @media (max-width: 1199px) {
    .mymodal{
      &__picture{
        background-size: auto 100%;
      }
    }
  }
  @media (max-width: 991px) {
    .mymodal{
      &__container{
        display: block;
      }
      &__info{
        margin-left: 0px;
      }
      &__picture{
        width: 100%;
        height: 75%;
        margin-bottom: 20px;
      }
    }
  }
  @media (max-width: 572px) {
    .mymodal{
      width: 100%;
      height: 100%;
      padding: 35px 35px;
      &__close{
        top: 13px;
        right: 20px;
      }
    }
  }
</style>