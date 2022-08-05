import Vue from 'vue'
// eslint-disable-next-line import/named
import Vuex, { GetterTree, MutationTree, ActionTree } from 'vuex'

import Product, { IAlbum, IAuthor, ICard, ITrack } from '~/services/request'
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

  isPlaying = false

  playingURL =
    'https://enazadevkz.cdnvideo.ru/tank1/sony/A10301A0004574902L_20210331042345765/resources/ad5a61f35b99.mp3'

  playingStatus = 'STOPPED'

  endedSong = false

  breadcrumbs: Array<IBreadcrumbs> = defaultBreadcrumbs()

  page = 1
}

const getters = <GetterTree<State, string | number | object | []>>{
  authorsLength: (state) => state.authors.length,
  currentPlayingState: (state) => !!state.currentPlaying,
  playedTimeToMMS: (state) => state.durationPlay,
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
  CHANGE_PLAY_STATUS(state, value) {
    state.isPlaying = value
  },
  CHANGE_DURATION_PLAY(state, value) {
    state.durationPlay = value
  },
  PLAYING_STATUS_STOPPED(state) {
    state.playingStatus = 'STOPPED'
  },
  PLAYING_STATUS_PAUSE(state) {
    state.playingStatus = 'PAUSED'
  },
  PLAYING_STATUS_PLAY(state) {
    state.playingStatus = 'PLAYING'
  },
  CHANGE_URL_BY_CLICK(state) {
    state.playingURL =
      state.playingURL ===
      'https://enazadevkz.cdnvideo.ru/tank3/medialand/2021_05_12/1.mp3'
        ? 'https://enazadevkz.cdnvideo.ru/tank1/sony/A10301A0004574902L_20210331042345765/resources/ad5a61f35b99.mp3'
        : 'https://enazadevkz.cdnvideo.ru/tank3/medialand/2021_05_12/1.mp3'
  },
  SET_ENDED_SONG(state, value: boolean) {
    state.endedSong = value
  },
  /* BREADCRUMBS */
  CHANGE_BREADCRUMBS(state, route: IBreadcrumbs) {
    state.breadcrumbs.push(route)
  },
  CLICK_BREADCRUMBS(state, index: number) {
    state.breadcrumbs.splice(index + 1, state.breadcrumbs.length - (index + 1))
  },
  RESET_BREADCRUMBS(state) {
    state.breadcrumbs = defaultBreadcrumbs()
  },
  /* PAGE */
  CHANGE_PAGE(state, value) {
    state.page = value
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
    let result = {} as ICard
    const data = await Product.getCard('/?method=product.getCard', id)
    commit('SET_LOADING_STATUS', false)
    if (data) {
      for (let key in data) {
        result[key] = Object.values(data[key])
      }
      return result
    } else return {}
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
