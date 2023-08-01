import {useSelector} from "react-redux"

import {Button} from "antd"

import {SetMovieDate} from "@/components/SetMovieDate"
import {useUpdateProfileMovie} from "@/hooks/useUpdateProfileMovie"
import {getSelectMovie, getSelectTags} from "@/redux/selectors"

import styles from './MovieSettings.module.scss'

import {AddTags} from "../AddTags"

export const MovieSettings = () => {
    const {mutationUpdate} = useUpdateProfileMovie()
    const selectTegs = useSelector(getSelectTags)
    const selectMovie = useSelector(getSelectMovie)

    const handleUpdateMovieClick = () => {
        if (selectMovie) {
            mutationUpdate.mutate(selectMovie)
        }
    }
    return (
        <div className={styles.wrapper}>
            <AddTags
                movie={selectMovie}
                tags={selectTegs}
            />
            <SetMovieDate />
            <Button onClick={handleUpdateMovieClick}>
                    Update movie
            </Button>
        </div>
    )
}