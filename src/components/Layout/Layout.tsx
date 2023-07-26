import React, {useState} from 'react'
import {useSelector} from 'react-redux'

const Header = dynamic(import('@/components/Header/Header'), {ssr: false})
import {
    Button,
    DrawerProps,
    Layout as LayoutAntd,
} from 'antd'
import dynamic from 'next/dynamic'
import {useRouter} from 'next/router'

import {useFetchMovieTree} from '@/hooks/useFetchMovieTree'
import {useUpdateProfileMovie} from '@/hooks/useUpdateProfileMovie'

import styles from './Layout.module.scss'

import {
    getIsDrawerMovieTagsOpen,
    setSelectMovie
} from '@/redux/reducers'
import {
    getSelectIsDrawerMovieTagsOpen,
    getSelectMovie,
    getSelectTags,
} from '@/redux/selectors'
import {useAppDispatch} from '@/redux/store'

import {AddTags} from '../AddTags'
import {Drawer} from '../Drawer'
import {ListTree} from '../ListTree'
import {ModelSettings} from '../ModelSettings'
import {Sidebare} from '../Sidebare'

const {Sider, Content} = LayoutAntd
interface Props {
    children: React.ReactNode
}

const Layout: React.FC<Props> = ({
    children
}) => {
    const {asPath} = useRouter()
    const dispatch = useAppDispatch()
    const {mutationUpdate} = useUpdateProfileMovie()
    const isDrawerMovieTagsOpen = useSelector(getSelectIsDrawerMovieTagsOpen)
    const selectMovie = useSelector(getSelectMovie)
    const selectTegs = useSelector(getSelectTags)
    const [drawerMovieTreeTitle] = useState<string>('Movie tree')
    const [isDrawerMovieTreeOpen, setIsDrawerMovieTreeOpen] = useState<DrawerProps['open']>(false)
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)

    // useFetch
    const {
        data: moviesTree,
        isFetching: isMovieTreeFetching
    } = useFetchMovieTree()

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
        <LayoutAntd>
            <Header
                onDrawerMovieListOpen={() => setIsDrawerMovieTreeOpen(!isDrawerMovieTreeOpen)}
            />

            <LayoutAntd>
                {asPath !== '/search' && (
                    <Sider
                        trigger={null}
                        collapsible
                        style={{background: 'white'}}
                    >
                        <Sidebare onModalOpen={setIsSettingsModalOpen}/>
                    </Sider>
                )}

                <Content className={styles.contant}>
                    <div>{children}</div>
                </Content>
            </LayoutAntd>


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
            >
                <AddTags
                    movie={selectMovie}
                    tags={selectTegs}
                />
                <Button onClick={handleUpdateMovieClick}>
                    Update movie
                </Button>
            </Drawer>

            <ModelSettings
                isModalOpen={isSettingsModalOpen}
                onModalCancel={() => setIsSettingsModalOpen(false)}
            />
        </LayoutAntd>
    )
}

export default Layout