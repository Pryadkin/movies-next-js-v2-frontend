import {useMutation} from "@tanstack/react-query"

import {API} from "@/api"
import {IRequestPerson} from "@/api/apiTypes/requestPerson"
import {getCorrectPersonWithoutLang} from "@/helpers/getCorrectPersonWithoutLang"
import {setPage, setTotalPages, setTotalResults} from "@/redux/reducers"
import {useAppDispatch} from "@/redux/store"
import {TLanguage} from "@/types"

export const useSearchPerson = (lang: TLanguage) => {
    const dispatch = useAppDispatch()

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
            const currectPersonWithoutLang = getCorrectPersonWithoutLang(res.data.results)

            setValueToRedux(res.data)

            return currectPersonWithoutLang
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
