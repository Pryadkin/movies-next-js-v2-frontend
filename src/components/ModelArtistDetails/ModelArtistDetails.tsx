import React from 'react'
import {useSelector} from 'react-redux'

import {
    Modal,
} from 'antd'

import {useFetchArtistCombinedCredits} from '@/hooks/useFetchArtistCombinedCredits'
import {useFetchArtistDetails} from '@/hooks/useFetchArtistDetails'
import {setArtistId} from '@/redux/reducers'
import {getArtistId, getSelectLanguage} from '@/redux/selectors/layoutSelectors'
import {useAppDispatch} from '@/redux/store'

import styles from './ModelArtistDetails.module.scss'

import {ArtistDetails} from '../ArtistDetails'

export const ModelArtistDetails = () => {
    const dispatch = useAppDispatch()
    const artistId = useSelector(getArtistId)
    const lang = useSelector(getSelectLanguage)

    const {data: artist} = useFetchArtistDetails(artistId, lang)
    const {data: artistCombinedCredits} = useFetchArtistCombinedCredits(artistId, lang)

    return (
        <Modal
            className={styles.modalContainer}
            open={!!artistId}
            onCancel={() => dispatch(setArtistId(null))}
            footer={[]}
        >
            {artist && (
                <ArtistDetails
                    artist={artist}
                    combinedCredits={artistCombinedCredits}
                />
            )}
        </Modal>
    )
}
