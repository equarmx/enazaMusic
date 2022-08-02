import Vue from 'vue'
// eslint-disable-next-line import/named
import Vuex, { GetterTree, MutationTree, ActionTree } from 'vuex'

import Product, { IAlbum, IAuthor } from '~/services/request'

Vue.use(Vuex)

interface INotification {
  message: string
  show: boolean
}

class State {
  notification: INotification = {
    message: '',
    show: false,
  }

  isLoading = false

  authors: Array<IAuthor> | [] = []

  albums: Array<IAlbum> | [] = []
}

const getters = <GetterTree<State, string | number | object | []>>{}

const mutations = <MutationTree<State>>{
  CHANGE_NOTIFICATION(state, value: string) {
    state.notification.show = true
    state.notification.message = value
  },
  SET_LOADING_STATUS(state, value: boolean) {
    state.isLoading = value
  },
  CHANGE_AUTHORS(state, authors: Array<IAuthor>) {
    state.authors = authors
  },
  CHANGE_ALBUMS(state, albums: Array<IAlbum>) {
    state.albums = albums
  },
}

const actions = <ActionTree<State, string | number | object | []>>{
  async getNews({ commit }, page) {
    commit('SET_LOADING_STATUS', true)
    const response = await Product.getNews(`/?method=product.getNews`, page)
    if (response) {
      commit('CHANGE_AUTHORS', Object.values(response.people))
      commit('CHANGE_ALBUMS', Object.values(response.album))
    }
    commit('SET_LOADING_STATUS', false)
  },
}

const createStore = () => {
  // eslint-disable-next-line import/no-named-as-default-member
  return new Vuex.Store({
    state: new State(),
    mutations,
    actions,
    getters,
    modules: {},
  })
}

export default createStore
