import {useEffect, useState} from "react"
import {useSelector} from "react-redux"

import {Button, Popconfirm, Select, Typography} from "antd"

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

import {ICollectionMovies} from "./types"
import { ModelAddCollection } from "@/components/ModelAddCollection"
import { useEditMoviesCollection } from "@/hooks/useEditMoviesCollection"
import { useDeleteMoviesCollection } from "@/hooks/useDeleteMoviesCollection"
import { ModelAddMovieToCollection } from "@/components/ModelAddMovieToCollection"

const { Text } = Typography

const MovieCollection = () => {
    const [collectionName, setCollectionName] = useState('');
    const {collection} = useFetchCollectionByName(collectionName)
    const {deleteCollection} = useDeleteMoviesCollection(collectionName)
    const {collectionsName} = useFetchCollectionsName()
    const [collectionNameSelect, setCollectionNameSelect] = useState<{value: string, label: string}[]>([{
        value: collectionName,
        label: collectionName
    }])
    const [isModalAddMovieOpen, setIsModalAddMovieOpen] = useState(false)
    const [isCollectModalOpen, setIsCollectModalOpen] = useState<'create' | 'edit' | null>(null)
    const [isModalSetLanguage, setIsModalSetLanguage] = useState(false)
    const [movieWithouLang, setMovieWithouLang] = useState<ICorrectMovieWithoutLang>()
    const [modelMovies, setModelMovies] = useState<(ICorrectMovieWithLang | ICorrectMovieWithoutLang)[]>([])
    const {profileMovie, getMovieByName, isLoading} = useFetchProfileMovieByName()
    const {saveCollection, moviesSaveCollection, isSaveCollectionSuccess} = useSaveMoviesCollection()
    const {editCollection, moviesEditCollection} = useEditMoviesCollection(collectionName)
    const lang = useSelector(getSelectLanguage)
    const {mutationMovieFetch} = useFetchMulti(lang)
    const seatchData = mutationMovieFetch.data
    const [selectMovieName, setSelectMovieName] = useState('')
    const [movieCardId, setMovieCardId] = useState<number>()

    useEffect(() => {
        if (collectionsName) {
            const collectionSelect= collectionsName.map(collect => ({ value: collect, label: collect }))
            setCollectionNameSelect(collectionSelect)
        } else {
            setCollectionNameSelect([])
        }
    }, [collectionsName])

    useEffect(() => {
        if (moviesSaveCollection) setCollectionName(moviesSaveCollection.name)
    }, [isSaveCollectionSuccess, moviesSaveCollection])

    useEffect(() => {
        if (moviesEditCollection) setCollectionName(moviesEditCollection.name)
    }, [moviesEditCollection])

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

    const handleCardClick = (movie: ICorrectMovieWithLang | ICorrectMovieWithoutLang) => {
        const movieWithLang = (movie as ICorrectMovieWithLang).title_en && movie as ICorrectMovieWithLang

        if (movieWithLang) {
            if (!collection) return
            const movieList = collection.movieList.map(item => {
                if (item.id === movieCardId) {
                    return {
                        ...item,
                        movie: movieWithLang
                    }
                }

                return item
            })

            const updateCollection = {
                ...collection,
                movieList
            }
            updateCollection && editCollection(updateCollection)
            setIsModalAddMovieOpen(false)
        } else {
            setMovieWithouLang(movie as ICorrectMovieWithoutLang)
            setIsModalSetLanguage(true)
        }
    }

    const handleCollectionSave = (val: ICollectionMovies) => {
        const collectionMovies: ICollectionMovies = {
            id: val.id,
            name: val.name,
            description: val.description,
            rating: val.rating,
            movieList: val.movieList,
        }

        saveCollection(collectionMovies)
    }

    const handleModalFormEdit = (val: ICollectionMovies) => {
        const updateCollect: ICollectionMovies = {
            id: val.id,
            name: val.name,
            description: val.description,
            rating: val.rating,
            movieList: val.movieList,
        }

        editCollection(updateCollect)
    }

    const handleGetMovieWithLang = (movie: ICorrectMovieWithLang) => {
        handleCardClick(movie)
        setIsModalAddMovieOpen(false)
    }

    const handlerCollectNameClick = (collectionName: string) => {
        setCollectionName(collectionName)
    }

    const handleAddMovieToCardClick = (name: string, id: number) => {
        getMovieByName(name)
        setSelectMovieName(name)
        setIsModalAddMovieOpen(true)
        setMovieCardId(id)
    }

    const handleDeleteMovieFromCard = (cardId: number) => () => {
        if (!collection) return

        const updateCollection = {
            ...collection,
            movieList: collection.movieList.map(item => item.id === cardId ? { ...item, movie: null } : item)
        }

        editCollection(updateCollection)
    }

    const handleDeleteCard = (cardId: number) => () => {
        if (!collection) return

        const updateCollection = {
            ...collection,
            movieList: collection.movieList.filter(item => item.id !== cardId)
        }

        editCollection(updateCollection)
    }

    const handleRenameCardClick = (id: number) => (name: string) => {
        if (!collection) return

        const updateCollection = {
            ...collection,
            movieList: collection.movieList.map(item => item.id === id ? { ...item, name } : item)
        }

        editCollection(updateCollection)
    }

    const handleAddCardClick = () => {
        if (!collection) return

        const updateCollection = {
            ...collection,
            movieList: [
                {
                    name: `new card ${Math.floor(1000 + Math.random() * 9000)}`,
                    id: Math.floor(100000 + Math.random() * 900000),
                    movie: null
                },
                ...collection.movieList
            ]
        }

        editCollection(updateCollection)
    }

    const handleDeleteCollection = () => {
        collection && deleteCollection(collection.id)
        setCollectionName('')
    }

    return (
        <div>
            <div className={styles.collectionButtonWrapper}>
                <Button onClick={() => setIsCollectModalOpen('create')}>Добавить коллекцию</Button>
                <Button onClick={() => setIsCollectModalOpen('edit')}>Редактировать коллекцию</Button>
                <Popconfirm
                        title="Delete the collection"
                        description="Are you sure to delete this collection?"
                        onConfirm={handleDeleteCollection}
                        onCancel={() => {}}
                        okText="Yes"
                        cancelText="No"
                    >
                    <Button>Удалить коллекцию</Button>
                </Popconfirm>
            </div>

            <div className={styles.collectionWrapper}>
                <Select
                    style={{ width: 350 }}
                    value={collectionName}
                    onChange={handlerCollectNameClick}
                    options={collectionNameSelect}
                />

                <Button onClick={handleAddCardClick}>Добавить карточку</Button>
                {collection?.movieList?.length && (
                    <Text className={styles.movieCount} keyboard>{`${collection.movieList.length} шт`}</Text>
                )}
            </div>

            {collection
                ? (
                    <div className={styles.wrapper}>
                        {collection.movieList.map((item) => {
                            if (!item.movie) return (
                                <CardCollection
                                    key={item.id}
                                    movieName={item.name}
                                    movie={item.movie}
                                    width={200}
                                    height={300}
                                    onAddMovieToCard={() => handleAddMovieToCardClick(item.name, item.id)}
                                    onRenameCard={handleRenameCardClick(item.id)}
                                    onDeleteCard={handleDeleteCard(item.id)}
                                />
                            )
                            return (
                                <CardCollection
                                    key={item.id}
                                    movie={item.movie}
                                    width={200}
                                    height={300}
                                    onDeleteMovieFromCard={handleDeleteMovieFromCard(item.id)}
                                />
                            )
                        })}
                    </div>
                )
                : (
                    <h2>The movies is not found</h2>
                )}

            <ModelAddCollection
                collection={collection}
                isModalOpen={isCollectModalOpen}
                onModalSave={handleCollectionSave}
                onModalEdit={handleModalFormEdit}
                onModalCancel={() => setIsCollectModalOpen(null)}
            />

            <ModelAddMovieToCollection
                isModalOpen={isModalAddMovieOpen}
                movies={modelMovies}
                movieName={selectMovieName}
                onModalCancel={() => setIsModalAddMovieOpen(false)}
                onMovieCheck={handleCardClick}
            />

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