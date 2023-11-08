import React, {useEffect} from 'react'
import {useSelector} from 'react-redux'

import {
    Modal,
} from 'antd'

import {useFetchArtistCombinedCredits} from '@/hooks/useFetchArtistCombinedCredits'
import {useFetchArtistDetails} from '@/hooks/useFetchArtistDetails'
import {useFetchDetailsMovie} from '@/hooks/useFetchDetailsMovie'
import {setArtistToModelContent, setMovieToModelContent} from '@/redux/reducers'
import {getModelContent, getSelectLanguage} from '@/redux/selectors/layoutSelectors'

import styles from './ModelArtistDetails.module.scss'

import {useAppDispatch} from '@/redux/store'

import {ArtistDetails} from '../ArtistDetails'
import {MovieDetails} from '../MovieDetails'

export const ModelArtistDetails = () => {
    const dispatch = useAppDispatch()
    const lang = useSelector(getSelectLanguage)
    const {artistId, movieId} = useSelector(getModelContent)

    const {data: movie} = useFetchDetailsMovie(movieId, lang, false)
    const {data: artist} = useFetchArtistDetails(artistId, lang)
    const {data: artistCombinedCredits} = useFetchArtistCombinedCredits(artistId, lang)

    return (
        <Modal
            className={styles.modalContainer}
            open={!!artistId || !!movieId}
            onCancel={() => {
                dispatch(setMovieToModelContent(null))
                dispatch(setArtistToModelContent(null))
            }}
            footer={[]}
        >
            {artistId && artist && (
                <ArtistDetails
                    artist={artist}
                    combinedCredits={artistCombinedCredits}
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
