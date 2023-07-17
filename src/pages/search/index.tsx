import {useSelector} from 'react-redux'

import {Input} from 'antd'
import {Pagination} from 'antd'

import {CardItems} from '@/components/CardItems'
import {
    getMovies,
    setMovieName,
} from '@/redux/reducers'
import {getSelectMovies, getSelectMoviesName, getSelectTotalPages} from '@/redux/selectors/searchSelectors'
import {useAppDispatch} from '@/redux/store/rootReducer'

import styles from './Search.module.scss'

const {Search} = Input

const SearchMovies = () => {
    const dispatch = useAppDispatch()
    const movies = useSelector(getSelectMovies)
    const totalPages = useSelector(getSelectTotalPages)
    const movieName = useSelector(getSelectMoviesName)

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

            {totalPages && movieName && (
                <Pagination
                    className={styles.pagination}
                    defaultCurrent={1}
                    total={totalPages}
                    showSizeChanger={false}
                    onChange={handlePaginationChange}
                />
            )}

            {movieName && (
                <CardItems movies={movies} />
            )}
        </div>

    )
}

export default SearchMovies