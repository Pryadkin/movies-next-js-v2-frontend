import {FC, SyntheticEvent, useState} from "react"
import {useSelector} from "react-redux"


import {CheckOutlined, CloseOutlined} from '@ant-design/icons'
import type {CollapseProps} from 'antd'
import {
    Button,
    Checkbox,
    Collapse,
    Switch,
    Tag,
} from "antd"
import Search from "antd/es/input/Search"
import {useRouter} from 'next/router'


import {useFetchGenres} from "@/hooks/useFetchGenres"

import styles from './SidebareMovies.module.scss'

import {useFetchSelectGenres} from "@/hooks/useFetchSelectGenres"
import {useFetchSelectTags} from "@/hooks/useFetchSelectTags"
import {useSetGenreFilter} from "@/hooks/useSetGenreFilter"
import {useSetTagFilter} from "@/hooks/useSetTagFilter"
import {
    addSelectIgnoreGenres,
    addSelectIgnoreTags,
    removeSelectGenres,
    removeSelectIgnoreGenres,
    removeSelectIgnoreTags,
    removeSelectTags,
    setGenreFlagStatus,
    setLanguage,
    setMovieIsWithoutDateInBack,
    setSearchMovie,
    setSortMovies
} from "@/redux/reducers"
import {
    getSelectGenreFlagStatus,
    getSelectTags
} from "@/redux/selectors"
import {getSelectLanguage} from "@/redux/selectors/layoutSelectors"
import {
    getSelectIgnoreGenres,
    getSelectMovieIsWithoutDateInBack,
    getSelectSelIgnoreTags,
    getSelectSortItem
} from "@/redux/selectors/profileSelectors"
import {useAppDispatch} from "@/redux/store"
import {IGenre, ITag, TSortItem} from "@/types"

interface Props {
    onModalOpen: (value: boolean) => void
}

export const SidebareMovies: FC<Props> = ({onModalOpen}) => {
    const dispatch = useAppDispatch()
    const {push} = useRouter()
    const lang = useSelector(getSelectLanguage)
    const tags = useSelector(getSelectTags)
    const selectIgnoreTags = useSelector(getSelectSelIgnoreTags)
    const selectIgnoreGenres = useSelector(getSelectIgnoreGenres)
    const genreFlagStatus = useSelector(getSelectGenreFlagStatus)
    const sortMoviesType= useSelector(getSelectSortItem)
    const {selectGenres} = useFetchSelectGenres()
    const {selectTags} = useFetchSelectTags()
    const {mutationSetGenreFilter} = useSetGenreFilter()
    const {mutationSetTagFilter} = useSetTagFilter()
    const [tagFlagStatus, setTagFlagStatus] = useState(true)
    const [isAscSorted, setIsAscSorted] = useState(sortMoviesType)
    const movieIsWithoutDateInBack = useSelector(getSelectMovieIsWithoutDateInBack)

    const {
        genresData,
        isGenresFetching
    } = useFetchGenres()

    const handleCustomTagClick = (value: ITag) => () => {
        mutationSetTagFilter.mutate(value)
    }

    const handleCustomTagIgnoreClick = (value: ITag) => () => {
        const isTagExist = selectTags?.find(tag => tag.tagName === value.tagName)
        const isTagIgnoreExist = selectIgnoreTags.find(tag => tag.tagName === value.tagName)

        if (isTagIgnoreExist) {
            dispatch(removeSelectIgnoreTags(value))
        } else {
            dispatch(addSelectIgnoreTags(value))

            isTagExist && dispatch(removeSelectTags(value))
        }
    }

    const handleGenreTagClick = (value: IGenre) => () => {
        mutationSetGenreFilter.mutate(value)
    }

    const handleGenreIgnoreTagClick = (value: IGenre) => () => {
        const isGenreExist = selectGenres?.find(genre => genre.genreId === value.genreId)
        const isGenreIgnoreExist = selectIgnoreGenres.find(genre => genre.genreId === value.genreId)

        if (isGenreIgnoreExist) {
            dispatch(removeSelectIgnoreGenres(value))
        } else {
            dispatch(addSelectIgnoreGenres(value))

            isGenreExist && dispatch(removeSelectGenres(value))
        }
    }

    const handleSortedMovieBtnClick = (value: TSortItem) => () => {
        dispatch(setSortMovies(value))
        setIsAscSorted(value)
    }

    const handleGenreSwitchChange = (val: boolean) => {
        dispatch(setGenreFlagStatus(val))
    }

    const groupTags = (tags: ITag[]) => {
        return (
            <div>
                {tags?.map(tag => {
                    if (tagFlagStatus) {
                        return (
                            <Tag
                                key={tag.tagName}
                                className={styles.tag}
                                color={selectTags?.find(item => item.tagName === tag.tagName) ? 'cyan' : 'default'}
                                onClick={handleCustomTagClick(tag)}
                            >
                                {tag.tagName}
                            </Tag>
                        )
                    }
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

    const customTags = (tags: ITag[]) => {
        if (tagFlagStatus) {
            return (
                <div>
                    {tags?.map(tag => {
                        return (
                            <Tag
                                key={tag.tagName}
                                className={styles.tag}
                                color={selectTags?.find(item => item.tagName === tag.tagName) ? 'cyan' : 'default'}
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
                                    key={genre.genreId}
                                    className={styles.tag}
                                    color={selectGenres?.find(item => item.genreId === genre.genreId) ? 'cyan' : 'default'}
                                    onClick={handleGenreTagClick(genre)}
                                >
                                    {genre.name}
                                </Tag>
                            )
                        })
                        : (
                            <div>Loading...</div>
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
                                key={genre.genreId}
                                className={styles.tag}
                                color={selectIgnoreGenres.find(item => item.genreId === genre.genreId) ? 'volcano' : 'blue'}
                                onClick={handleGenreIgnoreTagClick(genre)}
                            >
                                {genre.name}
                            </Tag>
                        )
                    })
                    : (
                        <div>Loading...</div>
                    )}
            </div>
        )
    }

    const [searchMovieInput, setSearchMovieInput] = useState('')

    const handleSearchMovieChange = ({target}: SyntheticEvent) => {
        const targetInputElement: HTMLInputElement = target as HTMLInputElement
        setSearchMovieInput(targetInputElement.value)
    }

    const handleSearchMovieClick = () => {
        dispatch(setSearchMovie(searchMovieInput))
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
            label: 'Group',
            children: <div className={styles.genreWrapper}>
                <Switch
                    className={styles.switch}
                    checkedChildren={<CheckOutlined rev={undefined} />}
                    unCheckedChildren={<CloseOutlined rev={undefined} />}
                    onChange={() => setTagFlagStatus(!tagFlagStatus)}
                    defaultChecked
                />
                {groupTags(tags.filter(elem => elem.isGroup))}
            </div>,
        },
        {
            key: '3',
            label: 'All tags',
            children: <div className={styles.genreWrapper}>
                <Switch
                    className={styles.switch}
                    checkedChildren={<CheckOutlined rev={undefined} />}
                    unCheckedChildren={<CloseOutlined rev={undefined} />}
                    onChange={() => setTagFlagStatus(!tagFlagStatus)}
                    defaultChecked
                />
                {customTags(tags.filter(elem => !elem.isGroup))}
            </div>,
        },
        {
            key: '4',
            label: 'Sort',
            children: <div className={styles.dateWrapper}>
                <Checkbox
                    style={{marginBottom: '10px'}}
                    value={movieIsWithoutDateInBack}
                    defaultChecked={movieIsWithoutDateInBack}
                    onChange={() => dispatch(setMovieIsWithoutDateInBack(!movieIsWithoutDateInBack))}>
                        without date in back
                </Checkbox>
                <Button
                    size="small"
                    type={isAscSorted === 'ascReleaseDate' ? 'primary' : 'default'}
                    onClick={handleSortedMovieBtnClick('ascReleaseDate')}
                >
                    Viewing release date asc
                </Button>
                <Button
                    size="small"
                    type={isAscSorted === 'descReleaseDate' ? 'primary' : 'default'}
                    onClick={handleSortedMovieBtnClick('descReleaseDate')}
                >
                    Viewing release date desc
                </Button>
                <Button
                    size="small"
                    type={isAscSorted === 'ascDate' ? 'primary' : 'default'}
                    onClick={handleSortedMovieBtnClick('ascDate')}
                >
                    Viewing date asc
                </Button>
                <Button
                    size="small"
                    type={isAscSorted === 'descDate' ? 'primary' : 'default'}
                    onClick={handleSortedMovieBtnClick('descDate')}
                >
                    Viewing date desc
                </Button>
            </div>,
        },
    ]

    const handleLangClick = () => {
        const correctLang = lang === 'ru-RU' ? 'en-EN' : 'ru-RU'
        dispatch(setLanguage(correctLang))
    }

    return (
        <div className={styles.wrapper}>
            <Button
                style={{width: '100px', marginBottom: '10px'}}
                size="small"
                type='primary'
                onClick={handleLangClick}
            >
                {lang}
            </Button>

            <Search
                className={styles.search}
                size='small'
                value={searchMovieInput}
                onSearch={handleSearchMovieClick}
                onChange={handleSearchMovieChange}
            />

            <hr />

            <Button
                className={styles.btn}
                size="small"
                onClick={() => push('profile-movies')}
            >
                MOVIES
            </Button>

            <Button
                className={styles.btn}
                size="small"
                onClick={() => push('profile-persons')}
            >
                PERSONS
            </Button>

            <hr />

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
                defaultActiveKey={['4']}
                size="small"
            />
        </div>
    )
}