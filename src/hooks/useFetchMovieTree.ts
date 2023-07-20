import {useQuery} from "@tanstack/react-query"

import {API} from "@/api"
import {updateObjForTree} from "@/components/ListTree/helpers/updateObjToTree"

export const useFetchMovieTree = () => {
    const fetchMovieTree = async () => {
        const res = await API.requestMovieTree()

        if (res) {
            const objForTree = updateObjForTree(res.data)

            return objForTree
        }
    }

    const {
        isError,
        error,
        data,
        isFetching,
    } = useQuery({
        queryKey: ['movie-tree'],
        queryFn: () => fetchMovieTree(),
        keepPreviousData : true,
        enabled: true
    })

    return {data, isFetching, isError, error}
}
