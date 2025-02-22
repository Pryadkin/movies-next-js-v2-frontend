import React, {ChangeEvent, useState} from 'react'

import {
    Input,
    Modal,
    Button,
    Space,
    Typography,
} from 'antd'
import TextArea from 'antd/es/input/TextArea'

import {ICollectionForm} from '@/pages/movie-collection/types'

import styles from './ModelAddCollection.module.scss'

enum Text {
    TITLE = 'Добавить коллекцию',
    COLLECTION_NAME = 'Название коллекции',
    COLLECTION_DESCRIPTION = 'Описание коллекции',
    RATING = 'Рейтинг',
}

interface Props {
    isModalOpen: boolean,
    onModalSave: (val: ICollectionForm) => void,
    onModalCancel: () => void,
}

export const ModelAddCollection = ({
    isModalOpen,
    onModalSave,
    onModalCancel,
}: Props) => {
    const [inputCollectNameValue, setInputCollectNameValue] = useState<string>('')
    const [inputCollectDescValue, setInputCollectDescValue] = useState<string>('')
    const [inputCollectRatingValue, setInputCollectRatingValue] = useState<number>(0)
    const [textareaMovieList, setTextareaMovieList] = useState<string>('')

    const handleSaveClick = () => {
        const movieList = textareaMovieList.split(',')
            .map(movie => movie.trim())
            .filter(movie => movie.length > 0);

        const collectionName = {
            name: inputCollectNameValue,
            description: inputCollectDescValue,
            rating: inputCollectRatingValue,
            movieList: movieList,
        }
        onModalSave(collectionName)
        onModalCancel()
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
            open={isModalOpen}
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

                <TextArea
                    className={styles.elem}
                    placeholder={"Названия фильмов через запятую"}
                    value={textareaMovieList}
                    onChange={handleMovieNameChange}
                    rows={10}
                />

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
                />

                <Button type="primary" onClick={handleSaveClick}>Сохранить</Button>
            </div>
        </Modal>
    )
}
