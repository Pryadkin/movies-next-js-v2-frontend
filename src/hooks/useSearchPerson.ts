import {useMutation} from "@tanstack/react-query"

import {API} from "@/api"
import {IPerson, IRequestPerson} from "@/api/apiTypes/requestPerson"
import {getPictureUrlByShortUrl} from "@/helpers"
import {setPage, setTotalPages, setTotalResults} from "@/redux/reducers"
import {useAppDispatch} from "@/redux/store"
import {TLanguage} from "@/types"

export const useSearchPerson = (lang: TLanguage) => {
    const dispatch = useAppDispatch()

    const getImageUrl = (url: string) => {
        return url ? getPictureUrlByShortUrl(url, 'w500') : ''
    }

    const setValueToRedux = (data: IRequestPerson) => {
        data.page && dispatch(setPage(data.page))
        data.total_pages && dispatch(setTotalPages(data.total_pages))
        data.total_results && dispatch(setTotalResults(data.total_results))
    }

    const fetchPerson = async (
        name: string,
        page: string,
        lang: TLanguage,
    ) => {
        const res = await API.requestPerson(name, page, lang)

        if (res && res.data.results) {
            const resultsWithCorrectUrl = res.data.results.map(result => {
                return {
                    ...result,
                    profile_path: getImageUrl(result.profile_path),
                    known_for: result.known_for.map(elem => {
                        if (elem.backdrop_path) return {
                            ...elem,
                            backdrop_path: getImageUrl(elem.backdrop_path),
                            poster_path: getImageUrl(elem.poster_path)
                        }
                        return null
                    })
                }
            })

            setValueToRedux(res.data)

            return resultsWithCorrectUrl as IPerson[]
        }

        return []
    }

    const mutationPersonSearch = useMutation({
        mutationFn: ({
            searchName,
            page
        }: {
            searchName: string,
            page: string,
        }) => fetchPerson(searchName, page, lang),
    })

    return {mutationPersonSearch}
}
