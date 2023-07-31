import {FC, useState} from "react"

import {Space, Tag} from "antd"

import {IMovie} from "@/api/apiTypes"
import {errorMessage} from "@/notification"
import {
    deleteTagFromMovie,
    setTagToMovie
} from "@/redux/reducers"
import {useAppDispatch} from "@/redux/store"

import styles from './AddTags.module.scss'

import {ITag} from "@/types"

import {useColorToTag} from "./useColorToTag"

interface Props {
    movie: IMovie | undefined | null,
    tags: ITag[]
}

export const AddTags: FC<Props> = ({
    movie,
    tags,
}) => {
    const dispatch = useAppDispatch()
    const getColorTag = useColorToTag()
    const [allTagsTitle] = useState('All tags')
    const [movieTagsTitle] = useState('Movie tags')

    const handleTagClick = (value: ITag) => () => {
        const check = movie?.settings?.tags.find(tag => tag.tagName === value.tagName)

        if (check) {
            errorMessage(new Error, 'tag already exist')
        } else if (movie && movie.settings){
            dispatch(setTagToMovie(value))
        }
    }

    const handleMovieTagClick = (value: ITag) => () => {
        dispatch(deleteTagFromMovie(value))
    }

    const getTags = (t: ITag[], isMovieTag?: boolean) => t?.map(tag => {
        if (!tag.tagName) return null

        return (
            <Tag
                className={styles.tag}
                key={tag.tagName}
                color={getColorTag(tag.tagName)}
                onClick={isMovieTag
                    ? handleMovieTagClick(tag)
                    : handleTagClick(tag)
                }
            >
                {tag.tagName}
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