import {useSelector} from 'react-redux'

import {
    Button,
    Modal,
    Space,
    Typography,
} from 'antd'

import {ICorrectMovieWithLang, ICorrectMovieWithoutLang} from '@/api/apiTypes/requestMovies'
import {getCorrectMovieWithLang} from '@/helpers/getCorrectMovieWithLang'
import {useFetchMulti} from '@/hooks/useFetchMulti'
import {useSaveProfileMovie} from '@/hooks/useSaveProfileMovie'

import styles from './ModelAddMovie.module.scss'

import {deleteMovieDateViewing, setSelectMovie, updateMovieDateViewing} from '@/redux/reducers'
import {addMovieDateViewing} from '@/redux/reducers/layoutReducer/layoutSlice'
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
    movie: ICorrectMovieWithoutLang | ICorrectMovieWithLang,
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
    const data = mutationMovieFetch.data
    const isLoading = mutationMovieFetch.isLoading

    const isAddMovieBtnEnable = !('title' in movie)

    const handleUploadAnotherLangMovieBtnClick = () => {
        mutationMovieFetch.mutate({
            searchName: movie.original_title,
            movieType,
            page: '1'
        })
    }

    const handleAddAnotherLangMovieClick = (mov: ICorrectMovieWithoutLang) => () => {
        const correctMovieWithLang = getCorrectMovieWithLang(mov, 'ru-RU')

        dispatch(setSelectMovie(correctMovieWithLang))
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

    const handleAddMovieBtnClick = (mov: ICorrectMovieWithoutLang | ICorrectMovieWithLang) => () => {
        mutationSave.mutate(mov)
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
                {(movie as ICorrectMovieWithoutLang).title}
                {movie.release_date}

                <Button onClick={handleUploadAnotherLangMovieBtnClick}>
                    добавить фильм на {anotherLang}
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

                {movie && (
                    <SetMovieDate
                        movie={movie}
                        onUpdateMovieDateViewing={val => dispatch(updateMovieDateViewing(val))}
                        onAddMovieDateViewing={val => dispatch(addMovieDateViewing(val))}
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
                    onClick={handleAddMovieBtnClick(movie)}
                    disabled={!isAddMovieBtnEnable}
                >
                    Add MOVIE
                </Button>
            </Space>
        </Modal>
    )
}
