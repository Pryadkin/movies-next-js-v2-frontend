'client'
import {useEffect} from 'react'
import {useSelector} from 'react-redux'

import {Input, Radio, RadioChangeEvent} from 'antd'
import {Pagination} from 'antd'

import {CardItems} from '@/components/CardItems'
import {useFetchMovies} from '@/hooks/useFetchMovies'
import {useFetchTv} from '@/hooks/useFetchTv'
import {
    setMovieName, setMovieType, setPage, setTvName,
} from '@/redux/reducers'

import styles from './Search.module.scss'

import {getSelectLanguage} from '@/redux/selectors/layoutSelectors'
import {
    getSelectMovieType,
    getSelectMoviesName,
    getSelectTotalPages,
    getSelectTvName
} from '@/redux/selectors/searchSelectors'
import {useAppDispatch} from '@/redux/store/rootReducer'

const {Search} = Input

const SearchMovies = () => {
    const dispatch = useAppDispatch()
    const totalPages = useSelector(getSelectTotalPages)
    const movieName = useSelector(getSelectMoviesName)
    const tvName = useSelector(getSelectTvName)
    const lang = useSelector(getSelectLanguage)
    const movieType = useSelector(getSelectMovieType)
    const {data, isFetching} = useFetchMovies(lang)
    const {
        data: dataTv,
        isFetching: isTvFetching
    } = useFetchTv(lang)

    const isMovieName = movieName || tvName

    const handleMoviesSearch = (value: string) => {
        if (movieType === 'movie') {
            dispatch(setMovieName(value))
            dispatch(setTvName(''))
        } else {
            dispatch(setTvName(value))
            dispatch(setMovieName(''))
        }
    }
    const handlePaginationChange = (value: number) => {
        dispatch(setPage(value))
    }

    const handleSearchTypeChange = ({target}: RadioChangeEvent) => {
        switch (target.value) {
            case "a": {
                dispatch(setMovieType('movie'))
                break
            }
            case "b": {
                dispatch(setMovieType('tv'))
                break
            }
            default: {
                break
            }
        }
    }

    return (
        <div className={styles.searchWrapper}>
            <div className={styles.inputWrapper}>
                <Radio.Group
                    defaultValue="a"
                    buttonStyle="outline"
                    className={styles.radioGroup}
                    onChange={handleSearchTypeChange}
                >
                    <Radio.Button value="a">Movies</Radio.Button>
                    <Radio.Button value="b">TV</Radio.Button>
                </Radio.Group>

                <Search
                    className={styles.searchInput}
                    placeholder="input movie name"
                    allowClear
                    enterButton="Search"
                    onSearch={handleMoviesSearch}
                />
            </div>

            {totalPages && isMovieName && (
                <Pagination
                    className={styles.pagination}
                    defaultCurrent={1}
                    total={totalPages}
                    showSizeChanger={false}
                    onChange={handlePaginationChange}
                />
            )}

            {movieName && (
                <CardItems
                    data={data}
                    isFetching={isFetching}
                />
            )}

            {tvName && (
                <CardItems
                    data={dataTv}
                    isFetching={isTvFetching}
                />
            )}

        </div>
    )
}

export default SearchMovies