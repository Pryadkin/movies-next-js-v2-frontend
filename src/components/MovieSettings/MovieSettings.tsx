import {useSelector} from "react-redux"

import {Button} from "antd"

import {SetMovieDate} from "@/components/SetMovieDate"
import {useUpdateProfileMovie} from "@/hooks/useUpdateProfileMovie"
import {addMovieDateViewing, deleteMovieDateViewing, updateMovieDateViewing} from "@/redux/reducers"
import {getSelectMovie, getSelectTags} from "@/redux/selectors"

import styles from './MovieSettings.module.scss'

import {useAppDispatch} from "@/redux/store"

import {AddTags} from "../AddTags"

export const MovieSettings = () => {
    const dispatch = useAppDispatch()
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
            <div className={styles.tagsWrapper}>
                <AddTags
                    movie={selectMovie}
                    tags={selectTegs}
                />
            </div>
            {selectMovie && (
                <SetMovieDate
                    movie={selectMovie}
                    onUpdateMovieDateViewing={val => dispatch(updateMovieDateViewing(val))}
                    onAddMovieDateViewing={val => dispatch(addMovieDateViewing(val))}
                    deleteSelectMovieDateViewing={val => dispatch(deleteMovieDateViewing(val))}
                />
            )}

            <Button onClick={handleUpdateMovieClick}>
                Update movie
            </Button>
        </div>
    )
}