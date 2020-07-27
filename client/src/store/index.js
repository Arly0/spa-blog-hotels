import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // all posts
    posts: [],
    // posts with filter
    filer: [],
    // fact posts (search + filters)
    result: [],
    errors: [],
    search: '',
    // modals settings
    modalActive: false,
    modalItem: {},
  },
  getters: {
    GET_POSTS (state) {
        return state.result;
    },
    GET_ERRORS (state) {
        return state.errors;
    },
    GET_MODAL_STATUS (state) {
      return state.modalActive;
    },
    GET_MODAL_ITEM (state) {
      return state.modalItem;
    },
    GET_SEARCH (state) {
      return state.search;
    }
  },
  mutations: {
    REMOVE_ERROR (state, error) {
      state.errors.splice(state.errors.indexOf(error));
    },
    SET_MODAL_ITEM (state, id) {
      if (id === false){
        state.modalItem = {};
        return;
      }
      if (id >= state.posts.length) {
        state.modalActive = false;
        let findFlag = false;
        for (const item of state.errors){
          if (item === 'This post was not found'){
            findFlag = true;
            break;
          }
        }
        if (!findFlag){
          state.errors.push('This post was not found');
        }
        return;
      }
      for (const item of state.posts) {
        if (item.id == id) {
          state.modalItem = item;
        }
      }
    },
    TOGGLE_MODAL (state, status) {
      state.modalActive = status;
    },
    FILTER_POSTS (state, id) {
      state.result = [];
      let tmp = [];
      id = parseInt(id);
      switch (id) {
        case 0:
          console.log('hehe');
          tmp = state.posts;
          break;
        case 1:
          tmp = state.posts.filter(function (item) {
            return item.price < 200;
          });
          break;
        case 2: 
          tmp = state.posts.filter(function (item) {
            return item.price >= 200;
          });
          break;
        case 3:
          tmp = state.posts.filter(function (item) {
            return item.raiting < 3;
          });
          break;
        case 4:
          tmp = state.posts.filter(function (item) {
            return item.raiting >= 3;
          });
          break;
        case 5: 
          tmp = state.posts.filter(function (item) {
            return item.picture !== 'default.png';
          });
          break;
        case 6: 
          tmp = state.posts.filter(function (item) {
            return item.picture === 'default.png';
          });
          break;
      }
      Vue.set(state, 'filter', tmp);
      for (const item of state.filter) {
        if (item.title.toLowerCase().includes(state.search)) {
          state.result.push(item);
        }
      }
    },
    SEARCH_POSTS (state, search) {
      search = search.toLowerCase();
      state.result = [];
      for (const item of state.filter) {
        if (item.title.toLowerCase().includes(search)) {
          state.result.push(item);
        }
      }
      Vue.set(state, 'search', search);
    },
    SET_POSTS (state, posts) {
        Vue.set(state, 'posts', posts);
        Vue.set(state, 'filter', posts);
        Vue.set(state, 'result', posts);
    },
    SET_ERROR (state, error) {
        // We can use splice, but FLAG code is faster 
        let findFlag = false;
        for (const item of state.errors){
            if (item === error){
                findFlag = true;
                break;
            }
        }
        if (!findFlag){
            state.errors.push(error);
        }
    }
  },
  actions: {
      async POSTS_PARSE ({ commit }) {
        await axios({
            url: 'http://localhost:3000/api/v1/posts',
            method: 'get',
        })
        .then(responce => {
            if (responce.status === 200) {
                commit ('SET_POSTS', responce.data.posts);
            } else {
                console.error(responce.message);
                commit ('SET_ERROR', 'Check server connection');
            }
        })
        .catch(error => {
            console.error(error);
            commit ('SET_ERROR', 'Check server connection');
        });
      }
  },
  modules: {
  }
})
