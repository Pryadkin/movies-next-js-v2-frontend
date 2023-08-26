import {Button, Popconfirm} from 'antd'
import clsx from 'clsx'
import Image from 'next/image'

import {IMovie} from '@/api/apiTypes'
import {isIMovie} from '@/helpers'

import styles from './Card.module.scss'

import {useDeleteMovie} from '@/hooks/useDeleteMovie'
import {getIsDrawerMovieTagsOpen, setSelectMovie} from '@/redux/reducers'
import {useAppDispatch} from '@/redux/store'

export const Card = ({
    mov,
    isProfileCard,
    onModalOpen
}: {
    mov: IMovie,
    isProfileCard: boolean | undefined,
    onModalOpen: (val: boolean) => void
}) => {
    const dispatch = useAppDispatch()
    const {mutationDelete} = useDeleteMovie()
    const handleAddBtnClick = (e: any) => {
        e.stopPropagation()
        onModalOpen(true)
    }

    const handleRemoveBtnClick = (movieId: number) => () => {
        mutationDelete.mutate(movieId)
    }

    const handleFilterBtnClick = (movieId: number) => () => {
        dispatch(getIsDrawerMovieTagsOpen(true))
        dispatch(setSelectMovie(movieId))
    }

    const button = () => {
        if (isProfileCard) {
            return (
                <>
                    <Popconfirm
                        title="Delete the movie"
                        description="Are you sure to delete this movie?"
                        onConfirm={handleRemoveBtnClick(mov.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            type="default"
                            className={clsx(styles.btn, styles.btnRemove)}
                        >
                            remove
                        </Button>
                    </Popconfirm>

                    <Button
                        type="default"
                        className={clsx(styles.btn, styles.btnFilter)}
                        onClick={handleFilterBtnClick(mov.id)}
                    >
                        SETTINGS
                    </Button>
                </>
            )
        }
        return (
            <Button
                type="default"
                className={styles.btn}
                onClick={handleAddBtnClick}
            >
                add
            </Button>
        )
    }

    if (isIMovie(mov)) {
        const numberWords = 20
        const title = mov.title.length > numberWords ? `${mov.title.slice(0, numberWords)}...` : mov.title
        return (
            <div className={styles.card}>
                <div className={styles.content}>
                    <div
                        data-title={mov.title}
                        title={mov.title}
                        className={styles.front}
                    >
                        <Image
                            className={styles.image}
                            title={mov.title}
                            alt={mov.title}
                            src={mov.poster_path || ''}
                            width={200}
                            height={300}
                            blurDataURL='https://skarblab.com/wp-content/uploads/2015/12/placeholder-2-1000x600.jpg'
                            placeholder="blur"
                        />
                        <p className={styles.title}>
                            {title}
                        </p>
                        <p className={styles.title}>
                            {mov.release_date}
                        </p>

                    </div>
                    <div className={styles.back}>
                        <p className={styles.backTitle}>
                            {mov.title}
                        </p>
                        <p className={styles.backTitle}>
                            {mov.release_date}
                        </p>
                        <p className={styles.backTitle}>
                            popularity - {mov.popularity}
                        </p>
                        {button()}
                    </div>
                </div>
            </div>
        )
    }

    return null
}