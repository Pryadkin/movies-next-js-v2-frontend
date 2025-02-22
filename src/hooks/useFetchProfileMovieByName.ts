import {useMutation} from "@tanstack/react-query"

import {API} from "@/api"

export const useFetchProfileMovieByName = () => {
    const fetchMovieByName = async (movieName: string) => {
        const res = await API.requestProfileMovieByName({movieName})

        if (res) {
            return res.data
        }

        return []
    }

    const {data, error, isLoading, mutate, isSuccess} = useMutation({
        mutationFn: fetchMovieByName,
    })


    return {
        profileMovie: data,
        getMovieByName: mutate,
        error,
        isLoading,
        isSuccess
    }
}
