import { IAlbum, IAuthor, ITrack } from '~/services/request'

export default function getFullLengthAuthorString(
  authors: Array<IAuthor> | [] | undefined,
  albumOrTrack: IAlbum | ITrack | undefined
) {
  if (!authors || albumOrTrack === undefined) return ''
  if (!authors.length) return ''
  let filteredAuthors = authors
    .filter((elem: IAuthor) => {
      return albumOrTrack?.peopleIds.includes(elem.id)
    })
    .map((elem: IAuthor) => elem.name)
  return filteredAuthors.join(', ')
}
