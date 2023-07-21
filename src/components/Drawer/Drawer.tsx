import {FC, useState} from 'react'

import type {DrawerProps} from 'antd'
import {Drawer as DrawerAntd} from 'antd'

import {Spin} from '../Spin'

interface Props {
    children: React.ReactNode,
    title: string | undefined,
    open: DrawerProps['open'],
    isLoading: boolean,
    onOpen: (val: boolean) => void
}

export const Drawer: FC<Props> = ({
    children,
    title,
    open,
    isLoading,
    onOpen,
}) => {

    const [placement] = useState<DrawerProps['placement']>('top')
    const [size] = useState<DrawerProps['height']>(500)

    return (
        <DrawerAntd
            title={title}
            placement={placement}
            height={size}
            closable={false}
            onClose={() => onOpen(false)}
            open={open}
            key={placement}
        >
            {!isLoading ? children : <Spin />}
        </DrawerAntd>
    )
}