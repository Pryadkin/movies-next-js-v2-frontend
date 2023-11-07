import {useEffect, useState} from "react"
import {useSelector} from "react-redux"

import {Pagination, Radio} from "antd"

import {CardItems} from "@/components/CardItems"
import {useFetchTopRated} from "@/hooks/useFetchTopRated"
import {setPage} from "@/redux/reducers"
import {getSelectPage} from "@/redux/selectors"
import {getSelectLanguage} from "@/redux/selectors/layoutSelectors"

import styles from './TopRated.module.scss'

import {useAppDispatch} from "@/redux/store"
import {TMovieType} from "@/types"


const TopRated = () => {
    const dispatch = useAppDispatch()
    const lang = useSelector(getSelectLanguage)
    const page = useSelector(getSelectPage)
    const {mutationMovieFetch} = useFetchTopRated(lang)
    const data = mutationMovieFetch.data
    const totalPages = data?.total_pages
    const isLoading = mutationMovieFetch.isLoading

    const [typeMovie, setTypeMovie] = useState<TMovieType>('movie')

    const handlePaginationChange = (value: number) => {
        dispatch(setPage(value))

        mutationMovieFetch.mutate({
            page: `${value}`,
            typeMovie,
        })
    }

    const handleSearchTypeChange = ({target}: any) => {
        switch (target.value) {
            case "a": {
                dispatch(setPage(1))
                setTypeMovie('movie')
                mutationMovieFetch.mutate({
                    page: '1',
                    typeMovie: 'movie',
                })
                break
            }
            case "b": {
                dispatch(setPage(1))
                setTypeMovie('tv')
                mutationMovieFetch.mutate({
                    page: '1',
                    typeMovie: 'tv',
                })
                break
            }
            default: {
                break
            }
        }
    }

    useEffect(() => {
        mutationMovieFetch.mutate({
            page: String(page),
            typeMovie,
        })
    }, [])

    return (
        <div className={styles.wrapper}>
            <div className={styles.headerElements}>
                <Radio.Group
                    defaultValue="c"
                    buttonStyle="outline"
                    className={styles.radioGroup}
                    onChange={handleSearchTypeChange}
                >
                    <Radio.Button value="a">Movies</Radio.Button>
                    <Radio.Button value="b">TV</Radio.Button>
                </Radio.Group>

                {totalPages && (
                    <Pagination
                        className={styles.pagination}
                        defaultCurrent={page}
                        total={totalPages}
                        showSizeChanger={false}
                        onChange={handlePaginationChange}
                    />
                )}
            </div>

            {data && (
                <CardItems
                    data={data.results}
                    isFetching={isLoading}
                />
            )}
        </div>
    )
}

export default TopRated