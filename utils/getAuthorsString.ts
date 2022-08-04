import { IAlbum, IAuthor, ITrack } from '~/services/request'

export default function getAuthorString(
  authors: Array<IAuthor> | undefined,
  albumOrTrack: IAlbum | ITrack | undefined
) {
  if (authors === undefined || albumOrTrack === undefined) return ''
  let result
  let filteredAuthors = authors
    .filter((elem: IAuthor) => {
      return albumOrTrack?.peopleIds.includes(elem.id)
    })
    .map((elem: IAuthor) => elem.name)
  if (filteredAuthors.length > 2) {
    result = filteredAuthors.slice(0, 3).join(', ')
  } else result = filteredAuthors.join(', ')
  return result
}
