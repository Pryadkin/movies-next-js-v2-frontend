import {FC} from 'react'
import {useSelector} from 'react-redux'

import {Button} from 'antd'
import Link from 'next/link'

import {RootState} from '@/redux/store/rootReducer'

import styles from './Header.module.scss'

interface Props {
    onDrawerMovieListOpen: () => void
}

export const Header: FC<Props> = ({
    onDrawerMovieListOpen
}) => {
    const userName = useSelector((state: RootState) => state.profileReducer.userName)
    const navigation = [
        {id: 1, title: 'Profile', path: userName},
        {id: 2, title: 'Search', path: '/search'},
    ]

    return (
        <div className={styles.container}>
            <div className={styles.logo}>Movies</div>
            <div className={styles.navbar}>
                <Button
                    size="small"
                    onClick={onDrawerMovieListOpen}
                >
                    MovieList
                </Button>
                {navigation.map(({id, path, title}) => (
                    <Link
                        key={id}
                        href={path}
                        className={styles.link}
                    >
                        {title}
                    </Link>
                ))}
            </div>
        </div>
    )
}
