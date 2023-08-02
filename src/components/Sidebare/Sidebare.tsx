import {FC, useMemo, useState} from "react"
import {useSelector} from "react-redux"

import {CheckOutlined, CloseOutlined} from '@ant-design/icons'
import type {CollapseProps} from 'antd'
import {
    Button,
    Collapse,
    Switch,
    Tag,
} from "antd"


import {useFetchGenres} from "@/hooks/useFetchGenres"
import {
    addEnableFilters,
    removeEnableFilters,
    removeSelectGenres,
    removeSelectIgnoreGenres,
    setGenreFlagStatus,
    setSelectGenres,
    setSelectIgnoreGenres,
    setSortMovies
} from "@/redux/reducers"
import {
    getSelectEnableFilters,
    getSelectGenreFlagStatus,
    getSelectGenres,
    getSelectTags
} from "@/redux/selectors"

import styles from './Sidebare.module.scss'

import {getSelectIgnoreGenres} from "@/redux/selectors/profileSelectors"
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
    const selectIgnoreGenres = useSelector(getSelectIgnoreGenres)
    const genreFlagStatus = useSelector(getSelectGenreFlagStatus)
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

    const handleGenreTagClick = (value: IGenre) => () => {
        const isGenreExist = selectGenres.find(genre => genre.id === value.id)
        const isGenreIgnoreExist = selectIgnoreGenres.find(genre => genre.id === value.id)

        if (isGenreExist) {
            dispatch(removeSelectGenres(value))
        } else {
            dispatch(setSelectGenres(value))

            isGenreIgnoreExist && dispatch(removeSelectIgnoreGenres(value))
        }
    }

    const handleGenreIgnoreTagClick = (value: IGenre) => () => {
        const isGenreExist = selectGenres.find(genre => genre.id === value.id)
        const isGenreIgnoreExist = selectIgnoreGenres.find(genre => genre.id === value.id)

        if (isGenreIgnoreExist) {
            dispatch(removeSelectIgnoreGenres(value))
        } else {
            dispatch(setSelectIgnoreGenres(value))

            isGenreExist && dispatch(removeSelectGenres(value))
        }
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

    const handleGenreSwitchChange = (val: boolean) => {
        dispatch(setGenreFlagStatus(val))
    }

    const genresTags = () => {
        if (genreFlagStatus) {
            return (
                <div>
                    {!isGenresFetching
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
                        )}
                </div>
            )
        }

        return (
            <div>
                {!isGenresFetching
                    ? genresData?.map(genre => {
                        return (
                            <Tag
                                key={genre.id}
                                className={styles.tag}
                                color={selectIgnoreGenres.find(item => item.id === genre.id) ? 'volcano' : 'blue'}
                                onClick={handleGenreIgnoreTagClick(genre)}
                            >
                                {genre.name}
                            </Tag>
                        )
                    })
                    : (
                        <div>Loading..</div>
                    )}
            </div>
        )
    }

    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: 'Genres',
            children: <div className={styles.genreWrapper}>
                <Switch
                    className={styles.switch}
                    checkedChildren={<CheckOutlined rev={undefined} />}
                    unCheckedChildren={<CloseOutlined rev={undefined} />}
                    onChange={handleGenreSwitchChange}
                    defaultChecked
                />
                {genresTags()}
            </div>
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