import {FC, useState} from 'react'
import {useSelector} from 'react-redux'

import {Button} from 'antd'
import clsx from 'clsx'
import Image from 'next/image'

import {IMovie, IMovieLang} from '@/api/apiTypes'
import {isIMovie, isIMovieLang} from "@/helpers"

import styles from './CardItemV2.module.scss'

import {getSelectLanguage} from '@/redux/selectors/layoutSelectors'
import {useAppDispatch} from '@/redux/store'

import {ModelAddMovie} from '../ModelAddMovie'

import {Card} from './Card'

interface Props {
    movie: IMovieLang | IMovie,
    width: number,
    height: number,
    isProfileCard?: boolean,
}

export const CardItemV2: FC<Props> = ({
    movie,
    width,
    height,
    isProfileCard,
}) => {
    const dispatch = useAppDispatch()
    const lang = useSelector(getSelectLanguage)

    const [isAddMovieModalOpen, setIsAddMovieModalOpen] = useState(false)



    const addLangButton = (mov: IMovie | IMovieLang) => {
        if (isIMovieLang(mov)) {
            return <Button
                type="default"
                size='small'
                className={clsx(styles.btn, styles.btnLang)}
                onClick={(e: any) => {
                    e.stopPropagation()
                    setIsAddMovieModalOpen(true)
                }}
            >
                ADD LAND
            </Button>
        }
    }

    const getCard = (mov: IMovie | IMovieLang) => {
        if (isIMovie(mov)) {
            const numberWords = 20
            const title = mov.title.length > numberWords ? `${mov.title.slice(0, numberWords)}...` : mov.title
            return (
                <Card
                    mov={mov}
                    isProfileCard={isProfileCard}
                    modalOpen={isAddMovieModalOpen}
                    onModalOpen={setIsAddMovieModalOpen}
                />
            )
        }

        if (isIMovieLang(mov)) {
            const isEnglish = lang === 'en-EN'
            const title = isEnglish ? mov.title_en : mov.title_ru
            const poster_path = isEnglish
                ? mov.poster_path_en
                : mov.poster_path_ru

            return (
                <div className={styles.cardWrapper}>
                    <Image
                        alt={title || ''}
                        src={poster_path || ''}
                        width={width}
                        height={height}
                        blurDataURL='https://skarblab.com/wp-content/uploads/2015/12/placeholder-2-1000x600.jpg'
                        placeholder="blur"
                    />
                </div>

            )
        }
    }

    const [isRotate, setIsRotate] = useState(false)

    return (
        <div
            key={movie.id}
            className={clsx(styles.cardsWrapper, isRotate && styles.rotate)}
            onClick={() => setIsRotate(!isRotate)}
        >
            {getCard(movie)}

            <ModelAddMovie
                movie={movie as IMovie}
                isModalOpen={isAddMovieModalOpen}
                onModalCancel={() => setIsAddMovieModalOpen(false)}
            />
        </div>
    )
}