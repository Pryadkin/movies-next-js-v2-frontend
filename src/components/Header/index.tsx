import {useSelector} from 'react-redux'

import Link from 'next/link'

import {RootState} from '@/redux/store/rootReducer'

import styles from './Header.module.scss'

const Header = () => {
    const userName = useSelector((state: RootState) => state.profileReducer.userName)
    const a = 'hey'
    const navigation = [
        {id: 1, title: 'Profile', path: userName},
        {id: 2, title: 'Search', path: '/search'},
    ]

    return (
        <div className={styles.container}>
            <div className={styles.logo}>Movies</div>
            <div className={styles.navbar}>
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

export default Header
