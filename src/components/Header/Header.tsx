import {FC} from 'react'

import {Header as HeaderAntd} from 'antd/es/layout/layout'
import cn from 'clsx'
import Link from 'next/link'
import {useRouter} from 'next/router'

import styles from './Header.module.scss'

const Header: FC = () => {
    const {pathname} = useRouter()

    const navigation = [
        {id: 1, title: 'Profile', path: '/profile-movies'},
        {id: 2, title: 'Search movies', path: '/search/movies'},
        {id: 3, title: 'Search persons', path: '/search/persons'},
        {id: 4, title: 'Popular people', path: '/popular-people'},
        {id: 5, title: 'Top Rated', path: '/top-rated'},
        {id: 6, title: 'Now Playing', path: '/now-playing'},
        {id: 7, title: 'Popular', path: '/popular-movies'},
        {id: 8, title: 'Movie Collection', path: '/movie-collection'},
        {id: 9, title: 'Upcoming', path: '/upcoming'},
    ]

    return (
        <HeaderAntd
            className={styles.header}
        >
            <span className={styles.logo}>Movies</span>
            <div className={styles.menu}>
                {navigation.map(({id, path, title}) => {
                    const isCurrentPage = pathname === path

                    return (
                        <Link
                            key={id}
                            href={path}
                            className={cn(
                                styles.link,
                                isCurrentPage && styles.currentLink
                            )}
                        >
                            {title}
                        </Link>
                    )
                })}
            </div>
        </HeaderAntd>
    )
}

export default Header