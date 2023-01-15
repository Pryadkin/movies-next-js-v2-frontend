import React from 'react'

import Header from '../Header'

import styles from './Layout.module.scss'

const Layout: React.FC<{children: React.ReactNode}> = ({children}) => {
    console.log('Layout')
    return (
        <div className={styles.wrapper}>
            <Header />
            <div>{children}</div>
        </div>
    )
}

export default Layout
