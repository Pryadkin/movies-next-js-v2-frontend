import {useEffect, useState} from "react"
import {useSelector} from "react-redux"

import {Button, Modal, Select, Typography} from "antd"

import {ICorrectMovieWithLang, ICorrectMovieWithoutLang} from "@/api/apiTypes/requestMovies"
import {CardCollection} from "@/components/CardCollection"
import {ModelAddMovie} from "@/components/ModelAddMovie"

import styles from './MovieCollection.module.scss'

import {useFetchCollectionByName} from "@/hooks/useFetchCollectionByName"
import {useFetchCollectionsName} from "@/hooks/useFetchCollectionsName"
import {useFetchMulti} from "@/hooks/useFetchMulti"
import {useFetchProfileMovieByName} from "@/hooks/useFetchProfileMovieByName"
import {useSaveMoviesCollection} from "@/hooks/useSaveMoviesCollection"
import {getSelectLanguage} from "@/redux/selectors/layoutSelectors"

import {ICollectionForm, ICollectionMovies} from "./types"
import { ModelAddCollection } from "@/components/ModelAddCollection"
import { useSaveMovieToCollection } from "@/hooks/useSaveMovieToCollection"

const MovieCollection = () => {
    const [collectionName, setCollectionName] = useState('');
    const {collection} = useFetchCollectionByName(collectionName)
    const {collectionsName} = useFetchCollectionsName()
    const [collectionNameSelect, setCollectionNameSelect] = useState<{value: string, label: string}[]>([{
        value: collectionName,
        label: collectionName
    }])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isCollectModalOpen, setIsCollectModalOpen] = useState(false)
    const [isModalSetLanguage, setIsModalSetLanguage] = useState(false)
    const [movieWithouLang, setMovieWithouLang] = useState<ICorrectMovieWithoutLang>()
    const [modelMovies, setModelMovies] = useState<ICorrectMovieWithLang[]>([])
    const {profileMovie, getMovieByName, isLoading} = useFetchProfileMovieByName()
    const {saveCollection} = useSaveMoviesCollection()
    const lang = useSelector(getSelectLanguage)
    const {mutationMovieFetch} = useFetchMulti(lang)
    const {saveMovieToCollection} = useSaveMovieToCollection(collectionName)
    const seatchData = mutationMovieFetch.data
    const [selectMovieName, setSelectMovieName] = useState('')

    useEffect(() => {
        console.log('collectionsName', collectionsName)
        if (collectionsName) {
            const collectionSelect= collectionsName.map(collect => ({ value: collect, label: collect }))
            setCollectionNameSelect(collectionSelect)
        }
    }, [collectionsName])

    useEffect(() => {
        const isEmptyArr = Array.isArray(profileMovie) && profileMovie.length === 0

        if (profileMovie && !isEmptyArr) setModelMovies(profileMovie)
        if (isEmptyArr) {
            if (profileMovie?.length === 0 && !isLoading) mutationMovieFetch.mutate({
                searchName: selectMovieName,
                movieType: 'multi',
                page: "1"
            })
        }
    }, [isLoading, profileMovie, selectMovieName])

    useEffect(() => {
        seatchData && setModelMovies(seatchData)
    }, [seatchData])

    const handleCardDelete = (movieId: number) => {
        // const filteredMovie = collectMovies.filter(mov => mov.id !== movieId)
        // setCollectMovies(filteredMovie)
    }

    const handleCardClick = (movie: ICorrectMovieWithLang | ICorrectMovieWithoutLang) => {
        if ((movie as ICorrectMovieWithLang).title_en) {
            collection && saveMovieToCollection(movie as ICorrectMovieWithLang)
            setIsModalOpen(false)
        } else {
            setMovieWithouLang(movie as ICorrectMovieWithoutLang)
            setIsModalSetLanguage(true)
        }
    }

    const handleModalFormSave = (val: ICollectionForm) => {
        const collectMovieIds: ICollectionMovies = {
            name: val.name,
            description: val.description,
            rating: val.rating,
            movieList: val.movieList,
            movies: []
        }

        saveCollection(collectMovieIds)
    }

    const handleGetMovieWithLang = (movie: ICorrectMovieWithLang) => {
        collection && saveMovieToCollection(movie as ICorrectMovieWithLang)
        setIsModalOpen(false)
    }

    const handlerCollectNameClick = (collectionName: string) => {
        setCollectionName(collectionName)
    }

    const handleAddCardClick = (name: string) => {
        console.log('name', name)
        getMovieByName(name)
        setSelectMovieName(name)
        setIsModalOpen(true)
    }

    return (
        <div>
            <div>
                <Button onClick={() => setIsCollectModalOpen(true)}>Сохранить коллекцию</Button>
            </div>

            <div className={styles.collectionWrapper}>
                <Select
                    style={{ width: 120 }}
                    value={collectionName}
                    onChange={handlerCollectNameClick}
                    options={collectionNameSelect}
                />
            </div>

            {collection
                ? (
                    <div className={styles.wrapper}>
                        {collection.movies.map((movie, index) => {
                            const movieName = collection.movieList[index]

                            if (!movie) return (
                                <CardCollection
                                    key={index}
                                    movieName={movieName}
                                    movie={movie}
                                    width={200}
                                    height={300}
                                    onAddCardClick={() => handleAddCardClick(movieName)}
                                    onCardDelete={handleCardDelete}
                                />
                            )
                            return (
                                <CardCollection
                                    key={index}
                                    movie={movie}
                                    width={200}
                                    height={300}
                                    onCardDelete={handleCardDelete}
                                />
                            )
                        })}
                    </div>
                )
                : (
                    <h2>The movies is not found</h2>
                )}

            <ModelAddCollection
                isModalOpen={isCollectModalOpen}
                onModalSave={handleModalFormSave}
                onModalCancel={() => setIsCollectModalOpen(false)}
            />

            <Modal
                width={'100%'}
                className={styles.modalContainer}
                title={
                    <Typography.Title
                        level={3}
                        style={{margin: 0}}
                    >
                        {"Выберите нужный фильм"}
                    </Typography.Title>
                }
                open={isModalOpen}
                onCancel={() => {setIsModalOpen(false)}}
                footer={[]}
            >
                <div>
                    {}
                </div>
                <div>{}</div>
                {modelMovies
                    ? (
                        <div className={styles.wrapper}>
                            {modelMovies.map(movie => {
                                return (
                                    <CardCollection
                                        key={movie.id}
                                        movie={movie}
                                        width={200}
                                        height={300}
                                        onCardClick={handleCardClick}
                                    />
                                )
                            })}
                        </div>
                    )
                    : (
                        <h2>The movies is not found</h2>
                    )}
            </Modal>

            {movieWithouLang && (
                <ModelAddMovie
                    movie={movieWithouLang}
                    isModalOpen={isModalSetLanguage}
                    getMovieWithLang={handleGetMovieWithLang}
                    onModalCancel={() => setIsModalSetLanguage(false)}
                />
            )}
        </div>
    )
}

export default MovieCollection