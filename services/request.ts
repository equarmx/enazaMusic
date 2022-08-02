import axios, { AxiosInstance } from 'axios'

const axiosClient: AxiosInstance = axios.create({
  baseURL: 'https://api.mobimusic.kz',
  params: {
    limit: 10,
  },
})

export interface IAlbum {
  id: string
  parent?: string | null
  name: string
  cover: string
  coverUrl: string
  year: string
  price: string
  dir: string
  state: string
  peopleIds: string[]
  duration: number
  trackCount: number
  isUserLikes: boolean
}

export interface IAuthor {
  id: string
  name: string
  dir: string
  typeName: string
  productCount: string
  productChildCount: string
  genres: string[]
  cover_file: string
  coverUrl: string
  isUserLikes: boolean
  description: string
}

export interface IResponse {
  album: Array<IAlbum>
  people: Array<IAuthor>
}

export default class Product {
  static async getNews(
    url: string,
    page: string
  ): Promise<IResponse | undefined> {
    try {
      const { data } = await axiosClient.get(url, {
        params: {
          page,
        },
      })
      return data.collection
    } catch (error) {
      console.log(error)
    }
  }
}
