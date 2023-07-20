import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'

import {DrawerProps} from 'antd'

import {Header} from '@/components/Header'
import {useFetchMovieTags} from '@/hooks/useFetchMovieTags'
import {useFetchMovieTree} from '@/hooks/useFetchMovieTree'
import {getIsDrawerMovieTagsOpen} from '@/redux/reducers'
import {getSelectIsDrawerMovieTagsOpen} from '@/redux/selectors/profileSelectors'

import styles from './Layout.module.scss'

import {useAppDispatch} from '@/redux/store'

import {AddTags} from '../AddTags'
import {Drawer} from '../Drawer'
import {ListTree} from '../ListTree'

interface Props {
    children: React.ReactNode
}

export const Layout: React.FC<Props> = ({
    children
}) => {
    const dispatch = useAppDispatch()
    const isDrawerMovieTagsOpen = useSelector(getSelectIsDrawerMovieTagsOpen)
    const {
        data: moviesTree,
        isFetching: isMovieTreeFetching
    } = useFetchMovieTree()
    const {
        data: moviesTags,
        isFetching: isMovieTagsFetching
    } = useFetchMovieTags()
    const [drawerMovieTreeTitle] = useState<string>('Movie tree')
    const [drawerMovieTagsTitle] = useState<string>('Movie tags')
    const [isDrawerMovieTreeOpen, setIsDrawerMovieTreeOpen] = useState<DrawerProps['open']>(false)

    const handlesetDrawerMovieTagsOpen = () => {
        dispatch(getIsDrawerMovieTagsOpen(!isDrawerMovieTagsOpen))
    }

    return (
        <div className={styles.wrapper}>
            <Header
                onDrawerMovieListOpen={() => setIsDrawerMovieTreeOpen(!isDrawerMovieTreeOpen)}
            />

            <div>{children}</div>

            <Drawer
                title={drawerMovieTreeTitle}
                open={isDrawerMovieTreeOpen}
                onOpen={setIsDrawerMovieTreeOpen}
            >
                {!isMovieTreeFetching && (
                    <ListTree nestedObj={moviesTree} />
                )}
            </Drawer>

            <Drawer
                title={drawerMovieTagsTitle}
                open={isDrawerMovieTagsOpen}
                onOpen={handlesetDrawerMovieTagsOpen}
            >
                <AddTags />
            </Drawer>
        </div>
    )
}
