import React, {useEffect, useState} from 'react'

import {
    Modal,
    Button,
    Typography,
    Input,
} from 'antd'

import styles from './ModelAddMovieToCollection.module.scss'
import { ICorrectMovieWithLang, ICorrectMovieWithoutLang } from '@/api/apiTypes/requestMovies';
import { CardCollection } from '../CardCollection';
import { useFetchMulti } from '@/hooks/useFetchMulti';
import { useSelector } from 'react-redux';
import { getSelectLanguage } from '@/redux/selectors/layoutSelectors';

interface Props {
    isModalOpen: boolean
    movies: (ICorrectMovieWithLang | ICorrectMovieWithoutLang)[]
    movieName: string
    onMovieCheck: (movie: ICorrectMovieWithLang | ICorrectMovieWithoutLang) => void
    onModalCancel: () => void,
}

export const ModelAddMovieToCollection = ({
    isModalOpen,
    movies,
    movieName,
    onMovieCheck,
    onModalCancel,
}: Props) => {
    const lang = useSelector(getSelectLanguage)
    const {mutationMovieFetch} = useFetchMulti(lang)
    const searchData = mutationMovieFetch.data
    const [isSearchMovie, setIsSearchMovie] = useState<boolean>(false)
    const [inputSearchNameValue, setInputSearchNameValue] = useState<string>('')

    useEffect(() => {
        setInputSearchNameValue(movieName)
    }, [movieName])

    const handleSearchMovies = () => {
        mutationMovieFetch.mutate({
            searchName: inputSearchNameValue,
            movieType: 'multi',
            page: "1"
        })
    }

    const getMovieList = (movies: (ICorrectMovieWithLang | ICorrectMovieWithoutLang)[]) => {
        return movies
            ? (
                <div className={styles.wrapper}>
                    {movies.map(movie => {
                        return (
                            <CardCollection
                                key={movie.id}
                                movie={movie}
                                width={200}
                                height={300}
                                onCardClick={() => onMovieCheck(movie)}
                            />
                        )
                    })}
                </div>
            )
            : (
                <h2>The movies is not found</h2>
            )
    }

    const getSearchMovie = () => {
        return (
            <div className={styles.wrapper}>
                <Input
                    className={styles.input}
                    placeholder={'search'}
                    value={inputSearchNameValue}
                    onChange={e => setInputSearchNameValue(e.target.value)}
                />
                <Button
                    className={styles.modalSearchBtn}
                    onClick={handleSearchMovies}
                    type='primary'
                >
                    Поиск
                </Button>
                {searchData && getMovieList(searchData)}
            </div>
        )
    }

    return (
        <Modal
            width={'100%'}
            className={styles.modalContainer}
            title={
                <Typography.Title
                    level={3}
                    style={{margin: 0}}
                >
                    {movieName}
                </Typography.Title>
            }
            open={isModalOpen}
            onCancel={() => {
                onModalCancel()
                setIsSearchMovie(false)
            }}
            footer={[]}
        >
            <Button
                className={styles.modalSearchSwitchBtn}
                onClick={() => setIsSearchMovie(!isSearchMovie)}
            >
                Поиск на IMDb
            </Button>

            {isSearchMovie ? getSearchMovie() : getMovieList(movies)}
        </Modal>
    )
}
