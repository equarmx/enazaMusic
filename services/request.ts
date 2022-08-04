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

export interface ICategory {
  id: string
  name: string
  kz_name: string
  en_name: string
  have_child: string
  child: string[]
}

export interface INews {
  album: Array<IAlbum>
  people: Array<IAuthor>
}

export interface ICard {
  album: Array<IAlbum>
  category: Array<ICategory>
  track: Array<ITrack>
  people: Array<IAuthor>
}

export default class Product {
  static async getNews(
    url: string,
    pageRequest: string
  ): Promise<INews | undefined> {
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

  static async getCard(
    url: string,
    id: number | string
  ): Promise<ICard | undefined> {
    try {
      const { data } = await axiosClient.get(url, {
        params: {
          productId: id,
        },
      })
      return data.collection
    } catch (error) {
      console.log(error)
    }
  }
}
