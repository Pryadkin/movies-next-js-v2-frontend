import {FC, useState} from "react"

import {Space, Tag} from "antd"

import {IMovie} from "@/api/apiTypes"
import {useUpdateProfileMovie} from "@/hooks/useUpdateProfileMovie"
import {errorMessage} from "@/notification"
import {setTagToMovie} from "@/redux/reducers"

import styles from './AddTags.module.scss'

import {useAppDispatch} from "@/redux/store"

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
    const [movieTagstitle] = useState('Movie tags')

    const handleTagClick = (value: string) => () => {
        const check = movie?.settings?.tags.find(tag => tag === value)

        if (check) {
            errorMessage(new Error, 'tag already exist')
        } else if (movie && movie.settings){
            dispatch(setTagToMovie(value))
            // const updateMovie = {
            //     ...movie,
            //     settings: {
            //         ...movie.settings,
            //         tags: [
            //             ...movie.settings.tags,
            //             value,
            //         ]
            //     }
            // }


        }
    }

    const getTags = (t: string[]) => t.map(tag => {
        return (
            <Tag
                className={styles.tag}
                key={tag}
                color={getColorTag(tag)}
                onClick={handleTagClick(tag)}
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
                <h3>{movieTagstitle}</h3>
                <div className={styles.tagsWrapper}>
                    {movie?.settings && getTags(movie?.settings.tags)}
                </div>
            </Space.Compact>
        </Space>
    )
}