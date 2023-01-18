import {useSelector} from 'react-redux'

import {Input} from 'antd'
import {Pagination} from 'antd'

import {CardItems} from '@/components/CardItems'
import {
    getMovies,
    setMovieName,
} from '@/modules/reducers'
import {RootState, useAppDispatch} from '@/modules/store/rootReducer'

import styles from './Search.module.scss'

const {Search} = Input

const SearchMovies = () => {
    const dispatch = useAppDispatch()
    const {
        movies,
        totalPages,
        movieName,
    } = useSelector((state: RootState) => state.searchReducer)

    const handleMoviesSearch = (value: string) => {
        dispatch(setMovieName(value))
        dispatch(getMovies(value, true, '1'))
    }
    const handlePaginationChange = (value: number) => {
        dispatch(getMovies(movieName, true, String(value)))
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

            {totalPages && (
                <Pagination
                    className={styles.pagination}
                    defaultCurrent={6}
                    total={totalPages}
                    onChange={handlePaginationChange}
                />
            )}


            <CardItems movies={movies} />
        </div>

    )
}

export default SearchMovies