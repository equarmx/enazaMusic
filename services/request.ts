import axios, { AxiosInstance } from 'axios'

const axiosClient: AxiosInstance = axios.create({
  baseURL: 'https://api.mobimusic.kz',
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

export interface ITrack {
  id: string
  parent: string
  name: string
  cover: string
  coverUrl: string
  year: string
  price: string
  dir: string
  state: string
  peopleIds: string[]
  duration: string
  isUserLikes: boolean
  lyrics2?: string | null
  hasLyrics: boolean
}

export interface IResponse {
  album: Array<IAlbum>
  people: Array<IAuthor>
}

export default class Product {
  static async getNews(
    url: string,
    pageRequest: string
  ): Promise<IResponse | undefined> {
    try {
      const limitRequest = 10
      const { data } = await axiosClient.get(url, {
        params: {
          page: pageRequest,
          limit: limitRequest,
        },
      })
      return data.collection
    } catch (error) {
      console.log(error)
    }
  }
}
