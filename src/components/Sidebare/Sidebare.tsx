import {FC, useState} from "react"
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
    addSelectGenres,
    addSelectIgnoreGenres,
    addSelectIgnoreTags,
    addSelectTags,
    removeSelectGenres,
    removeSelectIgnoreGenres,
    removeSelectIgnoreTags,
    removeSelectTags,
    setGenreFlagStatus,
    setSortMovies
} from "@/redux/reducers"
import {
    getSelectGenreFlagStatus,
    getSelectGenres,
    getSelectTags
} from "@/redux/selectors"

import styles from './Sidebare.module.scss'

import {getSelectIgnoreGenres, getSelectSelIgnoreTags, getSelectSelTags} from "@/redux/selectors/profileSelectors"
import {useAppDispatch} from "@/redux/store"
import {IGenre, ITag, TSortItem} from "@/types"

interface Props {
    onModalOpen: (value: boolean) => void
}

export const Sidebare: FC<Props> = ({onModalOpen}) => {
    const dispatch = useAppDispatch()
    const tags = useSelector(getSelectTags)
    const selectTags = useSelector(getSelectSelTags)
    const selectIgnoreTags = useSelector(getSelectSelIgnoreTags)
    const selectGenres = useSelector(getSelectGenres)
    const selectIgnoreGenres = useSelector(getSelectIgnoreGenres)
    const genreFlagStatus = useSelector(getSelectGenreFlagStatus)
    const [tagFlagStatus, setTagFlagStatus] = useState(true)

    const {
        genresData,
        isGenresFetching
    } = useFetchGenres()

    const handleCustomTagClick = (value: ITag) => () => {
        const isTagExist = selectTags.find(tag => tag.tagName === value.tagName)
        const isTagIgnoreExist = selectIgnoreTags.find(tag => tag.tagName === value.tagName)

        if (isTagExist) {
            dispatch(removeSelectTags(value))
        } else {
            dispatch(addSelectTags(value))

            isTagIgnoreExist && dispatch(removeSelectIgnoreTags(value))
        }
    }

    const handleCustomTagIgnoreClick = (value: ITag) => () => {
        const isTagExist = selectTags.find(tag => tag.tagName === value.tagName)
        const isTagIgnoreExist = selectIgnoreTags.find(tag => tag.tagName === value.tagName)

        if (isTagIgnoreExist) {
            dispatch(removeSelectIgnoreTags(value))
        } else {
            dispatch(addSelectIgnoreTags(value))

            isTagExist && dispatch(removeSelectTags(value))
        }
    }

    const handleGenreTagClick = (value: IGenre) => () => {
        const isGenreExist = selectGenres.find(genre => genre.id === value.id)
        const isGenreIgnoreExist = selectIgnoreGenres.find(genre => genre.id === value.id)

        if (isGenreExist) {
            dispatch(removeSelectGenres(value))
        } else {
            dispatch(addSelectGenres(value))

            isGenreIgnoreExist && dispatch(removeSelectIgnoreGenres(value))
        }
    }

    const handleGenreIgnoreTagClick = (value: IGenre) => () => {
        const isGenreExist = selectGenres.find(genre => genre.id === value.id)
        const isGenreIgnoreExist = selectIgnoreGenres.find(genre => genre.id === value.id)

        if (isGenreIgnoreExist) {
            dispatch(removeSelectIgnoreGenres(value))
        } else {
            dispatch(addSelectIgnoreGenres(value))

            isGenreExist && dispatch(removeSelectGenres(value))
        }
    }

    const [isAscSorted, setIsAscSorted] = useState(false)

    const handleSortedMovieBtnClick = (value: TSortItem) => () => {
        dispatch(setSortMovies(value))
        setIsAscSorted(value === 'ascDate')
    }

    const handleGenreSwitchChange = (val: boolean) => {
        dispatch(setGenreFlagStatus(val))
    }

    const customTags = () => {
        if (tagFlagStatus) {
            return (
                <div>
                    {tags?.map(tag => {
                        return (
                            <Tag
                                key={tag.tagName}
                                className={styles.tag}
                                color={selectTags.find(item => item.tagName === tag.tagName) ? 'cyan' : 'default'}
                                onClick={handleCustomTagClick(tag)}
                            >
                                {tag.tagName}
                            </Tag>
                        )
                    })}
                </div>
            )
        }

        return (
            <div>
                {tags?.map(tag => {
                    return (
                        <Tag
                            key={tag.tagName}
                            className={styles.tag}
                            color={selectIgnoreTags.find(item => item.tagName === tag.tagName) ? 'volcano' : 'blue'}
                            onClick={handleCustomTagIgnoreClick(tag)}
                        >
                            {tag.tagName}
                        </Tag>
                    )
                })}
            </div>
        )
    }

    const genreTags = () => {
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
                {genreTags()}
            </div>
        },
        {
            key: '2',
            label: 'All tags',
            children: <div className={styles.genreWrapper}>
                <Switch
                    className={styles.switch}
                    checkedChildren={<CheckOutlined rev={undefined} />}
                    unCheckedChildren={<CloseOutlined rev={undefined} />}
                    onChange={() => setTagFlagStatus(!tagFlagStatus)}
                    defaultChecked
                />
                {customTags()}
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