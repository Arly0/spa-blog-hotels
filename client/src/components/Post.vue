<template>
  <div class="post">
    <div class="post__picture" :style="{ backgroundImage: `url(${require('@/assets/' + picture)})`}">
    </div>
    <div class="post__info">
      <div class="post__title">
        <h3>
          {{title}}
        </h3>
      </div>
      <div class="post__text">
        <p>
          {{text}}
        </p>
      </div>
      <div class="d-flex justify-content-between">
        <div class="post__raiting">
          <p>
            {{raiting}}
          </p>
        </div>
        <div class="post__price">
          <p>
            {{price}} <span class="currency">$</span>
          </p>
        </div>
      </div>
      <a @click="setModalHandler" class="post__detail">Detail</a>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    picture: {
      type: String,
      default: 'pathtopict'
    },
    raiting: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: true
    },
    id: {
      type: Number,
      required: true
    }
  },
  methods: {
    ...mapMutations({
      modalStatus: 'TOGGLE_MODAL',
      modalItem: 'SET_MODAL_ITEM'
    }),
    setModalHandler () {
      this.modalStatus(true);
      this.modalItem(this.id);
      this.$router.push(`/post/${this.id+1}`);
    }
  }
}
</script>

<style lang="scss">
  .post{
    min-width: 240px;
    background-color: #fff;
    -webkit-box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
    border-radius: 10px;
    &__picture{
      width: 100%;
      height: 280px;
      background-position: center;
      background-repeat: no-repeat;
      background-size: auto 100%;
    }
    &__info{
      padding: 10px 15px;
    }
    &__detail{
      text-align: left;
      text-decoration: underline !important;
      color: steelblue !important;
    }
  }
</style>