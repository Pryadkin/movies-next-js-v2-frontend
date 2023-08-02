import {useState} from 'react'
import {useSelector} from 'react-redux'

import {
    Button,
    Modal,
    Space,
    Typography,
} from 'antd'

import {IMovie, IMovieLang} from '@/api/apiTypes'
import {addContantToMovieLang, addLangToMovie} from '@/helpers/addLangToMovie'
import {addSettingsToMovie} from '@/helpers/addSettingsToMovie'
import getFullPathForPosters from '@/helpers/getFullPathForPosters'

import styles from './ModelAddMovie.module.scss'

import {useAddLangToMovie} from '@/hooks/useAddLangToMovie'
import {useSaveProfileMovie} from '@/hooks/useSaveProfileMovie'
import {getSelectLanguage} from '@/redux/selectors/layoutSelectors'


import {SetMovieDate} from '../SetMovieDate'

enum Text {
    TITLE = 'ADD MOVIE',
    SELECT_LANG_NAME = 'Select the lang name',
    RU = 'ru-RU',
    EN = 'en-EN',
}

interface Props {
    movie: IMovie
    isModalOpen: boolean,
    onModalCancel: () => void,
}

export const ModelAddMovie = ({
    movie,
    isModalOpen,
    onModalCancel,
}: Props) => {
    const movieWithSettings = addSettingsToMovie(movie)
    const {mutationSave: mutationSaveMovie} = useSaveProfileMovie()
    const lang = useSelector(getSelectLanguage)
    const movieWithLang = addLangToMovie(movieWithSettings, lang)
    const anotherLang = lang === Text.EN ? Text.RU : Text.EN
    const {mutationAddLang} = useAddLangToMovie()
    const [newMovie, setNewMovie] = useState<IMovieLang | null>()

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
                    ...movieWithLang.settings.dateViewing,
                    val
                ]
            }
        }

        setNewMovie(updateMovie)
    }

    const handleAddMovieBtnClick = () => {
        mutationAddLang.mutate({
            movieName: movieWithLang.original_title,
            lang: anotherLang
        })
    }

    const handleAddAnotherLangMovieClick = (movie: IMovie) => () => {
        const updateMovie = addContantToMovieLang(movie, movieWithLang, anotherLang)
        const updateRes = getFullPathForPosters(updateMovie) as IMovieLang

        console.info('updateMovie', updateRes)

        setNewMovie(updateRes)
    }

    const getAnotherLangMovie = () => {
        if (mutationAddLang.isLoading) return <div>...Loading</div>
        if (mutationAddLang.data) {
            const movies = mutationAddLang.data as IMovie[]
            return movies.map(movie => {
                return (
                    <li
                        key={movie.id}
                        className={styles.movieTitle}
                        onClick={handleAddAnotherLangMovieClick(movie)}
                    >
                        {movie.title}
                    </li>
                )
            })
        }
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
                {lang}

                <Button onClick={handleAddMovieBtnClick}>
                        добавить фильм на {anotherLang}
                </Button>

                <ol>
                    {getAnotherLangMovie()}
                </ol>

                <SetMovieDate
                    movie={newMovie}
                    onUpdateMovieDateViewing={handleUpdateMovieDateViewing}
                    onAddMovieDateViewing={handleAddMovieDateViewing}
                />
                <Button onClick={() => newMovie && mutationSaveMovie.mutate(newMovie)}>
                    Add MOVIE
                </Button>
            </Space>
        </Modal>
    )
}
