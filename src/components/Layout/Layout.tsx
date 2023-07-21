import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'

import {Button, DrawerProps} from 'antd'

import {Header} from '@/components/Header'
import {useFetchMovieTags} from '@/hooks/useFetchMovieTags'
import {useFetchMovieTree} from '@/hooks/useFetchMovieTree'
import {useUpdateProfileMovie} from '@/hooks/useUpdateProfileMovie'
import {getIsDrawerMovieTagsOpen, setSelectMovie} from '@/redux/reducers'

import styles from './Layout.module.scss'

import {getSelectIsDrawerMovieTagsOpen, getSelectMovie} from '@/redux/selectors/profileSelectors'
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
    const {mutationUpdate} = useUpdateProfileMovie()
    const isDrawerMovieTagsOpen = useSelector(getSelectIsDrawerMovieTagsOpen)
    const selectMovie = useSelector(getSelectMovie)
    const {
        data: moviesTree,
        isFetching: isMovieTreeFetching
    } = useFetchMovieTree()
    const {
        data: moviesTags,
        isFetching: isMovieTagsFetching
    } = useFetchMovieTags()
    const [drawerMovieTreeTitle] = useState<string>('Movie tree')
    const [isDrawerMovieTreeOpen, setIsDrawerMovieTreeOpen] = useState<DrawerProps['open']>(false)

    const handlesetDrawerMovieTagsOpen = (val: boolean) => {
        dispatch(getIsDrawerMovieTagsOpen(val))

        // delete select movie by close drawer
        dispatch(setSelectMovie(0))
    }

    const handleUpdateMovieClick = () => {
        if (selectMovie) {
            mutationUpdate.mutate(selectMovie)
        }
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
                isLoading={isMovieTreeFetching}
            >
                <ListTree nestedObj={moviesTree} />
            </Drawer>

            <Drawer
                title={selectMovie?.title}
                open={isDrawerMovieTagsOpen}
                onOpen={handlesetDrawerMovieTagsOpen}
                isLoading={isMovieTagsFetching}
            >
                <AddTags
                    movie={selectMovie}
                    tags={moviesTags?.data.tags}
                />
                <Button onClick={handleUpdateMovieClick}>
                    Update movie
                </Button>
            </Drawer>
        </div>
    )
}
