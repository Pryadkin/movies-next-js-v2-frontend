/* eslint-disable max-len */

import {useSelector} from 'react-redux'

import {useQuery} from '@tanstack/react-query'

import {API} from '@/api'
import {IMovie} from '@/api/apiTypes'
import {getPictureUrl} from '@/helpers/getPictureUrl'
import {getSelectMovieName, getSelectPage} from '@/redux/selectors/searchSelectors'

import styles from './CardItems.module.scss'


import {CardItem} from '../CardItem'

interface Props {
    movies: IMovie[]
    isProfileCard?: boolean,
}

export const CardItems: React.FC<Props> = ({
    isProfileCard
}) => {

    const page = useSelector(getSelectPage)
    const movieName = useSelector(getSelectMovieName)

    const fetchMovies = async (value: string, page: string) => {
        const res = value ? await API.requestMovies(value, page) : null
        const updateRes = getPictureUrl(res?.data.results, true)

        return updateRes
    }

    const {
        isLoading,
        isError,
        data,
    } = useQuery({
        queryKey: ['projects', movieName, page],
        queryFn: () => fetchMovies(movieName, page),
        keepPreviousData : true
    })

    if (isLoading) return <div>Loading...</div>

    if (isError) return <div>{'error'}</div>

    return (
        <div className={styles.wrapper}>
            {data.length
                ? (
                    data.map(movie => {
                        const width = 240
                        const height = 450
                        return (
                            <CardItem
                                key={movie.id}
                                movie={movie}
                                width={width}
                                height={height}
                                isProfileCard={isProfileCard}
                            />
                        )}
                    )
                )
                : (
                    null
                )
            }
        </div>
    )
}
