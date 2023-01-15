import Link from 'next/link'

import styles from './Header.module.scss'

const navigation = [
    {id: 1, title: 'Profile', path: '/profile'},
    {id: 2, title: 'Search', path: '/search'},
]

const Header = () => {
    const a = 'hey'
    console.log(a)
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
