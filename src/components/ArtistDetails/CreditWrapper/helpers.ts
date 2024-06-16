import {ICorrectMovieWithoutLang} from "@/api/apiTypes/requestMovies"

export type TCastSortMovieElems = Pick<ICorrectMovieWithoutLang,
| 'vote_average'
| 'popularity'
>
type TMovieWithoutLangKey = keyof TCastSortMovieElems
export type TSortValue = TMovieWithoutLangKey | 'default'

export const sortOptions: TSortValue[] = [
    'vote_average',
    'popularity',
    'default'
]
export  const filterOptions = [
    {
        genreId: 99,
        name: 'Documentary'
    },
    {
        genreId: 10762,
        name: "Kids"
    },
    {
        genreId: 10763,
        name: "News"
    },
    {
        genreId: 10764,
        name: "Reality"
    },
    {
        genreId: 10765,
        name: "Sci-Fi & Fantasy"
    },
    {
        genreId: 10766,
        name: "Soap"
    },
    {
        genreId: 10767,
        name: "Talk"
    },
    {
        genreId: 10768,
        name: "War & Politics"
    }
]