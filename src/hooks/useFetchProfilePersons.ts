import {useQuery} from "@tanstack/react-query"

import {API} from "@/api"
import {TGender, TPersonKnownDepartment, TPopularitySort} from "@/api/apiTypes/requestPerson"
import {RequestUrl} from "@/api/requestUrlList"

interface Props {
    popularitySort?: TPopularitySort
    genderFilter?: TGender,
    knownDepartmentFilter?: TPersonKnownDepartment
}

export const useFetchProfilePersons = ({
    popularitySort,
    genderFilter,
    knownDepartmentFilter,
}: Props) => {
    const fetchMovies = async () => {
        const res = await API.requestProfilePersons({
            popularitySort,
            genderFilter,
            knownDepartmentFilter,
        })

        if (res) {
            return res.data
        }

        return []
    }

    const {
        isError,
        error,
        data,
        isFetching,
    } = useQuery({
        queryKey: [
            RequestUrl.GET_PROFILE_PERSONS,
            popularitySort,
            genderFilter,
            knownDepartmentFilter
        ],
        queryFn: fetchMovies,
        keepPreviousData : true,
    })

    return {data, isFetching, isError, error}
}
