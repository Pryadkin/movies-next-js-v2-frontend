import {useRef, useState} from 'react'

import clsx from 'clsx'

import styles from './CardCollection.module.scss'

import { Button, Input, Popconfirm } from 'antd'

export const CardEmpty = ({
    movieName,
    onAddMovieToCard,
    onRenameCard,
    onDeleteCard,
}: {
    movieName: string | undefined,
    onAddMovieToCard: () => void,
    onRenameCard: (val: string) => void,
    onDeleteCard: () => void,
}) => {
    const inputRef = useRef(null);
    const cardRef = useRef<HTMLDivElement>(null)
    const [isRenameCard, setIsRenameCard] = useState(false)
    const [inputCartName, setInputCartName] = useState<string>()

    const handleRenameCardClick = () => {
        inputCartName && onRenameCard(inputCartName)
        setIsRenameCard(false)
    }

    return (
        <div
            ref={cardRef}
            className={clsx(
                styles.cardsWrapper
            )}
        >
            <div className={styles.emptyCard}>
                {isRenameCard ? (
                    <div className={styles.renameWrapper}>
                        <Input
                            ref={inputRef}
                            placeholder="Введите название карты"
                            value={inputCartName}
                            onChange={e => {
                                setInputCartName(e.target.value)
                            }}
                        />
                        <Button onClick={handleRenameCardClick}>
                            Rename card
                        </Button>
                    </div>
                ) : (
                    <p>{movieName}</p>
                )}

                <div
                    className={styles.addMovie}
                    onClick={onAddMovieToCard}
                >
                    Add movie
                </div>
                <div
                    className={styles.renameCard}
                    onClick={() => setIsRenameCard(!isRenameCard)}
                >
                    {isRenameCard ? 'Cancel card renaming' : 'Rename card'}
                </div>

                <Popconfirm
                    title="Delete the card"
                    description="Are you sure to delete this Card?"
                    onConfirm={onDeleteCard}
                    onCancel={() => {}}
                    okText="Yes"
                    cancelText="No"
                >
                    <div
                        className={styles.deleteCard}
                    >
                        Delete card
                    </div>
                </Popconfirm>
            </div>
        </div>
    )
}