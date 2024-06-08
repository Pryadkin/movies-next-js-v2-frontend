import React, {useState} from 'react'
import {useSelector} from 'react-redux'

const Header = dynamic(import('@/components/Header/Header'), {ssr: false})
import {
    DrawerProps,
    Layout as LayoutAntd,
} from 'antd'
import dynamic from 'next/dynamic'
import {useRouter} from 'next/router'

import {ICorrectMovieWithLang} from '@/api/apiTypes/requestMovies'
import {useFetchMovieTags} from '@/hooks/useFetchMovieTags'

import styles from './Layout.module.scss'

import {useFetchMovieTree} from '@/hooks/useFetchMovieTree'
import {
    getIsDrawerMovieTagsOpen,
    setIsAddMovieModalOpen,
    setLanguage,
    setSelectMovie
} from '@/redux/reducers'
import {
    getSelectIsDrawerMovieTagsOpen,
} from '@/redux/selectors'
import {getIsAddMovieModalOpen, getSelectLanguage, getSelectMovie} from '@/redux/selectors/layoutSelectors'
import {useAppDispatch} from '@/redux/store'
import {TLanguage} from '@/types'

import {Drawer} from '../Drawer'
import {ListTree} from '../ListTree'
import {ModelAddMovie} from '../ModelAddMovie'
import {ModelArtistDetails} from '../ModelArtistDetails'
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
    const selectMovie = useSelector(getSelectMovie)
    const [drawerMovieTreeTitle] = useState<string>('Movie tree')
    const [isDrawerMovieTreeOpen, setIsDrawerMovieTreeOpen] = useState<DrawerProps['open']>(false)
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)

    // useFetch
    const {
        data: moviesTree,
        isFetching: isMovieTreeFetching
    } = useFetchMovieTree()
    const {} = useFetchMovieTags()

    const handlesetDrawerMovieTagsOpen = (val: boolean) => {
        dispatch(getIsDrawerMovieTagsOpen(val))

        // delete select movie by close drawer
        dispatch(setSelectMovie(null))
    }

    const handleLangChange = (lang: TLanguage) => {
        dispatch(setLanguage(lang))
    }

    const isAddMovieModalOpen = useSelector(getIsAddMovieModalOpen)

    const isSider = asPath === '/profile'

    const title = lang === 'en-EN'
        ? (selectMovie as ICorrectMovieWithLang)?.title_en
        : (selectMovie as ICorrectMovieWithLang)?.title_ru

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
                title={`SETTINGS: ${title}`}
                open={isDrawerMovieTagsOpen}
                onOpen={handlesetDrawerMovieTagsOpen}
            >
                <MovieSettings />
            </Drawer>

            <ModelSettings
                isModalOpen={isSettingsModalOpen}
                onModalCancel={() => setIsSettingsModalOpen(false)}
            />

            {selectMovie && (
                <ModelAddMovie
                    movie={selectMovie}
                    isModalOpen={isAddMovieModalOpen}
                    onModalCancel={() => dispatch(setIsAddMovieModalOpen(false))}
                />
            )}

            <ModelArtistDetails />
        </LayoutAntd>
    )
}

export default Layout