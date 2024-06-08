import {useMutation} from "@tanstack/react-query"

import {API} from "@/api"
import {IResponseTv} from "@/api/apiTypes"
import {IResponseMovies} from "@/api/apiTypes/requestMovies"
import {getCorrectMovieWithoutLang} from "@/helpers/getCorrectMovieWithoutLang"
import {setPage, setTotalPages, setTotalResults} from "@/redux/reducers"
import {useAppDispatch} from "@/redux/store"
import {TLanguage, TMovieType} from "@/types"

export const useFetchMulti = (lang: TLanguage) => {
    const dispatch = useAppDispatch()

    const setValueToRedux = (data: IResponseMovies | IResponseTv) => {
        data.page && dispatch(setPage(data.page))
        data.total_pages && dispatch(setTotalPages(data.total_pages))
        data.total_results && dispatch(setTotalResults(data.total_results))
    }

    const fetchMovies = async (
        name: string,
        selectType: TMovieType,
        page: string,
        lang: TLanguage,
    ) => {
        const getMovie = async () => {
            switch (selectType) {
                case 'movie':
                    return await API.requestMovies(name, page, lang)
                case 'tv':
                    return await API.requestTv(name, page, lang)
                case 'multi':
                    return await API.requestMulti(name, page, lang)

                default:
                    return null
            }
        }

        const res = await getMovie()

        if (res && res.data.results) {
            const currectMovieWithoutLang = getCorrectMovieWithoutLang(res.data.results, lang)

            setValueToRedux(res.data)

            return currectMovieWithoutLang
        }

        return []
    }

    const mutationMovieFetch = useMutation({
        mutationFn: ({
            searchName,
            movieType,
            page
        }: {
            searchName: string,
            movieType: TMovieType,
            page: string,
        }) => fetchMovies(searchName, movieType, page, lang),
    })

    return {mutationMovieFetch}
}
