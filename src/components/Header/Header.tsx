import {FC} from 'react'
import {useSelector} from 'react-redux'

import {Button} from 'antd'
import {Header as HeaderAntd} from 'antd/es/layout/layout'
import Link from 'next/link'

import {RootState} from '@/redux/store/rootReducer'

import styles from './Header.module.scss'

interface Props {
    onDrawerMovieListOpen: () => void
}

const Header: FC<Props> = ({
    onDrawerMovieListOpen
}) => {
    const userName = useSelector((state: RootState) => state.profileReducer.userName)
    const navigation = [
        {id: 1, title: 'Profile', path: userName},
        {id: 2, title: 'Search', path: '/search'},
    ]

    return (
        <HeaderAntd
            className={styles.header}
        >
            <span className={styles.logo}>Movies</span>
            <div className={styles.menu}>
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

            <Button
                size="small"
                onClick={onDrawerMovieListOpen}
            >
                    MovieList
            </Button>
        </HeaderAntd>
    )
}

export default Header