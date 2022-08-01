// eslint-disable-next-line import/named
import { GetterTree, ActionTree, MutationTree } from 'vuex'

interface INotification {
  message: string
  show: boolean
}

export const state = () => ({
  notification: {
    message: '',
    show: false,
  } as INotification,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  // name: (state) => state.name,
}

export const mutations: MutationTree<RootState> = {
  // CHANGE_NAME: (state, newName: string) => (state.name = newName),
  CHANGE_NOTIFICATION: (state, value: string) => {
    state.notification.show = true
    state.notification.message = value
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async fetchThings({ commit }) {
    const things = await this.$axios.$get('/things')
    console.log(things)
    commit('CHANGE_NAME', 'New name')
  },
}
