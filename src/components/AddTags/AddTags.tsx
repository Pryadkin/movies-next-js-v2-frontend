import {FC, useState} from "react"

import {Space, Tag} from "antd"

import {IMovie} from "@/api/apiTypes"
import {errorMessage} from "@/notification"
import {
    deleteTagToMovie,
    setTagToMovie
} from "@/redux/reducers"
import {useAppDispatch} from "@/redux/store"

import styles from './AddTags.module.scss'

import {useColorToTag} from "./useColorToTag"

interface Props {
    movie: IMovie | undefined | null,
    tags: string[]
}

export const AddTags: FC<Props> = ({
    movie,
    tags,
}) => {
    const dispatch = useAppDispatch()
    const getColorTag = useColorToTag()
    const [allTagsTitle] = useState('All tags')
    const [movieTagsTitle] = useState('Movie tags')

    const handleTagClick = (value: string) => () => {
        const check = movie?.settings?.tags.find(tag => tag === value)

        if (check) {
            errorMessage(new Error, 'tag already exist')
        } else if (movie && movie.settings){
            dispatch(setTagToMovie(value))
        }
    }

    const handleMovieTagClick = (value: string) => () => {
        dispatch(deleteTagToMovie(value))
    }

    const getTags = (t: string[], isMovieTag?: boolean) => t.map(tag => {
        return (
            <Tag
                className={styles.tag}
                key={tag}
                color={getColorTag(tag)}
                onClick={isMovieTag
                    ? handleMovieTagClick(tag)
                    : handleTagClick(tag)
                }
            >
                {tag}
            </Tag>
        )
    })

    return (
        <Space
            align="start"
            size={[0, 8]}
            wrap
        >
            <Space.Compact
                prefixCls={styles.subSpace}
                direction="vertical"
                className={styles.space}
            >
                <h3>{allTagsTitle}</h3>
                <div className={styles.tagsWrapper}>
                    {getTags(tags)}
                </div>
            </Space.Compact>
            <Space.Compact
                direction="vertical"
                prefixCls={styles.subSpace}
            >
                <h3>{movieTagsTitle}</h3>
                <div className={styles.tagsWrapper}>
                    {movie && getTags(movie?.settings.tags, true)}
                </div>
            </Space.Compact>
        </Space>
    )
}