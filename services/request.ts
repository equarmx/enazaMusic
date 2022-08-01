import axios, { AxiosInstance } from 'axios'

const axiosClient: AxiosInstance = axios.create({
  baseURL: 'https://api.mobimusic.kz',
})

export interface IAlbum {
  userId?: number
  id: number
  title?: string
  completed?: boolean
}

export default class Product {
  static async getNews(
    url: string
  ): Promise<Array<IAlbum> | string | undefined> {
    try {
      const { data } = await axiosClient.get(url)
      return data
    } catch (error) {
      console.log(error)
      // if (axios.isAxiosError(error)) {
      //   handleAxiosError(error.message)
      // } else {
      //   handleUnexpectedError(error.message)
      // }
    }
  }
}

// function handleAxiosError(error: string): void {
//   this.$store.commit('CHANGE_NOTIFICATION', error)
// }
//
// function handleUnexpectedError(error: string): void {
//   this.$store.commit('CHANGE_NOTIFICATION', error)
// }
