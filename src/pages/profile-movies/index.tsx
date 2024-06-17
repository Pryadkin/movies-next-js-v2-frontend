import {useState} from "react"
import {useSelector} from "react-redux"

import {Pagination} from "antd"


import {CardItems} from "@/components/CardItems"
import {useFetchProfileMovies} from "@/hooks/useFetchProfileMovies"
import {getSelectSearchMovie} from "@/redux/selectors"

import styles from './Profile.module.scss'

const ProfileMovies = () => {
    const [pageNum, setPageNum] = useState(1)
    const [sizePage, setSizePage] = useState(50)
    const searchMovieName = useSelector(getSelectSearchMovie)
    const {data, isFetching} = useFetchProfileMovies(pageNum, sizePage, searchMovieName)

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
                    defaultCurrent={pageNum}
                    defaultPageSize={50}
                    showTotal={totalMovies => `${totalMovies} movies`}
                    total={data?.total}
                    onChange={handlePaginationChange}
                    onShowSizeChange={onShowSizeChange}
                    showSizeChanger
                />
            )}
            {data?.moviesPerPage
                ? (
                    <CardItems
                        data={data?.moviesPerPage}
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

export default ProfileMovies
