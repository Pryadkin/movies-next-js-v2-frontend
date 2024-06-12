import {FC, SyntheticEvent, useState} from 'react'

import {Button} from 'antd'
import Search from 'antd/es/input/Search'
import {Header as HeaderAntd} from 'antd/es/layout/layout'
import Link from 'next/link'
import {useRouter} from 'next/router'

import styles from './Header.module.scss'

import {setSearchMovie} from '@/redux/reducers'
import {useAppDispatch} from '@/redux/store'
import {TLanguage} from '@/types'

interface Props {
    lang: TLanguage,
    onDrawerMovieListOpen: () => void,
    onLangChange: (val: TLanguage) => void,
}

const Header: FC<Props> = ({
    lang,
    onDrawerMovieListOpen,
    onLangChange,
}) => {
    const {asPath} = useRouter()
    const dispatch = useAppDispatch()
    const isProfile = asPath === '/profile'
    const navigation = [
        {id: 1, title: 'Profile', path: '/profile-movies'},
        {id: 2, title: 'Search movies', path: '/search/movies'},
        {id: 2, title: 'Search persons', path: '/search/persons'},
        {id: 3, title: 'Popular', path: '/popular'},
        {id: 4, title: 'Top Rated', path: '/top-rated'},
    ]
    const [searchMovieInput, setSearchMovieInput] = useState('')

    const handleLangClick = () => {
        const correctLang = lang === 'ru-RU' ? 'en-EN' : 'ru-RU'
        onLangChange(correctLang)
    }

    const handleSearchMovieChange = ({target}: SyntheticEvent) => {
        const targetInputElement: HTMLInputElement = target as HTMLInputElement
        setSearchMovieInput(targetInputElement.value)
    }

    const handleSearchMovieClick = () => {
        dispatch(setSearchMovie(searchMovieInput))
    }

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

            {isProfile && (
                <>
                    <Search
                        className={styles.search}
                        size='small'
                        value={searchMovieInput}
                        onSearch={handleSearchMovieClick}
                        onChange={handleSearchMovieChange}
                    />

                    <div className={styles.rightElems}>
                        <Button
                            size="small"
                            onClick={handleLangClick}
                        >
                            {lang}
                        </Button>

                        <Button
                            size="small"
                            onClick={onDrawerMovieListOpen}
                        >
                        MovieList
                        </Button>
                    </div>
                </>
            )}

        </HeaderAntd>
    )
}

export default Header