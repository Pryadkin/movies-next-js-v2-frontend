import React, {useEffect, useState} from 'react'

import {DrawerProps} from 'antd'

import {API} from '@/api'
import {Header} from '@/components/Header'

import {Drawer} from '../Drawer'

import styles from './Layout.module.scss'

import {ListTree} from '../ListTree'
import {updateObjForTree} from '../ListTree/helpers/updateObjToTree'

interface Props {
    children: React.ReactNode
}

export const Layout: React.FC<Props> = ({
    children
}) => {
    const [valObj, setValObj] = useState<any>()
    const [drawerTitle] = useState<string>('Filters')
    const [drawerOpen, setDrawerOpen] = useState<DrawerProps['open']>(false)

    const fetchFilter = async () => {
        const res = await API.requestFilterData()

        if (res) {
            const objForTree = updateObjForTree(res.data)

            setValObj(objForTree)
        }
    }

    useEffect(() => {
        fetchFilter()
    }, [])

    return (
        <div className={styles.wrapper}>
            <Header onDrawerMovieListOpen={() => setDrawerOpen(!drawerOpen)}/>

            <div>{children}</div>

            <Drawer
                title={drawerTitle}
                open={drawerOpen}
                onOpen={setDrawerOpen}
            >
                {valObj && (
                    <ListTree nestedObj={valObj} />
                )}
            </Drawer>
        </div>
    )
}
