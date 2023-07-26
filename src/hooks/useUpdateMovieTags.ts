import {useSelector} from "react-redux"

import {useMutation} from "@tanstack/react-query"

import {API} from "@/api"
import {setProfileMovies} from "@/redux/reducers"
import {getSelectMyMovies} from "@/redux/selectors"
import {useAppDispatch} from "@/redux/store"

export const useUpdateMovieTags = () => {
    const dispatch = useAppDispatch()
    const movies = useSelector(getSelectMyMovies)
    const updateTag = async (oldTag: string, newTag: string) => {
        const res = await API.requestUpdateMovieTags(oldTag, newTag)

        if (res) {
            const updateMovieTags = movies.map(movie => {
                if (movie.settings.tags.includes(oldTag)) {
                    return {
                        ...movie,
                        settings: {
                            ...movie.settings,
                            tags: movie.settings.tags.map(tag => {
                                if (tag === oldTag) return newTag
                                return tag
                            })
                        }
                    }
                }
                return movie
            })

            dispatch(setProfileMovies(updateMovieTags))

            return res
        }
    }

    const mutationMovieTagsUpdate = useMutation({
        mutationFn: ({
            oldTag,
            newTag
        } : {
            oldTag: string,
            newTag: string
        }): any => updateTag(oldTag, newTag),
    })

    return {mutationMovieTagsUpdate}
}
