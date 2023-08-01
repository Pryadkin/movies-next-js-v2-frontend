import {FC, useMemo, useState} from "react"
import {useSelector} from "react-redux"

import type {CollapseProps} from 'antd'
import {
    Button,
    Collapse,
    Tag,
} from "antd"

import {useFetchGenres} from "@/hooks/useFetchGenres"
import {
    addEnableFilters,
    removeEnableFilters,
    setSelectGenres,
    setSortMovies
} from "@/redux/reducers"
import {
    getSelectEnableFilters,
    getSelectGenres,
    getSelectTags
} from "@/redux/selectors"

import styles from './Sidebare.module.scss'

import {useAppDispatch} from "@/redux/store"
import {IGenre, ITag, TSortItem} from "@/types"

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

    const [isAscSorted, setIsAscSorted] = useState(false)

    const handleSortedMovieBtnClick = (value: TSortItem) => () => {
        dispatch(setSortMovies(value))
        setIsAscSorted(value === 'ascDate')
    }

    const items: CollapseProps['items'] = [
        {
            key: '1',
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
        {
            key: '2',
            label: 'All tags',
            children: <div>
                <h3>Selected tags</h3>
                {enableFilters && getTags(enableFilters, true)}

                <h3>Tags</h3>
                {tagsWithoutEnable && getTags(tagsWithoutEnable)}
            </div>,
        },
        {
            key: '3',
            label: 'Sort',
            children: <div className={styles.dateWrapper}>
                <Button
                    size="small"
                    type={isAscSorted ? 'primary' : 'default'}
                    onClick={handleSortedMovieBtnClick('ascDate')}
                >
                    Viewing date asc
                </Button>
                <Button
                    size="small"
                    type={!isAscSorted ? 'primary' : 'default'}
                    onClick={handleSortedMovieBtnClick('descDate')}
                >
                    Viewing date desc
                </Button>
            </div>,
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
                defaultActiveKey={['1', '2', '3']}
                size="small"
            />
        </div>
    )
}