import {FC, useState} from 'react'

import type {DrawerProps} from 'antd'
import {Drawer as DrawerAntd} from 'antd'

interface Props {
    children: React.ReactNode,
    title: string,
    open: DrawerProps['open'],
    onOpen: (val: boolean) => void
}

export const Drawer: FC<Props> = ({
    children,
    title,
    open,
    onOpen
}) => {

    const [placement] = useState<DrawerProps['placement']>('top')
    const [size] = useState<DrawerProps['height']>(500)

    const onClose = () => {
        onOpen(false)
    }

    return (
        <DrawerAntd
            title={title}
            placement={placement}
            height={size}
            closable={false}
            onClose={onClose}
            open={open}
            key={placement}
        >
            {children}
        </DrawerAntd>
    )
}