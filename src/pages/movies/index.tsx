import {useState} from "react"
import {useSelector} from "react-redux"

import {Pagination} from "antd"


import {CardItems} from "@/components/CardItems"
import {useFetchProfileMovies} from "@/hooks/useFetchProfileMovies"
import {getFilteredMovies, getSelectSearchMovie} from "@/redux/selectors"

import styles from './Movies.module.scss'

const Profile = () => {
    const [pageNum, setPageNum] = useState(1)
    const [sizePage, setSizePage] = useState(50)
    const {data, isFetching} = useFetchProfileMovies(pageNum, sizePage)
    const filteredMovies = useSelector(getFilteredMovies)
    const searchMovie = useSelector(getSelectSearchMovie)
    const movie = searchMovie
        ? data?.moviesPerPage.filter(movie => {
            const movieEn = movie.title_en?.toLowerCase()
                .includes(searchMovie.toLowerCase())
            const movieRu = movie.title_ru?.toLowerCase()
                .includes(searchMovie.toLowerCase())
            return movieEn || movieRu
        })
        : filteredMovies

    const handlePaginationChange = (value: any) => {
        setPageNum(value)
    }

    const onShowSizeChange = (current: number, size: number)=> {
        setSizePage(size)
    }

    return (
        <div className={styles.profileWrapper}>
            {data?.total && (
                <Pagination
                    className={styles.pagination}
                    onShowSizeChange={onShowSizeChange}
                    defaultCurrent={pageNum}
                    total={data?.total}
                    onChange={handlePaginationChange}
                    showSizeChanger
                />
            )}
            {movie
                ? (
                    <CardItems
                        data={movie}
                        isFetching={isFetching}
                        isProfileCard
                    />
                )
                : (
                    <h2>The movies is not found</h2>
                )}
        </div>
    )
}

export default Profile
