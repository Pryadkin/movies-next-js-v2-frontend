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
import {addSettingsToMovie} from '@/helpers/addSettingsToMovie'

import styles from './ModelAddMovie.module.scss'

import getFullPathForPosters from '@/helpers/getFullPathForPosters'
import {useAddLangToMovie} from '@/hooks/useAddLangToMovie'
import {useSaveProfileMovie} from '@/hooks/useSaveProfileMovie'
import {useUpdateProfileMovie} from '@/hooks/useUpdateProfileMovie'
import {getSelectLanguage} from '@/redux/selectors/layoutSelectors'


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
    const {pathname} = useRouter()
    const isProfilePath = pathname.includes('profile')
    const lang = useSelector(getSelectLanguage)
    const {mutationSave: mutationSaveMovie} = useSaveProfileMovie()
    const {mutationUpdate} = useUpdateProfileMovie()
    const movieWithSettings: any = isIMovie(movie) && addSettingsToMovie(movie)
    const movieWithLang = isIMovie(movie) ? addLangToMovie(movieWithSettings, lang) : movie
    const anotherLang = lang === Text.EN ? Text.RU : Text.EN
    const correctLang = isProfilePath ? lang : anotherLang
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

    const handleUploadAnotherLangMovieBtnClick = () => {
        mutationAddLang.mutate({
            movieName: movieWithLang.original_title,
            lang: correctLang
        })
    }

    const handleAddAnotherLangMovieClick = (movie: IMovie) => () => {
        const updateMovie = addContantToMovieLang(movie, movieWithLang, correctLang)
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
                        <div className={styles.titleList}>
                            <p>{movie.title}</p>
                            <p>{`Original: ${movie.original_title}`}</p>
                        </div>
                    </li>
                )
            })
        }
    }

    const handleAddMovieBtnClick = () => {
        const request = (mov: IMovieLang) => {
            isProfilePath
                ? mutationUpdate.mutate(mov)
                : mutationSaveMovie.mutate(mov)
        }
        if (newMovie) {
            newMovie && request(newMovie)
        } else {
            request(movieWithLang)
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
                {movieWithLang.title_en || movieWithLang.title_ru}

                <Button onClick={handleUploadAnotherLangMovieBtnClick}>
                    добавить фильм на {correctLang}
                </Button>

                <ol>
                    {getAnotherLangMovie()}
                </ol>

                {!isProfilePath && (
                    <SetMovieDate
                        movie={newMovie}
                        onUpdateMovieDateViewing={handleUpdateMovieDateViewing}
                        onAddMovieDateViewing={handleAddMovieDateViewing}
                    />
                )}

                <Button onClick={handleAddMovieBtnClick}>
                    Add MOVIE
                </Button>
            </Space>
        </Modal>
    )
}
