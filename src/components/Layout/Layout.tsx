import React, {useEffect, useState} from 'react'

import {DrawerProps} from 'antd'

import {Header} from '@/components/Header'
import {useFetchMovieTags} from '@/hooks/useFetchMovieTags'
import {useFetchMovieTree} from '@/hooks/useFetchMovieTree'

import styles from './Layout.module.scss'

import {Drawer} from '../Drawer'
import {ListTree} from '../ListTree'

interface Props {
    children: React.ReactNode
}

export const Layout: React.FC<Props> = ({
    children
}) => {
    const {
        data: moviesTree,
        isFetching: isMovieTreeFetching
    } = useFetchMovieTree()
    const {
        data: moviesTags,
        isFetching: isMovieTagsFetching
    } = useFetchMovieTags()
    const [drawerTitle] = useState<string>('Filters')
    const [drawerOpen, setDrawerOpen] = useState<DrawerProps['open']>(false)

    return (
        <div className={styles.wrapper}>
            <Header onDrawerMovieListOpen={() => setDrawerOpen(!drawerOpen)}/>

            <div>{children}</div>

            <Drawer
                title={drawerTitle}
                open={drawerOpen}
                onOpen={setDrawerOpen}
            >
                {!isMovieTreeFetching && (
                    <ListTree nestedObj={moviesTree} />
                )}
            </Drawer>
        </div>
    )
}
