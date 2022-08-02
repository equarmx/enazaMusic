import Vue from 'vue'
// eslint-disable-next-line import/named
import Vuex, { GetterTree, MutationTree, ActionTree } from 'vuex'

import Product from '~/services/request'

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
}

const actions = <ActionTree<State, string | number | object | []>>{
  async getNews() {
    return await Product.getNews(
      'https://api.mobimusic.kz/?method=product.getNews&page=1&limit=10'
    )
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
