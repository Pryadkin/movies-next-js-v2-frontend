'client'
import {useSelector} from 'react-redux'

import {Input} from 'antd'
import {Pagination} from 'antd'

import {CardPerson} from '@/components/CardPerson'
import {useSearchPerson} from '@/hooks/useSearchPerson'
import {
    setMovieName,
    setPage,
} from '@/redux/reducers'

import styles from './Search.module.scss'

import {getSelectLanguage} from '@/redux/selectors/layoutSelectors'
import {
    getSelectMoviesName,
    getSelectTotalPages,
    getSelectTvName
} from '@/redux/selectors/searchSelectors'
import {useAppDispatch} from '@/redux/store/rootReducer'

const {Search} = Input

const SearchPerson = () => {
    const dispatch = useAppDispatch()
    const totalPages = useSelector(getSelectTotalPages)
    const movieName = useSelector(getSelectMoviesName)
    const tvName = useSelector(getSelectTvName)
    const lang = useSelector(getSelectLanguage)
    const {mutationPersonSearch} = useSearchPerson(lang)
    const data = mutationPersonSearch.data

    const isMovieName = movieName || tvName

    const handleMoviesSearch = (value: string) => {
        dispatch(setMovieName(value))

        mutationPersonSearch.mutate({
            searchName: value,
            page: '1'
        })
    }
    const handlePaginationChange = (value: number) => {
        dispatch(setPage(value))

        mutationPersonSearch.mutate({
            searchName: movieName,
            page: String(value)
        })
    }

    return (
        <div className={styles.searchWrapper}>
            <div className={styles.inputWrapper}>
                <Search
                    className={styles.searchInput}
                    placeholder="input person name"
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

            <div className={styles.cardWrapper}>
                {data && data.map(person => (
                    <CardPerson
                        key={person.id}
                        data={person}
                    />
                )) }
            </div>
        </div>
    )
}

export default SearchPerson