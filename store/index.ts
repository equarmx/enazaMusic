import Vue from 'vue'
// eslint-disable-next-line import/named
import Vuex, { GetterTree, MutationTree, ActionTree } from 'vuex'

import Product, { IAlbum, IAuthor, ITrack } from '~/services/request'
import { IBreadcrumbs } from '~/@types/IBreadcrumbs'
import playerState from '~/data/defaultPlayerState'
import defaultBreadcrumbs from '~/data/defaultBreadcrumbs'

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

  authors: Array<IAuthor> = []

  albums: Array<IAlbum> = []

  currentPlaying: ITrack = playerState()

  durationPlay = 0

  breadcrumbs: Array<IBreadcrumbs> = defaultBreadcrumbs()
}

const getters = <GetterTree<State, string | number | object | []>>{
  authorsLength: (state) => state.authors.length,
  currentPlayingState: (state) => !!state.currentPlaying,
}

const mutations = <MutationTree<State>>{
  /* NOTIFICATION */
  CHANGE_NOTIFICATION(state, value: string) {
    state.notification.show = true
    state.notification.message = value
  },
  /* LOADING */
  SET_LOADING_STATUS(state, value: boolean) {
    state.isLoading = value
  },
  /* ALBUMS/AUTHORS */
  CHANGE_AUTHORS(state, authors: Array<IAuthor>) {
    state.authors = authors
  },
  CHANGE_ALBUMS(state, albums: Array<IAlbum>) {
    state.albums = albums
  },
  ADD_AUTHORS(state, authors: Array<IAuthor>) {
    state.authors.push(...authors)
  },
  ADD_ALBUMS(state, albums: Array<IAlbum>) {
    state.albums.push(...albums)
  },
  /* PLAYER STATE */
  CHANGE_PLAYER_STATE(state, track: ITrack) {
    state.currentPlaying = track
  },
  /* BREADCRUMBS */
  CHANGE_BREADCRUMBS(state, route: IBreadcrumbs) {
    state.breadcrumbs.push(route)
  },
  CLICK_BREADCRUMBS(state, index: number) {
    state.breadcrumbs.splice(index + 1, state.breadcrumbs.length - (index + 1))
  },
}

const actions = <ActionTree<State, string | number | object | []>>{
  async getNews({ commit }, page) {
    commit('SET_LOADING_STATUS', true)
    const response = await Product.getNews(`/?method=product.getNews`, page)
    if (response) {
      if (page > 1) {
        commit('ADD_AUTHORS', Object.values(response.people))
        commit('ADD_ALBUMS', Object.values(response.album))
      } else {
        commit('CHANGE_AUTHORS', Object.values(response.people))
        commit('CHANGE_ALBUMS', Object.values(response.album))
      }
    }
    commit('SET_LOADING_STATUS', false)
  },
  async getCard({ commit }, id) {
    commit('SET_LOADING_STATUS', true)
    const result = await Product.getCard('/?method=product.getCard', id)
    commit('SET_LOADING_STATUS', false)
    return result
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
