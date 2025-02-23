import React, {ChangeEvent, useEffect, useState} from 'react'

import {
    Input,
    Modal,
    Button,
    Typography,
} from 'antd'
import TextArea from 'antd/es/input/TextArea'

import uuid4 from "uuid4";

import {ICollectionMovies} from '@/pages/movie-collection/types'

import styles from './ModelAddCollection.module.scss'

enum Text {
    TITLE = 'Добавить коллекцию',
    COLLECTION_NAME = 'Название коллекции',
    COLLECTION_DESCRIPTION = 'Описание коллекции',
    RATING = 'Рейтинг',
}

interface Props {
    isModalOpen: 'create' | 'edit' | null,
    collection?: ICollectionMovies | null,
    onModalSave: (val: ICollectionMovies) => void,
    onModalEdit: (val: ICollectionMovies) => void,
    onModalCancel: () => void,
}

export const ModelAddCollection = ({
    isModalOpen,
    collection,
    onModalSave,
    onModalEdit,
    onModalCancel,
}: Props) => {
    const isEdit = isModalOpen && isModalOpen === 'edit'

    const [inputCollectNameValue, setInputCollectNameValue] = useState<string>('')
    const [textareaMovieList, setTextareaMovieList] = useState<string>('')
    const [inputCollectDescValue, setInputCollectDescValue] = useState<string>('')
    const [inputCollectRatingValue, setInputCollectRatingValue] = useState<number>(0)

    useEffect(() => {
        if (isEdit && collection) {
            const movieNames = collection.movieList.map(item => item.name)

            setInputCollectNameValue(collection.name)
            setTextareaMovieList(movieNames.join(','))
            setInputCollectDescValue(collection.description)
            setInputCollectRatingValue(collection.rating)
        } else {
            setInputCollectNameValue('')
            setTextareaMovieList('')
            setInputCollectDescValue('')
            setInputCollectRatingValue(0)
        }
    }, [collection, isEdit])

    const handleCreateClick = () => {
        const movieList = textareaMovieList.split(',')
        .map(mov => {
            return {
                id: Math.floor(100000 + Math.random() * 900000),
                name: mov.trim(),
                movie: null,
            }
        })
        .filter(movie => movie.name.length > 0)

        const collectionName = {
            id: uuid4(),
            name: inputCollectNameValue,
            description: inputCollectDescValue,
            rating: inputCollectRatingValue,
            movieList: movieList,
        }
        onModalSave(collectionName)
        onModalCancel()
    }

    const handleEditClick = () => {
        if (collection) {
            const collectionName = {
                ...collection,
                name: inputCollectNameValue,
                description: inputCollectDescValue,
                rating: inputCollectRatingValue,
            }
            onModalEdit(collectionName)
            onModalCancel()
        }
    }

    const handleMovieNameChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value

        setTextareaMovieList(value)
    }

    return (
        <Modal
            width={'80%'}
            className={styles.modalContainer}
            title={
                <Typography.Title
                    level={3}
                    style={{margin: 0}}
                >
                    {Text.TITLE}
                </Typography.Title>
            }
            open={!!isModalOpen}
            onCancel={onModalCancel}
            footer={[]}
        >
            <div className={styles.form}>
                <Input
                    className={styles.elem}
                    placeholder={Text.COLLECTION_NAME}
                    value={inputCollectNameValue}
                    onChange={e => setInputCollectNameValue(e.target.value)}
                />

                {isModalOpen === 'create' && (
                    <TextArea
                        className={styles.elem}
                        placeholder={"Названия фильмов через запятую"}
                        value={textareaMovieList}
                        onChange={handleMovieNameChange}
                        rows={10}
                    />
                )}

                <TextArea
                    className={styles.elem}
                    placeholder={Text.COLLECTION_DESCRIPTION}
                    value={inputCollectDescValue}
                    onChange={e => setInputCollectDescValue(e.target.value)}
                />

                <Input
                    className={styles.elem}
                    placeholder={Text.RATING}
                    value={inputCollectRatingValue}
                    onChange={e => setInputCollectRatingValue(+e.target.value)}
                    type="number"
                    min={0}
                    max={10}
                />

                {isModalOpen === 'create' ? (
                    <Button type="primary" onClick={handleCreateClick}>Сохранить</Button>
                ) : (
                    <Button type="primary" onClick={handleEditClick}>Редактировать</Button>
                )}
            </div>
        </Modal>
    )
}
