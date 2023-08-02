import {FC} from 'react'
import {useSelector} from 'react-redux'

import {Button} from 'antd'
import {Header as HeaderAntd} from 'antd/es/layout/layout'
import Link from 'next/link'

import {RootState} from '@/redux/store/rootReducer'
import {TLanguage} from '@/types'

import styles from './Header.module.scss'

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
    const userName = useSelector((state: RootState) => state.profileReducer.userName)
    const navigation = [
        {id: 1, title: 'Profile', path: userName},
        {id: 2, title: 'Search', path: '/search'},
    ]

    const handleLangClick = () => {
        const correctLang = lang === 'ru-RU' ? 'en-EN' : 'ru-RU'
        onLangChange(correctLang)
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
        </HeaderAntd>
    )
}

export default Header