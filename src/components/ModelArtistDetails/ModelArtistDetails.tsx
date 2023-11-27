import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'

import {
    Button,
    Modal,
} from 'antd'

import {useFetchArtistCombinedCredits} from '@/hooks/useFetchArtistCombinedCredits'
import {useFetchArtistDetails} from '@/hooks/useFetchArtistDetails'
import {useFetchDetailsMovie} from '@/hooks/useFetchDetailsMovie'
import {deleteAllModelContent, deleteModelContent} from '@/redux/reducers'
import {getModelContent, getSelectLanguage} from '@/redux/selectors/layoutSelectors'

import styles from './ModelArtistDetails.module.scss'

import {useAppDispatch} from '@/redux/store'

import {ArtistDetails} from '../ArtistDetails'
import {MovieDetails} from '../MovieDetails'

export const ModelArtistDetails = () => {
    const dispatch = useAppDispatch()
    const lang = useSelector(getSelectLanguage)
    const modelContent = useSelector(getModelContent)
    const [movieId, setMovieId] = useState<number | null>(null)
    const [artistId, setArtistId] = useState<number | null>(null)
    const [isShow, setIsShow] = useState(false)
    const type = modelContent[modelContent.length - 1]?.type
    const id = modelContent[modelContent.length - 1]?.id

    const {data: movie} = useFetchDetailsMovie(movieId, lang, type === 'tv')
    const {data: artist} = useFetchArtistDetails(artistId, lang)
    const {data: artistCombinedCredits} = useFetchArtistCombinedCredits(artistId, lang)

    useEffect(() => {
        if (modelContent) {
            if (type === 'artist') {
                setMovieId(null)
                setArtistId(id)
            } else {
                setMovieId(id)
                setArtistId(null)
            }
        }

        if (modelContent.length === 0) {
            setIsShow(false)
        } else {
            setIsShow(true)
        }
    }, [id, modelContent, type])

    return (
        <Modal
            className={styles.modalContainer}
            open={isShow}
            onCancel={() => {
                dispatch(deleteAllModelContent())
            }}
            footer={[]}
        >
            <Button
                style={{zIndex: 100}}
                onClick={() =>
                    dispatch(deleteModelContent())
                }>
                Back
            </Button>

            {artistId && artist && artistCombinedCredits && (
                <ArtistDetails
                    artist={artist}
                    cast={artistCombinedCredits.cast}
                    crew={artistCombinedCredits.crew}
                />
            )}

            {movieId && movie && (
                <MovieDetails
                    movie={movie}
                />
            )}
        </Modal>
    )
}
