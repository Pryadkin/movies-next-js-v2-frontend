'client'
import {useState} from 'react'
import {useSelector} from 'react-redux'

import {Input, Radio, RadioChangeEvent} from 'antd'
import {Pagination} from 'antd'

import {CardItems} from '@/components/CardItems'
import {useFetchMulti} from '@/hooks/useFetchMulti'
import {
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

const SearchMovies = () => {
    const dispatch = useAppDispatch()
    const totalPages = useSelector(getSelectTotalPages)
    const movieName = useSelector(getSelectMoviesName)
    const tvName = useSelector(getSelectTvName)
    const lang = useSelector(getSelectLanguage)
    const {mutationMovieFetch} = useFetchMulti(lang)
    const data = mutationMovieFetch.data
    const [selectType, setSelectType] = useState<any>('')

    const isMovieName = movieName || tvName

    const handleMoviesSearch = (value: string) => {
        mutationMovieFetch.mutate({
            searchName: value,
            selectType,
            page: '1'
        })

    }
    const handlePaginationChange = (value: number) => {
        dispatch(setPage(value))
    }

    const handleSearchTypeChange = ({target}: RadioChangeEvent) => {
        switch (target.value) {
            case "a": {
                setSelectType('movie')
                break
            }
            case "b": {
                setSelectType('tv')
                break
            }
            case "c": {
                setSelectType('multi')
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
                    <Radio.Button value="c">Multi</Radio.Button>
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

            {data && (
                <CardItems
                    data={data}
                    isFetching={false}
                />
            )}

        </div>
    )
}

export default SearchMovies