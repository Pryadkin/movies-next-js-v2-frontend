import {useDispatch, useSelector} from 'react-redux'

import {Input} from 'antd'

import {CardItems} from '@/components/CardItems'
import {getMovies} from '@/modules/reducers'
import {RootState} from '@/modules/store/rootReducer'

import styles from './Search.module.scss'

const {Search} = Input

const SearchMovies = () => {
    const dispatch = useDispatch()
    const movies = useSelector((state: RootState) => state.searchReducer.movies)
    const handleMoviesSearch = (value: string) => {
        dispatch<any>(getMovies(value, true, '1'))
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
            <CardItems movies={movies} />
        </div>

    )
}

export default SearchMovies
