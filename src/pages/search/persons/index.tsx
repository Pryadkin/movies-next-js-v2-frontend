/* eslint-disable react-hooks/exhaustive-deps */
'client'
import {useEffect} from 'react'
import {useSelector} from 'react-redux'

import {Input} from 'antd'
import {Pagination} from 'antd'

import {CardPerson} from '@/components/CardPerson'
import {useSearchPerson} from '@/hooks/useSearchPerson'
import {
    setPage,
    setPersonName,
} from '@/redux/reducers'

import styles from './Search.module.scss'

import {getSelectLanguage} from '@/redux/selectors/layoutSelectors'
import {
    getSelectPersonName,
    getSelectTotalPages,
    getSelectTvName
} from '@/redux/selectors/searchSelectors'
import {useAppDispatch} from '@/redux/store/rootReducer'

const {Search} = Input

const SearchPerson = () => {
    const dispatch = useAppDispatch()
    const totalPages = useSelector(getSelectTotalPages)
    const personName = useSelector(getSelectPersonName)
    const tvName = useSelector(getSelectTvName)
    const lang = useSelector(getSelectLanguage)
    const {mutationPersonSearch} = useSearchPerson(lang)
    const data = mutationPersonSearch.data

    const isPersonName = personName || tvName

    useEffect(() => {
        mutationPersonSearch.mutate({
            searchName: personName,
            page: '1'
        })
    }, [])

    const handlePersonSearch = (value: string) => {
        dispatch(setPersonName(value))

        mutationPersonSearch.mutate({
            searchName: value,
            page: '1'
        })
    }
    const handlePaginationChange = (value: number) => {
        dispatch(setPage(value))

        mutationPersonSearch.mutate({
            searchName: personName,
            page: String(value)
        })
    }

    return (
        <div className={styles.searchWrapper}>
            <div className={styles.inputWrapper}>
                <Search
                    defaultValue={personName}
                    className={styles.searchInput}
                    placeholder="input person name"
                    allowClear
                    enterButton="Search"
                    onSearch={handlePersonSearch}
                />
            </div>

            {totalPages && isPersonName && (
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