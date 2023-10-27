import {useState} from 'react'
import {useSelector} from 'react-redux'

import {
    Button,
    Modal,
    Space,
    Typography,
} from 'antd'
import {useRouter} from 'next/router'

import {IMovie, IMovieLang} from '@/api/apiTypes'
import {isIMovie} from '@/helpers'
import {addContantToMovieLang, addLangToMovie} from '@/helpers/addLangToMovie'

import styles from './ModelAddMovie.module.scss'

import {useAddLangToMovie} from '@/hooks/useAddLangToMovie'
import {useAddLangToTv} from '@/hooks/useAddLangToTv'
import {useSaveProfileMovie} from '@/hooks/useSaveProfileMovie'
import {useUpdateProfileMovie} from '@/hooks/useUpdateProfileMovie'
import {setCurrentMovie} from '@/redux/reducers'
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
    movie: IMovie | IMovieLang
    isModalOpen: boolean,
    onModalCancel: () => void,
}

export const ModelAddMovie = ({
    movie,
    isModalOpen,
    onModalCancel,
}: Props) => {
    const dispatch = useAppDispatch()
    const {pathname} = useRouter()
    const selectTegs = useSelector(getSelectTags)
    const isProfilePath = pathname.includes('profile')
    const lang = useSelector(getSelectLanguage)
    const movieType = useSelector(getSelectMovieType)
    const {mutationSave: mutationSaveMovie} = useSaveProfileMovie()
    const {mutationUpdate} = useUpdateProfileMovie()
    const movieWithLang = isIMovie(movie) ? addLangToMovie(movie, lang) : movie
    const anotherLang = lang === Text.EN ? Text.RU : Text.EN
    const correctLang = isProfilePath ? lang : anotherLang
    const {mutationAddLang} = useAddLangToMovie()
    const {mutationAddLangTv} = useAddLangToTv()

    const isLoading = mutationAddLang.isLoading || mutationAddLangTv.isLoading
    const data = mutationAddLang.data as IMovie[]
    || mutationAddLangTv.data as IMovie[]

    const handleUpdateMovieDateViewing = (val: string[]) => {
        // TODO: add updating date by save movie
        // const updateMovie: IMovie = {
        //     ...movieWithLang,
        //     settings: {
        //         ...movieWithLang.settings,
        //         dateViewing: val
        //     }
        // }
    }

    const handleAddMovieDateViewing = (val: string) => {
        const updateMovie: any = {
            ...movieWithLang,
            settings: {
                ...movieWithLang.settings,
                dateViewing: [
                    ...movieWithLang.settings?.dateViewing,
                    val
                ]
            }
        }
        dispatch(setCurrentMovie(updateMovie))
    }

    const handleUploadAnotherLangMovieBtnClick = () => {
        if (movieType === 'movie') {
            mutationAddLang.mutate({
                movieName: movieWithLang.original_title,
                lang: correctLang
            })
        }
        if (movieType === 'tv')  {
            mutationAddLangTv.mutate({
                movieName: movieWithLang.original_title,
                lang: correctLang
            })
        }
    }

    const handleAddAnotherLangMovieClick = (movie: IMovie) => () => {
        const updateMovie = addContantToMovieLang(movie, movieWithLang, correctLang)

        dispatch(setCurrentMovie(updateMovie as any))
    }

    const getAnotherLangMovie = () => {
        if (isLoading) return <div>...Loading</div>
        if (data) {
            return data.map(movie => {
                return (
                    <li
                        key={movie.id}
                        className={styles.movieTitle}
                        onClick={handleAddAnotherLangMovieClick(movie)}
                    >
                        <div className={styles.titleList}>
                            <p>{movie.title}</p>
                            <p>{`Original: ${movie.original_title}`}</p>
                            <p style={{
                                background: 'lightgray',
                                borderRadius: 5,
                                textAlign: 'center'
                            }}>{movie.release_date}</p>
                        </div>
                    </li>
                )
            })
        }
    }

    const handleAddMovieBtnClick = (m: any) => () => {
        const request = (mov: IMovieLang) => {
            isProfilePath
                ? mutationUpdate.mutate(mov)
                : mutationSaveMovie.mutate(mov)
        }

        if (m) {
            request(m)
        } else {
            request(movieWithLang)
        }

        onModalCancel()
    }

    const isAddMovieBtnEnable = movie.title_ru && movie.title_en

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
                {movieWithLang.title_en || movieWithLang.title_ru}
                {movieWithLang.release_date}

                <Button onClick={handleUploadAnotherLangMovieBtnClick}>
                    добавить фильм на {correctLang}
                </Button>

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
                    {getAnotherLangMovie()}
                </ol>

                {!isProfilePath && movieWithLang && (
                    <SetMovieDate
                        movie={movieWithLang}
                        onUpdateMovieDateViewing={handleUpdateMovieDateViewing}
                        onAddMovieDateViewing={handleAddMovieDateViewing}
                    />
                )}

                <div className={styles.tagsWrapper}>
                    <AddTags
                        movie={movie}
                        tags={selectTegs}
                    />
                </div>

                <Button
                    onClick={handleAddMovieBtnClick(movie)}
                    disabled={!isAddMovieBtnEnable}
                >
                    Add MOVIE
                </Button>
            </Space>
        </Modal>
    )
}
