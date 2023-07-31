import {FC, useMemo} from "react"
import {useSelector} from "react-redux"

import type {CollapseProps} from 'antd'
import {
    Button,
    Collapse,
    Tag
} from "antd"

import {useFetchGenres} from "@/hooks/useFetchGenres"
import {
    addEnableFilters,
    removeEnableFilters,
    setSelectGenres
} from "@/redux/reducers"
import {
    getSelectEnableFilters,
    getSelectGenres,
    getSelectTags
} from "@/redux/selectors"
import {useAppDispatch} from "@/redux/store"

import styles from './Sidebare.module.scss'

import {IGenre, ITag} from "@/types"

import {useColorToTag} from "../AddTags/useColorToTag"
interface Props {
    onModalOpen: (value: boolean) => void
}

export const Sidebare: FC<Props> = ({onModalOpen}) => {
    const dispatch = useAppDispatch()
    const tags = useSelector(getSelectTags)
    const enableFilters = useSelector(getSelectEnableFilters)
    const selectGenres = useSelector(getSelectGenres)
    const tagsWithoutEnable = useMemo(() => {
        return tags ? tags.filter(tag => !enableFilters.includes(tag)) : []
    }, [tags, enableFilters])
    const getColorTag = useColorToTag()

    const {
        genresData,
        isGenresFetching
    } = useFetchGenres()

    const handleTagClick = (tag: ITag) => () => {
        dispatch(addEnableFilters(tag))
    }

    const handleEnableFilterClick = (tag: ITag) => () => {
        dispatch(removeEnableFilters(tag))
    }

    const handleGenreTagClick = (genre: IGenre) => () => {
        dispatch(setSelectGenres(genre))
    }

    const getTags = (t: ITag[], isEnable?: boolean) => t.map(tag => {
        if (isEnable) {
            return (
                <Tag
                    className={styles.tag}
                    key={tag.tagName}
                    color={getColorTag(tag.tagName)}
                    onClick={handleEnableFilterClick(tag)}
                >
                    {tag.tagName}
                </Tag>
            )
        }
        return (
            <Tag
                className={styles.tag}
                key={tag.tagName}
                color={getColorTag(tag.tagName)}
                onClick={handleTagClick(tag)}
            >
                {tag.tagName}
            </Tag>
        )
    })

    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: 'All tags',
            children: <div className="tagsWrapper">
                <>
                    <h3>Selected tags</h3>
                    {enableFilters && getTags(enableFilters, true)}

                    <h3>Tags</h3>
                    {tagsWithoutEnable && getTags(tagsWithoutEnable)}
                </>
            </div>,
        },
        {
            key: '2',
            label: 'Genres',
            children: !isGenresFetching
                ? genresData?.map(genre => {
                    return (
                        <Tag
                            key={genre.id}
                            className={styles.tag}
                            color={selectGenres.find(item => item.id === genre.id) ? 'cyan' : 'default'}
                            onClick={handleGenreTagClick(genre)}
                        >
                            {genre.name}
                        </Tag>
                    )
                })
                : (
                    <div>Loading..</div>
                ),
        },
    ]

    return (
        <div className={styles.wrapper}>
            <Button
                className={styles.btn}
                size="small"
                onClick={() => onModalOpen(true)}
            >
                SETTINGS
            </Button>

            <Collapse
                className={styles.collapse}
                items={items}
                defaultActiveKey={['1']}
                size="small"
            />
        </div>
    )
}