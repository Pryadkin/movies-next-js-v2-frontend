import {useSelector} from "react-redux"

import {useQuery} from "@tanstack/react-query"

import {API} from "@/api"
import {IRequestPerson} from "@/api/apiTypes/requestPerson"
import {getPictureUrlByShortUrl} from "@/helpers"
import {setPage, setTotalPages, setTotalResults} from "@/redux/reducers"
import {getSelectPage} from "@/redux/selectors"
import {useAppDispatch} from "@/redux/store"
import {TLanguage} from "@/types"

export const useFetchPopular = (lang: TLanguage) => {
    const dispatch = useAppDispatch()
    const page = useSelector(getSelectPage)

    const setValueToRedux = (data: IRequestPerson) => {
        data.page && dispatch(setPage(data.page))
        data.total_pages && dispatch(setTotalPages(data.total_pages))
        data.total_results && dispatch(setTotalResults(data.total_results))
    }

    const fetchPopular = async (
        page: string,
        lang: TLanguage,
    ) => {
        const res = await API.requestPopular(page, lang)

        if (res) {
            const result = res.data.results

            setValueToRedux(res.data)

            const updateMovies = result.map(elem => {
                const getImageUrl = (url: string) => {
                    return url ? getPictureUrlByShortUrl(elem.profile_path, 'w500') : ''
                }

                const updateRes = {
                    ...elem,
                    profile_path: getImageUrl(elem.profile_path),
                }

                return updateRes
            })

            return updateMovies
        }

        return []
    }

    const {
        isError,
        error,
        data,
        isFetching,
    } = useQuery({
        queryKey: ['popular', page, lang],
        queryFn: () => fetchPopular(String(page), lang),
        keepPreviousData : true,
    })

    return {data, isFetching, isError, error}
}
