<template>
  <div class="home">
    <div v-if="!loader">
      <div v-if="modal" class="darkSide"></div>
      <Modal v-if="modal" />
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <h1>Hotel posts</h1>
            <div class="filter_container">
              <MyFilter />
            </div>
            <div v-if="posts.length" class="posts_container">
              <template v-for="(post, n) in posts">
                <Post
                  :key="n"
                  :title="post.title"
                  :text="post.text"
                  :picture="post.picture"
                  :price="post.price"
                  :raiting="post.raiting"
                  :id="post.id"
                />
              </template>
            </div>
            <div v-else class="posts_empty">
              <h2>Don`t find posts</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else id="loader"></div>
    <template v-for="(error, index) in errors">
      <Error :error="error" :key="index" />
    </template>
  </div>
</template>

<script>
import Post from "@/components/Post";
import MyFilter from "@/components/Filter";
import Modal from "@/components/Modal";
import Error from '@/components/Error'
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "Home",
  components: {
    Post,
    MyFilter,
    Modal,
    Error
  },
  data () {
    return {
      loader: true,
    }
  },
  methods: {
    ...mapMutations({
      modalStatus: "TOGGLE_MODAL",
      modalItem: "SET_MODAL_ITEM",
    }),
  },
  mounted: function() {
    this.$store.dispatch("POSTS_PARSE")
    .then (() => {
      this.loader = false;
      if (this.$route.params.id) {
        this.modalStatus(true);
        this.modalItem(this.$route.params.id - 1);
      }
    });

  },
  computed: {
    ...mapGetters({
      posts: "GET_POSTS",
      modal: "GET_MODAL_STATUS",
      errors: "GET_ERRORS"
    }),
  },
};
</script>

<style lang="scss">
.posts_container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-row-gap: 60px;
  grid-column-gap: 40px;
}
.filter_container {
  margin: 40px 0;
}
.darkSide {
  position: fixed;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
  margin: auto;
  display: block;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1;
}

// LOADER

#loader {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 1;
  width: 150px;
  height: 150px;
  margin: -75px 0 0 -75px;
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
}

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

// MEDIA
@media (max-width: 1199px) {
  .posts_container {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 991px) {
  .posts_container {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 572px) {
  .posts_container {
    grid-template-columns: 1fr;
  }
  .post__picture {
    background-size: 100% auto;
    background-position: top center;
  }
}
</style>
