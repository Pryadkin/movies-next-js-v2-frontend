'client'
import {useSelector} from 'react-redux'

import {Input} from 'antd'
import {Pagination} from 'antd'

import {CardItems} from '@/components/CardItems'
import {useFetchMovies} from '@/hooks/useFetchMovies'
import {
    setMovieName, setPage,
} from '@/redux/reducers'
import {
    getSelectMoviesName,
    getSelectTotalPages
} from '@/redux/selectors/searchSelectors'

import styles from './Search.module.scss'

import {useAppDispatch} from '@/redux/store/rootReducer'

const {Search} = Input

const SearchMovies = () => {
    const dispatch = useAppDispatch()
    const totalPages = useSelector(getSelectTotalPages)
    const movieName = useSelector(getSelectMoviesName)
    const {data, isFetching} = useFetchMovies()

    const handleMoviesSearch = (value: string) => {
        dispatch(setMovieName(value))
    }
    const handlePaginationChange = (value: number) => {
        dispatch(setPage(value))
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

            <CardItems
                data={data}
                isFetching={isFetching}
            />
        </div>
    )
}

export default SearchMovies