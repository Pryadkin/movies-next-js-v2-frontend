/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'

import {
    Button,
    Modal,
    Space,
    Typography,
} from 'antd'

import {ICorrectMovieWithLang, ICorrectMovieWithoutLang, TMovie} from '@/api/apiTypes/requestMovies'
import {isMovieWithoutLang} from '@/helpers'
import {getCorrectMovieWithLang} from '@/helpers/getCorrectMovieWithLang'
import {useFetchMulti} from '@/hooks/useFetchMulti'
import {useSaveProfileMovie} from '@/hooks/useSaveProfileMovie'

import styles from './ModelAddMovie.module.scss'

import {deleteMovieDateViewing, setSelectMovie, updateMovieDateViewing} from '@/redux/reducers'
import {IUpdateDate, addMovieDateViewing} from '@/redux/reducers/layoutReducer/layoutSlice'
import {getSelectTags} from '@/redux/selectors'
import {getSelectLanguage} from '@/redux/selectors/layoutSelectors'
import {getSelectMovieType} from '@/redux/selectors/searchSelectors'
import {useAppDispatch} from '@/redux/store'

import {AddTags} from '../AddTags'
import {SetMovieDate} from '../SetMovieDate'

enum Text {
    TITLE = 'ADD MOVIE',
    SELECT_LANG_NAME = 'Select the lang name',
    RU = 'ru-RU',
    EN = 'en-EN',
}

interface Props {
    movie: TMovie,
    isModalOpen: boolean,
    onModalCancel: () => void,
}

export const ModelAddMovie = ({
    movie,
    isModalOpen,
    onModalCancel,
}: Props) => {
    const dispatch = useAppDispatch()
    const selectTegs = useSelector(getSelectTags)
    const lang = useSelector(getSelectLanguage)
    const movieType = useSelector(getSelectMovieType)
    const anotherLang = lang === Text.EN ? Text.RU : Text.EN
    const {mutationSave} = useSaveProfileMovie()
    const {mutationMovieFetch} = useFetchMulti(anotherLang)
    const {data: anotherLangMovie} = mutationMovieFetch
    const isLoading = mutationMovieFetch.isLoading
    const [anotherLangMovieState, setAnotherLangMovieState] = useState<ICorrectMovieWithoutLang | null>(null)
    const movieTitle = (movie as ICorrectMovieWithoutLang).title || (movie as ICorrectMovieWithLang).title_ru

    const [correctMovieId, setCorrectMovieId] = useState<number | string>()
    const [isSelectAnotherLangMovie, setIsSelectAnotherLangMovie] = useState(false)

    useEffect(() => {
        if (isModalOpen && movie) {
            mutationMovieFetch.mutate({
                searchName: movie.original_title,
                movieType,
                page: '1'
            })
        }

        return () => {
            setAnotherLangMovieState(null)
            setIsSelectAnotherLangMovie(false)
        }

    }, [isModalOpen])

    const handleAddAnotherLangMovieClick = (
        currentMovie: ICorrectMovieWithoutLang,
        movWithAnotherLang: ICorrectMovieWithoutLang
    ): ICorrectMovieWithLang => {
        const correctMovieWithLang = getCorrectMovieWithLang(
            currentMovie,
            movWithAnotherLang,
            anotherLang
        )

        dispatch(setSelectMovie(correctMovieWithLang))

        return correctMovieWithLang
    }

    const getAnotherLangMovie = (
        anotherLangMovies: ICorrectMovieWithoutLang[] | undefined,
    ) => {
        if (isLoading) return <div>...Loading</div>
        if (anotherLangMovies) {{
            return anotherLangMovies.map(searchMovie => {
                const isCorrectMovie = isSelectAnotherLangMovie && correctMovieId === searchMovie.id
                return (
                    <li
                        key={searchMovie.id}
                        style={{
                            backgroundColor: isCorrectMovie ? 'aquamarine' : '',
                            borderRadius: '5px',
                        }}
                        className={styles.movieTitle}
                        onClick={() => {
                            setAnotherLangMovieState(searchMovie)
                            setCorrectMovieId(searchMovie.id)
                            setIsSelectAnotherLangMovie(true)
                        }}
                    >
                        <div className={styles.titleList}>
                            <p>{searchMovie.title}</p>
                            <p>{`Original: ${searchMovie.original_title}`}</p>
                            <p style={{
                                background: 'lightgray',
                                borderRadius: 5,
                                textAlign: 'center'
                            }}>{searchMovie.release_date}</p>
                        </div>
                    </li>
                )
            })
        }
        }
    }

    const handleAddMovieDate = (value: string) => {
        dispatch(addMovieDateViewing(value))
    }

    const handleUpdateMovieDate = (value: IUpdateDate) => {
        dispatch(updateMovieDateViewing(value))
    }

    const handleAddMovieBtnClick = () => {
        const movieWithLang = anotherLangMovieState
        && isMovieWithoutLang(movie)
        && handleAddAnotherLangMovieClick(movie, anotherLangMovieState)

        movieWithLang && mutationSave.mutate(movieWithLang)
        onModalCancel()
    }

    return (
        <Modal
            className={styles.modalContainer}
            title={
                <Typography.Title
                    level={3}
                    style={{margin: 0}}
                >
                    {Text.TITLE}
                </Typography.Title>
            }
            open={isModalOpen}
            onCancel={onModalCancel}
            footer={[]}
        >
            <Space
                direction="vertical"
            >
                {movieTitle}
                {movie.release_date}

                <p className={styles.p}>Выберите фильм на другом языке</p>

                <ol style={{
                    width: 500,
                    height: 300,
                    overflow: 'scroll',
                    border: '1px solid black',
                    borderRadius: 5,
                    padding: 10,
                    paddingLeft: 30,
                    paddingRight: 50,
                }}>
                    {getAnotherLangMovie(anotherLangMovie)}
                </ol>

                {movie && (
                    <SetMovieDate
                        movie={movie}
                        onUpdateMovieDateViewing={handleUpdateMovieDate}
                        onAddMovieDateViewing={handleAddMovieDate}
                        deleteSelectMovieDateViewing={val => dispatch(deleteMovieDateViewing(val))}
                    />
                )}

                <div className={styles.tagsWrapper}>
                    <AddTags
                        movie={movie}
                        tags={selectTegs}
                    />
                </div>

                <Button
                    onClick={handleAddMovieBtnClick}
                    disabled={!anotherLangMovieState?.id}
                >
                    Add MOVIE
                </Button>
            </Space>
        </Modal>
    )
}