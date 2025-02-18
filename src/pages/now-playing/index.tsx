import {useEffect, useState} from "react"
import {useSelector} from "react-redux"

import styles from './NowPlaying.module.scss'

import {Pagination, Radio} from "antd"

import {RequestUrl} from "@/api/requestUrlList"
import {CardItems} from "@/components/CardItems"
import {Spin} from "@/components/Spin"
import {useFetchCollection} from "@/hooks/useFetchCollection"
import {setPage} from "@/redux/reducers"
import {getSelectPage} from "@/redux/selectors"
import {getSelectLanguage} from "@/redux/selectors/layoutSelectors"
import {useAppDispatch} from "@/redux/store"
import {TMovieType} from "@/types"

const NowPlaying = () => {
    const dispatch = useAppDispatch()
    const lang = useSelector(getSelectLanguage)
    const page = useSelector(getSelectPage)
    const {mutationMovieFetch} = useFetchCollection(lang)
    const data = mutationMovieFetch.data
    const totalPages = data?.total_pages
    const isLoading = mutationMovieFetch.isLoading

    const [typeMovie, setTypeMovie] = useState<TMovieType>('movie')

    const handlePaginationChange = (value: number) => {
        dispatch(setPage(value))

        mutationMovieFetch.mutate({
            page: `${value}`,
            typeMovie,
            requestUrl: RequestUrl.GET_NOW_PLAYING
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
                    requestUrl: RequestUrl.GET_NOW_PLAYING
                })
                break
            }
            case "b": {
                dispatch(setPage(1))
                setTypeMovie('tv')
                mutationMovieFetch.mutate({
                    page: '1',
                    typeMovie: 'tv',
                    requestUrl: RequestUrl.GET_NOW_PLAYING
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
            requestUrl: RequestUrl.GET_NOW_PLAYING
        })
    }, [])

    return (
        <div className={styles.wrapper}>
            <p className={styles.title}>Get a list of movies that are currently in theatres</p>
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

            {data
                ? (
                    <CardItems
                        data={data.results}
                        isFetching={isLoading}
                    />
                )
                : (
                    <Spin />
                )}
        </div>
    )
}

export default NowPlaying