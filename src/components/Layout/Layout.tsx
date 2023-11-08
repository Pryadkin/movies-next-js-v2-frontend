import React, {useState} from 'react'
import {useSelector} from 'react-redux'

const Header = dynamic(import('@/components/Header/Header'), {ssr: false})
import {
    DrawerProps,
    Layout as LayoutAntd,
} from 'antd'
import dynamic from 'next/dynamic'
import {useRouter} from 'next/router'

import {useFetchMovieTags} from '@/hooks/useFetchMovieTags'
import {useFetchMovieTree} from '@/hooks/useFetchMovieTree'

import styles from './Layout.module.scss'

import {
    getIsDrawerMovieTagsOpen,
    sestIsModalDetailsOpen,
    setCurrentMovie,
    setIsAddMovieModalOpen,
    setLanguage,
    setSelectMovie
} from '@/redux/reducers'
import {
    getCurrentMovie,
    getSelectIsDrawerMovieTagsOpen,
} from '@/redux/selectors'
import {getIsAddMovieModalOpen, getIsModalDetailsOpen, getSelectLanguage} from '@/redux/selectors/layoutSelectors'
import {useAppDispatch} from '@/redux/store'
import {TLanguage} from '@/types'

import {Drawer} from '../Drawer'
import {ListTree} from '../ListTree'
import {ModelAddMovie} from '../ModelAddMovie'
import {ModelArtistDetails} from '../ModelArtistDetails'
import {ModelDetails} from '../ModelDetails'
import {ModelSettings} from '../ModelSettings'
import {MovieSettings} from '../MovieSettings'
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
    const lang = useSelector(getSelectLanguage)
    const isDrawerMovieTagsOpen = useSelector(getSelectIsDrawerMovieTagsOpen)
    const selectMovie = useSelector(getCurrentMovie)

    const [drawerMovieTreeTitle] = useState<string>('Movie tree')
    const [isDrawerMovieTreeOpen, setIsDrawerMovieTreeOpen] = useState<DrawerProps['open']>(false)
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)

    // useFetch
    const {
        data: moviesTree,
        isFetching: isMovieTreeFetching
    } = useFetchMovieTree()
    const {
        data: moviesTags,
        isFetching: isMovieTagsFetching
    } = useFetchMovieTags()

    const handlesetDrawerMovieTagsOpen = (val: boolean) => {
        dispatch(getIsDrawerMovieTagsOpen(val))

        // delete select movie by close drawer
        dispatch(setSelectMovie(0))
    }

    const handleLangChange = (lang: TLanguage) => {
        dispatch(setLanguage(lang))
    }

    const isModalDetailsOpen = useSelector(getIsModalDetailsOpen)
    const isAddMovieModalOpen = useSelector(getIsAddMovieModalOpen)

    const handleModalDetailsClose = () => {
        dispatch(sestIsModalDetailsOpen(false))
        dispatch(setCurrentMovie(null))
    }

    const isSider = asPath === '/movies'

    return (
        <LayoutAntd>
            <Header
                lang={lang}
                onLangChange={handleLangChange}
                onDrawerMovieListOpen={() => setIsDrawerMovieTreeOpen(!isDrawerMovieTreeOpen)}
            />

            <LayoutAntd>
                { isSider && (
                    <Sider
                        trigger={null}
                        collapsible
                        width={250}
                        style={{background: 'white'}}
                    >
                        <Sidebare onModalOpen={setIsSettingsModalOpen}/>
                    </Sider>
                )}

                <Content className={styles.contant}>
                    {children}
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
                title={`SETTINGS: ${lang === 'en-EN' ? selectMovie?.title_en : selectMovie?.title_ru}`}
                open={isDrawerMovieTagsOpen}
                onOpen={handlesetDrawerMovieTagsOpen}
            >
                <MovieSettings />
            </Drawer>

            <ModelSettings
                isModalOpen={isSettingsModalOpen}
                onModalCancel={() => setIsSettingsModalOpen(false)}
            />

            <ModelDetails
                movie={selectMovie}
                isModalOpen={isModalDetailsOpen}
                onModalCancel={handleModalDetailsClose}
            />

            <ModelAddMovie
                movie={selectMovie}
                isModalOpen={isAddMovieModalOpen}
                onModalCancel={() => dispatch(setIsAddMovieModalOpen(false))}
            />

            <ModelArtistDetails />
        </LayoutAntd>
    )
}

export default Layout