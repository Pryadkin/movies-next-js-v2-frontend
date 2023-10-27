import {useMutation} from "@tanstack/react-query"

import {API} from "@/api"
import {IMovie, IResponseMovies} from "@/api/apiTypes/requestMovies"
import {getPictureUrlByShortUrl} from "@/helpers"
import {setPage, setTotalPages, setTotalResults} from "@/redux/reducers"
import {useAppDispatch} from "@/redux/store"
import {TLanguage} from "@/types"

export const useFetchMulti = (lang: TLanguage) => {
    const dispatch = useAppDispatch()

    const setValueToRedux = (data: IResponseMovies) => {
        data.page && dispatch(setPage(data.page))
        data.total_pages && dispatch(setTotalPages(data.total_pages))
        data.total_results && dispatch(setTotalResults(data.total_results))
    }

    const fetchMovies = async (
        value: string,
        selectType: 'movie' | 'tv' | 'multi',
        page: string,
        lang: TLanguage,
    ) => {
        const getMovie: any = async () => {
            switch (selectType) {
                case 'movie':
                    return await API.requestMovies(value, page, lang)
                case 'tv':
                    return await API.requestTv(value, page, lang)
                case 'multi':
                    return await API.requestMulti(value, page, lang)

                default:
                    return null
            }
        }

        const res = await getMovie()

        if (res && res.data.results) {
            const result: IMovie[] =res.data.results

            const updateMovies = result.map(elem => {
                const getImageUrl = (url: string) => {
                    return url ? getPictureUrlByShortUrl(elem.poster_path, 'w500') : ''
                }

                const updateRes = {
                    ...elem,
                    poster_path: getImageUrl(elem.poster_path),
                    backdrop_path: elem.backdrop_path ? getImageUrl(elem.backdrop_path) : '',
                    settings: {
                        isTv: elem.first_air_date,
                        tags: [],
                        dateAdd: '',
                        dateViewing: []
                    }
                }

                return updateRes
            })

            setValueToRedux(res.data)

            return updateMovies
        }

        return []
    }

    const mutationMovieFetch = useMutation({
        mutationFn: ({
            searchName,
            selectType,
            page
        }: {
            searchName: string,
            selectType: 'movie' | 'tv' | 'multi',
            page: string,
        }) => fetchMovies(searchName, selectType, page, lang),
    })

    return {mutationMovieFetch}
}
