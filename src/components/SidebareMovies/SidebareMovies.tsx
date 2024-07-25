import {FC, SyntheticEvent, useState} from "react"
import {useSelector} from "react-redux"


import {CheckOutlined, CloseOutlined} from '@ant-design/icons'
import type {CollapseProps} from 'antd'
import {
    Button,
    Checkbox,
    Collapse,
    Select,
    Switch,
    Tag,
} from "antd"
import ButtonGroup from "antd/es/button/button-group"
import Search from "antd/es/input/Search"
import {useRouter} from 'next/router'


import styles from './SidebareMovies.module.scss'

import {useFetchGenres} from "@/hooks/useFetchGenres"
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
    setSearchMovie,
    setSortMovies
} from "@/redux/reducers"
import {setMovieIsWithDateOfViewing} from "@/redux/reducers/profileReducer/profileSlice"
import {
    getSelectGenreFlagStatus,
    getSelectTags
} from "@/redux/selectors"
import {getSelectLanguage} from "@/redux/selectors/layoutSelectors"
import {
    getSelectIgnoreGenres,
    getSelectMovieIsWithDateOfViewing,
    getSelectSelIgnoreTags,
    getSelectSortItem,
} from "@/redux/selectors/profileSelectors"
import {useAppDispatch} from "@/redux/store"
import {IGenre, ITag} from "@/types"

import {ISelectSort, TSortName, sortOptions} from "./types"

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
    const {selectGenres} = useFetchSelectGenres()
    const {selectTags} = useFetchSelectTags()
    const {mutationSetGenreFilter} = useSetGenreFilter()
    const {mutationSetTagFilter} = useSetTagFilter()
    const [tagFlagStatus, setTagFlagStatus] = useState(true)
    const movieIsWithDateOfViewing = useSelector(getSelectMovieIsWithDateOfViewing)
    const sortType = useSelector(getSelectSortItem)
    const [selectSortValue, setSelectSortValue] = useState<TSortName>('date_of_viewing')

    const handleSortTypeClick = (val: 'asc' | 'desc') => () => {
        dispatch(setSortMovies({
            name: selectSortValue,
            type: val
        }))
    }

    const getSelectSortOptions = (opt: ISelectSort[]) => {
        return opt.map(elem => ({
            label: elem.title,
            value: elem.name,
        }))
    }

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
                    value={movieIsWithDateOfViewing}
                    defaultChecked={movieIsWithDateOfViewing}
                    onChange={() => dispatch(setMovieIsWithDateOfViewing(!movieIsWithDateOfViewing))}>
                        with date of viewing
                </Checkbox>
                <div className={styles.sortWrapper}>
                    <Select
                        size="small"
                        className={styles.select}
                        value={selectSortValue}
                        options={getSelectSortOptions(sortOptions)}
                        placeholder={'sort'}
                        onChange={setSelectSortValue}
                    />
                    <br />
                    <ButtonGroup>
                        <Button
                            size="small"
                            type={sortType.type === 'asc' ? 'primary' : 'default'}
                            onClick={handleSortTypeClick('asc')}>
                        ASC
                        </Button>
                        <Button
                            size="small"
                            type={sortType.type === 'desc' ? 'primary' : 'default'}
                            onClick={handleSortTypeClick('desc')}>
                        DESC
                        </Button>
                    </ButtonGroup>
                </div>
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