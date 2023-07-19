'client'
import {useState} from 'react'
import {useSelector} from 'react-redux'

import {
    useQueryClient,
} from '@tanstack/react-query'
import {Input} from 'antd'
import {Pagination} from 'antd'

import {CardItems} from '@/components/CardItems'
import {
    setMovieName,
} from '@/redux/reducers'

import styles from './Search.module.scss'

import {getSelectMovies, getSelectMoviesName, getSelectTotalPages} from '@/redux/selectors/searchSelectors'
import {useAppDispatch} from '@/redux/store/rootReducer'

const {Search} = Input

const SearchMovies = () => {
    const dispatch = useAppDispatch()
    const movies = useSelector(getSelectMovies)
    const totalPages = useSelector(getSelectTotalPages)
    const movieName = useSelector(getSelectMoviesName)
    const [page, setPage] = useState('1')

    const handleMoviesSearch = (value: string) => {
        dispatch(setMovieName(value))
        // dispatch(getMovies(value, true, '1'))
    }
    const handlePaginationChange = (value: number) => {
        setPage(String(value))
        // dispatch(getMovies(movieName, true, String(value)))
    }


    return (
        <div className={styles.searchWrapper}>
            <Search
                className={styles.searchInput}
                placeholder="input movie name"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={handleMoviesSearch}
            />

            {totalPages && movieName && (
                <Pagination
                    className={styles.pagination}
                    defaultCurrent={1}
                    total={totalPages}
                    showSizeChanger={false}
                    onChange={handlePaginationChange}
                />
            )}

            {movies && (
                <CardItems movies={movies} />
            )}
        </div>
    )
}

export default SearchMovies