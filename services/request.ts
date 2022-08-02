import axios, { AxiosInstance } from 'axios'

const axiosClient: AxiosInstance = axios.create({
  baseURL: 'https://api.mobimusic.kz',
})

export interface IAlbum {
  id?: number
  name?: string
  coverUrl?: string
  year?: string
  trackCount?: number
  duration?: number
}

export default class Product {
  static async getNews(
    url: string
  ): Promise<Array<IAlbum> | string | undefined> {
    try {
      let arr: Array<IAlbum> = []
      let obj: IAlbum = {}

      const { data } = await axiosClient.get(url)
      for (const key of Object.keys(data.collection.album)) {
        let element = data.collection.album[key]
        obj.id = element.id
        obj.name = element.name
        obj.coverUrl = element.coverUrl
        obj.year = element.year
        obj.trackCount = element.trackCount
        obj.duration = element.duration
        arr.push(Object.assign({}, obj))
        obj = {}
      }
      return arr
    } catch (error) {
      console.log(error)
    }
  }
}
